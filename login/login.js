// 더미 유저 데이터
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// 이메일 형식 검증
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// 비밀번호 길이 검증
function isValidPwd(pwd) {
  return pwd.length >= 8;
}

document.addEventListener('DOMContentLoaded', () => {
  const form            = document.querySelector('.login-form form');
  const emailInput      = document.getElementById('email');
  const pwdInput        = document.getElementById('pwd');
  // signup 페이지에 pwdConfirm input 이 있으면 id="pwdConfirm" 으로 가정
  const pwdConfirmInput = document.getElementById('pwdConfirm');
  const loginBtn        = document.getElementById('login-btn');

  // 에러 메시지 표시 함수
  function showError(input, message) {
    clearError(input);
    input.style.border = '1px solid red';
    const err = document.createElement('p');
    err.className = 'error-message';
    err.innerText = message;
    err.style.color = 'red';
    err.style.margin = '0.4rem 0 0 0';
    err.style.fontSize = '1.4rem';
    // input의 래퍼(부모) 바로 다음에 붙인다
    input.parentElement.insertAdjacentElement('afterend', err);
  }

  // 에러 메시지 제거 함수
  function clearError(input) {
    input.style.border = '';
    const next = input.parentElement.nextElementSibling;
    if (next && next.classList.contains('error-message')) {
      next.remove();
    }
  }

  // 각각의 검증 함수: true / false 반환
  function validateEmail() {
    const v = emailInput.value.trim();
    clearError(emailInput);
    if (v === '') {
      showError(emailInput, '이메일을 입력해주세요.');
      return false;
    }
    if (!isValidEmail(v)) {
      showError(emailInput, '잘못된 이메일 형식입니다');
      return false;
    }
    return true;
  }

  function validatePwd() {
    const v = pwdInput.value;
    clearError(pwdInput);
    if (v === '') {
      showError(pwdInput, '비밀번호를 입력해주세요.');
      return false;
    }
    if (!isValidPwd(v)) {
      showError(pwdInput, '비밀번호를 8자 이상 입력해주세요.');
      return false;
    }
    return true;
  }

  function validatePwdConfirm() {
    if (!pwdConfirmInput) return true; // signup 페이지가 아니면 무시
    const v = pwdConfirmInput.value;
    clearError(pwdConfirmInput);
    if (v === '') {
      showError(pwdConfirmInput, '비밀번호 확인을 입력해주세요.');
      return false;
    }
    if (v !== pwdInput.value) {
      showError(pwdConfirmInput, '비밀번호가 일치하지 않습니다.');
      return false;
    }
    return true;
  }

  // 버튼 활성화/비활성화 갱신
  function updateButtonState() {
    const emailOk   = validateEmail();
    const pwdOk     = validatePwd();
    const confirmOk = validatePwdConfirm();
    const allFilled = emailInput.value.trim() !== '' &&
                      pwdInput.value.trim()   !== '' &&
                      (!pwdConfirmInput || pwdConfirmInput.value.trim() !== '');
    const enable    = emailOk && pwdOk && confirmOk && allFilled;

    loginBtn.disabled = !enable;
    loginBtn.classList.toggle('active', enable);
  }

  // --- 이벤트 바인딩 ---
  // 포커스 벗어날 때 검증
  emailInput.addEventListener('focusout', () => { validateEmail(); updateButtonState(); });
  pwdInput  .addEventListener('focusout', () => { validatePwd();   updateButtonState(); });
  if (pwdConfirmInput) {
    pwdConfirmInput.addEventListener('focusout', () => { validatePwdConfirm(); updateButtonState(); });
  }

  // 입력 중에는 에러 지우고 버튼 상태만 갱신
  [emailInput, pwdInput, pwdConfirmInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      clearError(input);
      updateButtonState();
    });
  });

  // 폼 제출(로그인 버튼 클릭 또는 Enter) 처리
  form.addEventListener('submit', e => {
    e.preventDefault();
    // 최종 검증
    const emailOk   = validateEmail();
    const pwdOk     = validatePwd();
    const confirmOk = validatePwdConfirm();
    updateButtonState();
    if (!emailOk || !pwdOk || !confirmOk) return;

    // 로그인 로직
    const email = emailInput.value.trim();
    const pwd   = pwdInput.value;
    const user  = USER_DATA.find(u => u.email === email);

    if (!user || user.password !== pwd) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 성공 시 items 페이지로 이동
    window.location.href = '/items';
  });

  // 초기 버튼 상태
  updateButtonState();
});
