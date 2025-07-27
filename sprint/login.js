const emailInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginBtn = document.querySelector('.button');
const loginForm = document.querySelector('form');

// 각 input에서 포커스 아웃 시 유효성 체크
emailInput.addEventListener('blur', () => {
  validateEmail(emailInput);
  toggleButtonState(loginForm, loginBtn);
});

passwordInput.addEventListener('blur', () => {
  validatePassword(passwordInput);
  toggleButtonState(loginForm, loginBtn);
});