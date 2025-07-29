import { USER_DATA, validateEmail, validatePassword, validatePasswordCheck, updateButtonState } from './utils.js';

const emailInput = document.getElementById("email");
const emailMsg = document.getElementById("email_msg");
const passwordInput = document.getElementById("password");
const passwordMsg = document.getElementById("password_msg");
const passwordCheckInput = document.getElementById("password_check");
const passwordCheckMsg = document.getElementById("password_check_msg");
const submit = document.getElementById("submit");

function loginButtonState() {
    updateButtonState({
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
        passwordCheck: passwordCheckInput.value.trim(),
        emailMsg: emailMsg,
        passwordMsg: passwordMsg,
        passwordCheckMsg: passwordCheckMsg,
        submitButton: submit
    });
}

emailInput.addEventListener('input', loginButtonState);
passwordInput.addEventListener('input', loginButtonState);
passwordCheckInput.addEventListener('input', loginButtonState);
emailInput.addEventListener('blur', loginButtonState);
passwordInput.addEventListener('blur', loginButtonState);
passwordCheckInput.addEventListener('blur', loginButtonState);

document.getElementById("signup_form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    const userEmail = USER_DATA.find(user => user.email === email);

    if (userEmail) {
        alert("사용중인 이메일입니다.");
    } else {
        alert("회원가입이 성공적으로 처리되었습니다.");
        window.location.href = "login.html";
    }
});
