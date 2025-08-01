import { form, emailInput, passwordInput, btnForm, overlay, alertSpan } from './DOM.js';
import { USER_DATA } from '../../data/users.js';

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
  const user = USER_DATA.find(u => u.email === email);
  const mode = btnForm.dataset.mode;

  if (mode === 'signup') {
    if (user) {
      showAlert('사용 중인 이메일입니다.');
      return;
    }
    window.location.href = '/login';
  } else if (mode === 'login') {
    if (!user || user.password !== password) {
      showAlert('비밀번호가 일치하지 않습니다.');
      return;
    }
    window.location.href = '/items';
  }
});

////////////////////// 실행 //////////////////////
overlay.querySelector('.close-btn').addEventListener('click', closeAlert);