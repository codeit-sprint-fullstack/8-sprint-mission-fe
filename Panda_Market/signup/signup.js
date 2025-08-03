
document.addEventListener("DOMContentLoaded", () => {
  const emailInput       = document.getElementById('userEmail');
  const nicknameInput    = document.getElementById('id');
  const passwordInput    = document.getElementById('password');
  const passwordInputRe  = document.getElementById('password_re');
  const toggleIcon       = document.getElementById('togglepassword');
  const toggleIconRe     = document.getElementById('togglepassword_re');

  const emailError       = document.getElementById('email-error');
  const passwordError    = document.getElementById('password-error');
  const passwordReError  = document.getElementById('password-re-error');

  const signupButton     = document.querySelector('.button_layout button');
  const modal            = document.getElementById('customModal');
  const modalMessage     = document.getElementById('modalMessage');
  const modalClose       = document.getElementById('closeModal');

  // 중복 이메일 체크용
  const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
  ];

  // 비밀번호 보기 토글
  toggleIcon.addEventListener('click', () => {
    const isPwd = passwordInput.type === 'password';
    passwordInput.type = isPwd ? 'text' : 'password';
    toggleIcon.src     = isPwd ? '../images/visibility_on.png' : '../images/visibility_off.png';
  });
  toggleIconRe.addEventListener('click', () => {
    const isPwd = passwordInputRe.type === 'password';
    passwordInputRe.type = isPwd ? 'text' : 'password';
    toggleIconRe.src     = isPwd ? '../images/visibility_on.png' : '../images/visibility_off.png';
  });

  // 유효성 검사 함수들
  function validateEmail() {
    const v = emailInput.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v) {
      showEmailError("이메일을 입력해주세요.");
      return false;
    }
    if (!re.test(v)) {
      showEmailError("잘못된 이메일 형식입니다.");
      return false;
    }
    hideEmailError();
    return true;
  }
  function showEmailError(msg) {
    emailError.textContent = msg;
    emailError.classList.remove('hidden');
    emailInput.classList.add('invalid');
  }
  function hideEmailError() {
    emailError.classList.add('hidden');
    emailInput.classList.remove('invalid');
  }

  function validatePassword() {
    const v = passwordInput.value;
    if (!v) {
      showPasswordError("비밀번호를 입력해주세요.");
      return false;
    }
    if (v.length < 8) {
      showPasswordError("비밀번호를 8자 이상 입력해주세요.");
      return false;
    }
    hidePasswordError();
    return true;
  }
  function showPasswordError(msg) {
    passwordError.textContent = msg;
    passwordError.classList.remove('hidden');
    passwordInput.classList.add('invalid');
  }
  function hidePasswordError() {
    passwordError.classList.add('hidden');
    passwordInput.classList.remove('invalid');
  }

  function validatePasswordRe() {
    const v = passwordInputRe.value;
    if (!v) {
      showPasswordReError("비밀번호를 다시 입력해주세요.");
      return false;
    }
    if (v !== passwordInput.value) {
      showPasswordReError("비밀번호가 일치하지 않습니다.");
      return false;
    }
    hidePasswordReError();
    return true;
  }
  function showPasswordReError(msg) {
    passwordReError.textContent = msg;
    passwordReError.classList.remove('hidden');
    passwordInputRe.classList.add('invalid');
  }
  function hidePasswordReError() {
    passwordReError.classList.add('hidden');
    passwordInputRe.classList.remove('invalid');
  }

  // 버튼 활성화 관리
  function updateSignupButtonState() {
    const okEmail = validateEmail();
    const okPw    = validatePassword();
    const okRe    = validatePasswordRe();
    const isValid = okEmail && okPw && okRe;

    signupButton.disabled = !isValid;
    signupButton.classList.toggle('active', isValid);
  }

  // 이벤트 리스너 등록
  emailInput.addEventListener('blur', () => { validateEmail();    updateSignupButtonState(); });
  passwordInput.addEventListener('blur', () => { validatePassword(); updateSignupButtonState(); });
  passwordInputRe.addEventListener('blur', () => { validatePasswordRe(); updateSignupButtonState(); });

  emailInput.addEventListener('input', () => { hideEmailError();    updateSignupButtonState(); });
  passwordInput.addEventListener('input', () => { hidePasswordError(); updateSignupButtonState(); });
  passwordInputRe.addEventListener('input', () => { hidePasswordReError(); updateSignupButtonState(); });

  // 모달 제어
  function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
  }
  modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalMessage.textContent = "";
    hideEmailError();
    hidePasswordError();
    hidePasswordReError();
  });

  // 회원가입 버튼 클릭
  signupButton.addEventListener('click', (e) => {
    e.preventDefault();
    // 다시 한 번 유효성 확인
    if (!validateEmail() || !validatePassword() || !validatePasswordRe()) return;

    const inputEmail = emailInput.value.trim();
    // 중복 이메일 체크
    if (USER_DATA.some(u => u.email === inputEmail)) {
      showModal("이미 사용 중인 이메일입니다.");
      return;
    }

    showModal("회원가입이 완료되었습니다!");
    setTimeout(() => {
      modal.classList.add('hidden');
      window.location.href = "../login/login.html";
    }, 1000);
  });

  // 페이지 로드 직후 한 번 실행
  updateSignupButtonState();
});
