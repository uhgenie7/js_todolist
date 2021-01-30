const weather = document.querySelector(".js-weather")
const COORDS = 'coords';
const API_KEY = "d943f9271509662f7f579fd2c785114c";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang={kr}`)
        .then(function (response) {
            console.log(response)
        return response.json();
        })
        .then(function (json) {
            console.log(json)
            const temperature = json.main.temp;
            const place = json.name;
            const weatherIcon = json.weather[0].icon;
            const weathers = json.weather[0].description;
            // image.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
            weather.innerHTML = `${temperature}˚C @ ${place} ${weathers} <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png">`
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));    
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}


function handleGeoError() {
    console.log('안됐어');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if (loadedCords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCords)
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();