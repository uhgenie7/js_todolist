const body = document.querySelector("body");
const IMG_NUMBER = 3;


function paintImage(imgNumber) {
    const image = new Image();
    image.src = `img/${imgNumber + 1}.jpg`;
    image.classList.add('bgImage');
    body.appendChild(image); 
}

function getRandom() {
const IMG_NUMBER = 3;
    const number = Math.floor(Math.random()*IMG_NUMBER);
    return number;
}


function init() {
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init()