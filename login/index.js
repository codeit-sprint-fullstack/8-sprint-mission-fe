const login = document.querySelector(".login-from");
const emailForm = login.querySelector(".email-form");
const pwForm = login.querySelector(".pw-form");
const emailInput = emailForm.querySelector("input");
const pwInput = pwForm.querySelector("input");
const loginBtn = login.querySelector("button");

const MessageText = document.querySelector(".email-form h1");
MessageText.textContent('이');

const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

function emailValidChk(email) {
    if(pattern.test(email) === false) { return false; }
    else { return true; }
}

function printVaildMessage(el, text){
    el.textContent(text);
}

function checkValidEmail(){
    const MessageText = emailForm.querySelector("h1");
    if(emailInput.value === null){
        printVaildMessage(MessageText, '이메일을 입력해주세요.');
    }
    if(!emailValidChk(emailInput.value)){
        printVaildMessage(MessageText, '잘못된 이메일 형식입니다.');
    }
}

function checkValidPw(){
    const PwInput = pwForm.querySelector("input");

}

emailInput.addEventListener('focusout', checkValidEmail);
