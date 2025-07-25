const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const emailInput = document.getElementById('email');
const nicknameInput = document.getElementById('nickname');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm-password');
const registerButton = document.querySelector('.login-button');
const visibilityToggles = document.querySelectorAll('.toggle-visibility');

function showError(input, message) {
  removeError(input);
  input.style.border = '1px solid red';
  const error = document.createElement('p');
  error.className = 'error-message';
  error.style.color = 'red';
  error.style.fontSize = '13px';
  error.style.marginTop = '4px';
  error.innerText = message;
  input.parentNode.appendChild(error);
}

function removeError(input) {
  input.style.border = '';
  const error = input.parentNode.querySelector('.error-message');
  if (error) {
    error.remove();
  }
}

function validateEmail() {
  const value = emailInput.value.trim();
  removeError(emailInput);

  if (!value) {
    showError(emailInput, '이메일을 입력해주세요.');
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    showError(emailInput, '잘못된 이메일 형식입니다.');
    return false;
  }
  return true;
}

function validatePassword() {
  const value = passwordInput.value.trim();
  removeError(passwordInput);

  if (!value) {
    showError(passwordInput, '비밀번호를 입력해주세요.');
    return false;
  }
  if (value.length < 8) {
    showError(passwordInput, '비밀번호를 8자 이상 입력해주세요.');
    return false;
  }
  return true;
}

function validateConfirmPassword() {
  const value = confirmInput.value.trim();
  removeError(confirmInput);

  if (!value) {
    showError(confirmInput, '비밀번호를 다시 입력해주세요.');
    return false;
  }
  if (value !== passwordInput.value) {
    showError(confirmInput, '비밀번호가 일치하지 않습니다.');
    return false;
  }
  return true;
}

function validateNickname() {
  const value = nicknameInput.value.trim();
  removeError(nicknameInput);

  if (!value) {
    showError(nicknameInput, '닉네임을 입력해주세요.');
    return false;
  }
  return true;
}

function updateButtonState() {
  const isValid =
    validateEmail() &&
    validateNickname() &&
    validatePassword() &&
    validateConfirmPassword();

  registerButton.disabled = !isValid;
  registerButton.style.backgroundColor = isValid ? '#3396ff' : '#8b99a6';

  return isValid; 
}

emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);
confirmInput.addEventListener('blur', validateConfirmPassword);
nicknameInput.addEventListener('blur', validateNickname);

document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', updateButtonState);
});

// 비밀번호 보기/숨기기
visibilityToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const input = toggle.previousElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      toggle.innerHTML = '<img src="img/show.png">';
    } else {
      input.type = 'password';
      toggle.innerHTML = '<img src="img/show.png">';
    }
  });
});

// 모달 생성
function showModal(message) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <p>${message}</p>
      <button class="modal-close">확인</button>
    </div>
  `;
  document.body.appendChild(modal);
  document.querySelector('.modal-close').addEventListener('click', () => {
    modal.remove();
  });
}

// 회원가입 제출
registerButton.addEventListener('click', (e) => {
  e.preventDefault();

  const isValid =
    validateEmail() &&
    validateNickname() &&
    validatePassword() &&
    validateConfirmPassword();

  if (!isValid) return;

  const email = emailInput.value.trim();

  const isDuplicate = USER_DATA.find((user) => user.email === email);

  if (isDuplicate) {
    showModal('사용 중인 이메일입니다');
  } else {
    showModal('회원가입이 완료되었습니다!');

    // 버튼을 다시 눌러서 중복 실행되지 않도록 잠시 비활성화
    registerButton.disabled = true;

    // 1.5초 후 페이지 이동
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  }
});