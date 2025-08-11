const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

function showError(input, message) {
  input.classList.add('error');
  let msg = input.nextElementSibling;
  if (!msg || !msg.classList.contains('error-message')) {
    msg = document.createElement('div');
    msg.className = 'error-message';
    input.after(msg);
  }
  msg.textContent = message;
}

function clearError(input) {
  input.classList.remove('error');
  const msg = input.nextElementSibling;
  if (msg && msg.classList.contains('error-message')) {
    msg.remove();
  }
}

function validateEmail(input) {
  const value = input.value.trim();
  if (value === '') {
    showError(input, '이메일을 입력해주세요.');
    return false;
  } else if (!emailRegex.test(value)) {
    showError(input, '잘못된 이메일 형식입니다');
    return false;
  } else {
    clearError(input);
    return true;
  }
}

function validatePassword(input) {
  const value = input.value.trim();
  if (value === '') {
    showError(input, '비밀번호를 입력해주세요.');
    return false;
  } else if (value.length < 8) {
    showError(input, '비밀번호를 8자 이상 입력해주세요.');
    return false;
  } else {
    clearError(input);
    return true;
  }
}

function validateConfirmPassword(passwordInput, confirmInput) {
  if (confirmInput.value !== passwordInput.value) {
    showError(confirmInput, '비밀번호가 일치하지 않습니다.');
    return false;
  } else {
    clearError(confirmInput);
    return true;
  }
}

function toggleButtonState(form, button) {
  const inputs = form.querySelectorAll('input');
  let isValid = true;
  inputs.forEach(input => {
    if (input.classList.contains('error') || input.value.trim() === '') {
      isValid = false;
    }
  });
  button.disabled = !isValid;
  button.style.backgroundColor = isValid ? '#3692FF' : '#9CA3AF';
}


const loginForm = document.querySelector('form');
const emailInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginButton = document.querySelector('.button');

emailInput?.addEventListener('blur', () => {
  validateEmail(emailInput);
  toggleButtonState(loginForm, loginButton);
});

passwordInput?.addEventListener('blur', () => {
  validatePassword(passwordInput);
  toggleButtonState(loginForm, loginButton);
});

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput?.value.trim();
  const password = passwordInput?.value.trim();
  const user = USER_DATA.find(user => user.email === email);
  if (!user || user.password !== password) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  alert('로그인 성공!');
  window.location.href = '/items';
});


const signupForm = document.querySelector('#signupForm');
const signupEmail = document.querySelector('#useremail');
const signupPassword = document.querySelector('#password');
const signupConfirm = document.querySelector('#confirmPassword');
const signupButton = document.querySelector('#signupButton');

signupEmail?.addEventListener('blur', () => {
  validateEmail(signupEmail);
  toggleButtonState(signupForm, signupButton);
});

signupPassword?.addEventListener('blur', () => {
  validatePassword(signupPassword);
  toggleButtonState(signupForm, signupButton);
});

signupConfirm?.addEventListener('blur', () => {
  validateConfirmPassword(signupPassword, signupConfirm);
  toggleButtonState(signupForm, signupButton);
});

signupForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupEmail.value.trim();
  const exists = USER_DATA.some(user => user.email === email);
  if (exists) {
    alert('사용 중인 이메일입니다');
    return;
  }
  alert('회원가입 성공!');
  window.location.href = '/login';
});
