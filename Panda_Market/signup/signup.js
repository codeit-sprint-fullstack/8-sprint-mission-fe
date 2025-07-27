// signup.js
document.addEventListener("DOMContentLoaded", () => {
  // 1) 기존 사용자 하드코딩 (중복 이메일 체크용)
  const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
  ];

  // 2) 비밀번호 보기 토글
  CommonAuth.togglePasswordVisibility('#password',    '#togglepassword');
  CommonAuth.togglePasswordVisibility('#password_re', '#togglepassword_re');

  // 3) 유효성 검사 규칙
  const isEmailFormat = val => {
    if (!val) { isEmailFormat.message = "이메일을 입력해주세요."; return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      isEmailFormat.message = "잘못된 이메일 형식입니다."; return false;
    }
    return true;
  };
  const isUniqueEmail = val => {
    if (USER_DATA.some(u => u.email === val)) {
      isUniqueEmail.message = "이미 사용 중인 이메일입니다.";
      return false;
    }
    return true;
  };
  const isPwd = val => {
    if (!val) { isPwd.message = "비밀번호를 입력해주세요."; return false; }
    if (val.length < 8) {
      isPwd.message = "비밀번호를 8자 이상 입력해주세요."; return false;
    }
    return true;
  };
  const isPwdMatch = val => {
    const orig = document.querySelector('#password').value.trim();
    if (!val) { isPwdMatch.message = "비밀번호를 다시 한 번 입력해주세요."; return false; }
    if (val !== orig) {
      isPwdMatch.message = "비밀번호가 일치하지 않습니다."; return false;
    }
    return true;
  };

  // 4) 필드별 유효성 연결
  CommonAuth.setupValidation(
    '#userEmail', '#email-error',
    val => isEmailFormat(val) && isUniqueEmail(val)
  );
  CommonAuth.setupValidation('#password',     '#password-error',   isPwd);
  CommonAuth.setupValidation('#password_re',  '#password-re-error',isPwdMatch);

  // 5) 회원가입 버튼 활성화 관리
  const updateBtn = CommonAuth.setupSubmitButton(
    '.button_layout button',
    () =>
      CommonAuth.validateField('#userEmail','#email-error', val => isEmailFormat(val) && isUniqueEmail(val)) &&
      CommonAuth.validateField('#password','#password-error', isPwd) &&
      CommonAuth.validateField('#password_re','#password-re-error', isPwdMatch)
  );
  ['#userEmail','#password','#password_re'].forEach(sel =>
    ['blur','input'].forEach(evt =>
      document.querySelector(sel).addEventListener(evt, updateBtn)
    )
  );

  // 6) 모달 함수
  const showModal = CommonAuth.setupModal('#customModal', '#closeModal');

  // 7) 회원가입 처리
  document.querySelector('.button_layout button')
    .addEventListener('click', e => {
      e.preventDefault();

      // 7-1) 이메일 중복 체크 모달
      const emailVal = document.querySelector('#userEmail').value.trim();
      if (!isEmailFormat(emailVal) || !isUniqueEmail(emailVal)) {
        return showModal("이미 사용 중인 이메일입니다");
      }
      // 7-2) 비밀번호 체크 모달
      const pw    = document.querySelector('#password').value.trim();
      const pwRe  = document.querySelector('#password_re').value.trim();
      if (!isPwd(pw))       return showModal(isPwd.message);
      if (!isPwdMatch(pwRe)) return showModal(isPwdMatch.message);

      // 모두 통과
      showModal("회원가입이 완료되었습니다!");
    });
});
