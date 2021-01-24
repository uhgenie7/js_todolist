const inputForm = document.querySelector(".js-form"),
    inputgretting = inputForm.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}    
    
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = inputgretting.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}



function askForName() {
    inputForm.classList.add(SHOWING_CN);
    inputForm.addEventListener("submit", handleSubmit)
}    

function paintGreeting(text) {
    inputForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `어서오세요, ${text}님.
    남은 할 일은 아래와 같습니다.`
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        //she is not
        askForName();
    } else {
        //she is
        paintGreeting(currentUser);
    }
}    

function init() {
    loadName();    
}

init();