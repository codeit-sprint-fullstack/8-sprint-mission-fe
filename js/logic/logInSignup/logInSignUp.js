const form = document.querySelector('.form-box');
const emailInput = form.querySelector('#email');
const passwordInput = form.querySelector('#password');
const btnForm = form.querySelector('.form-btn');
const overlay = document.querySelector('.overlay');
const alertSpan = overlay.querySelector('.alert-box span');

import { login } from './login.js';
import { signup } from './signup.js';

////////////////////// 알림메시지 ON //////////////////////
function showAlert(message) {
  alertSpan.textContent = message;
  overlay.style.display = 'flex';
  setTimeout(() => {
    overlay.style.opacity = '1';
  }, 200);
}

////////////////////// 알림메시지 OFF //////////////////////
function closeAlert() {
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 300);
}

////////////////////// 폼 제출 //////////////////////
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!btnForm.classList.contains('active')) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const mode = btnForm.dataset.mode;

  if (mode === 'signup') {
    const result = signup(email);
    if (!result.success) {
      showAlert(result.message);
      return;
    }
    window.location.href = '/login';
  } else if (mode === 'login') {
    const result = login(email, password);
    if (!result.success) {
      showAlert(result.message);
      return;
    }
    window.location.href = '/items';
  }
});

////////////////////// 실행 //////////////////////
overlay.querySelector('.close-btn').addEventListener('click', closeAlert);