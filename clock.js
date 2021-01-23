const clockContainer = document.querySelector(".js-clock")
const clockTitle = clockContainer.querySelector("h1");
const secondHand = document.querySelector(".sec-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function getTime() {
    const date = new Date();

    const hours = date.getHours();
    const hoursDegrees = (hours / 12) * 360 + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    
    const minutes = date.getMinutes();
    const minsDegrees = (minutes / 60) * 360 + 90;
    minHand.style.transform = `rotate(${minsDegrees}deg)`;
    
    const seconds = date.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    clockTitle.innerText =
        `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${ seconds < 10 ? `0${seconds}` : seconds}`
}


function init() {
    getTime();
    setInterval(getTime, 1000);
}

init()