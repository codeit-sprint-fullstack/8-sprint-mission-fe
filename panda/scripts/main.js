import {
  setupPasswordToggle,
  setupFormValidation,
  showErrorModal,
  showErrorMessage,
  validatePassword,
  validatePasswordMatch,
  validateEmail,
  clearErrorMessage
} from './common.js';

document.addEventListener('DOMContentLoaded', () => {
  const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" }
  ];

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const togglePassword = document.getElementById('togglePassword');
  const togglePasswordConfirm = document.getElementById('togglePasswordConfirm');
  const nicknameInput = document.getElementById('nickname');
  const passwordConfirmInput = document.getElementById('passwordConfirm');

  if (togglePassword) setupPasswordToggle('password', 'togglePassword');
  if (togglePasswordConfirm) setupPasswordToggle('passwordConfirm', 'togglePasswordConfirm');

  if (loginBtn) {
    setupFormValidation([emailInput, passwordInput], loginBtn);

    emailInput.addEventListener('input', () => validateEmail(emailInput));
    passwordInput.addEventListener('input', () => validatePassword(passwordInput));

    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (loginBtn.disabled) return;

      const isEmailValid = validateEmail(emailInput);
      const isPasswordValid = validatePassword(passwordInput);
      if (!isEmailValid || !isPasswordValid) {
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const user = USER_DATA.find(u => u.email === email);

      if (!user || user.password !== password) {
        showErrorModal('비밀번호가 일치하지 않습니다.');
        return;
      }

      location.href = './items.html';
    });
  }

  if (signupBtn) {
    setupFormValidation([emailInput, nicknameInput, passwordInput, passwordConfirmInput], signupBtn);

    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (signupBtn.disabled) return;

      const email = emailInput.value.trim();
      const nickname = nicknameInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = passwordConfirmInput.value.trim();

      if (!validateEmail(emailInput) || !validatePassword(passwordInput) || !validatePasswordMatch(passwordInput, passwordConfirmInput)) {
        return;
      }

      const isExisting = USER_DATA.some(u => u.email === email);
      if (isExisting) {
        showErrorModal('사용 중인 이메일입니다.');
        return;
      }

      showErrorModal('회원가입이 완료되었습니다.');
      setTimeout(() => {
        location.href ='./login.html';
      }, 1000);
    });

    emailInput.addEventListener('input', () => validateEmail(emailInput));
    passwordInput.addEventListener('input', () => validatePassword(passwordInput));
    passwordConfirmInput.addEventListener('input', () => validatePasswordMatch(passwordInput, passwordConfirmInput));
  }
});