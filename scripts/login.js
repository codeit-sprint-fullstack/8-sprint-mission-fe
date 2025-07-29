import { USER_DATA, validateEmail, validatePassword, updateButtonState } from './utils.js';

const emailInput = document.getElementById("email");
const emailMsg = document.getElementById("email_msg");
const passwordInput = document.getElementById("password");
const passwordMsg = document.getElementById("password_msg");
const submit = document.getElementById("submit");

function loginButtonState() {
    updateButtonState({
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
        emailMsg: emailMsg,
        passwordMsg: passwordMsg,
        submitButton: submit
    });
}

emailInput.addEventListener('input', loginButtonState);
passwordInput.addEventListener('input', loginButtonState);
emailInput.addEventListener('blur', loginButtonState);
passwordInput.addEventListener('blur', loginButtonState);

document.getElementById("login_form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const user = USER_DATA.find(user => user.email === email && user.password === password);

    if (user) {
        alert("로그인 되었습니다.");
        window.location.href = "items.html";
    } else {
        alert("비밀번호가 일치하지 않습니다.");
    }
});
