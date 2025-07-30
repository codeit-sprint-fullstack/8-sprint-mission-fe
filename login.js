const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.querySelector('.login-button');
const visibilityToggle = document.querySelector('.toggle-visibility');

const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

function showError(input, errorElement, message) {
  input.classList.add('error');
  errorElement.innerText = message;
}

function clearError(input, errorElement) {
  input.classList.remove('error');
  errorElement.innerText = '';
}

function validateEmail() {
  const value = emailInput.value.trim();
  clearError(emailInput, emailError);

  if (!value) {
    showError(emailInput, emailError, '이메일을 입력해주세요.');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    showError(emailInput, emailError, '잘못된 이메일 형식입니다.');
    return false;
  }

  return true;
}

function validatePassword() {
  const value = passwordInput.value.trim();
  clearError(passwordInput, passwordError);

  if (!value) {
    showError(passwordInput, passwordError, '비밀번호를 입력해주세요.');
    return false;
  }
  return true;
}

function updateButtonState() {
  const emailValid = emailInput.value.trim() !== '';
  const passwordValid = passwordInput.value.trim() !== '';

  if (emailValid && passwordValid) {
    loginButton.disabled = false;
    loginButton.classList.add('enabled');
  } else {
    loginButton.disabled = true;
    loginButton.classList.remove('enabled');
  }
}

emailInput.addEventListener('input', () => {
  validateEmail();
  updateButtonState();
});

passwordInput.addEventListener('input', () => {
  validatePassword();
  updateButtonState();
});

// 비밀번호 보기/숨기기 토글
visibilityToggle.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    visibilityToggle.innerHTML = '<img src="img/blind.png" alt="숨기기">';
  } else {
    passwordInput.type = 'password';
    visibilityToggle.innerHTML = '<img src="img/blind.png" alt="보기">';
  }
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // 유효성 재검사
  if (!validateEmail() || !validatePassword()) {
    updateButtonState();
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // USER_DATA에서 이메일로 검색
  const user = USER_DATA.find(user => user.email === email);

  if (!user || user.email !== email){
    alert('이메일이 일치하지 않습니다.');
    return;
  }

  if (!user || user.password !== password) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  // 로그인 성공 시 /items로 이동
  window.location.href = '/items';
});
