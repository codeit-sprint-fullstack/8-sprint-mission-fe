// login.js
document.addEventListener("DOMContentLoaded", () => {
  // 1) 기존 사용자 하드코딩 (로그인용)
  const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
  ];

  // 2) 비밀번호 보기 토글
  CommonAuth.togglePasswordVisibility('#password', '#togglepassword');

  // 3) 유효성 검사 규칙
  const isEmail = val => {
    if (!val) { isEmail.message = "이메일을 입력해주세요."; return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      isEmail.message = "잘못된 이메일 형식입니다."; return false;
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

  // 4) 필드별 유효성 연결
  CommonAuth.setupValidation('#userEmail',    '#email-error',    isEmail);
  CommonAuth.setupValidation('#password',     '#password-error', isPwd);

  // 5) 로그인 버튼 활성화 관리
  const updateBtn = CommonAuth.setupSubmitButton(
    '.button_layout button',
    () =>
      CommonAuth.validateField('#userEmail','#email-error', isEmail) &&
      CommonAuth.validateField('#password','#password-error', isPwd)
  );
  ['#userEmail','#password'].forEach(sel =>
    ['blur','input'].forEach(evt =>
      document.querySelector(sel).addEventListener(evt, updateBtn)
    )
  );

  // 6) 모달 함수
  const showModal = CommonAuth.setupModal('#customModal', '#closeModal');

  // 7) 로그인 처리
  document.querySelector('.button_layout button')
    .addEventListener('click', e => {
      e.preventDefault();
      if (!updateBtn()) return;
      const email = document.querySelector('#userEmail').value.trim();
      const pw    = document.querySelector('#password').value;
      const user  = USER_DATA.find(u => u.email === email);
      if (!user)           return showModal("등록된 이메일이 아닙니다.");
      if (user.password!==pw) return showModal("비밀번호가 일치하지 않습니다.");
      showModal("로그인 성공!");
    });
});
