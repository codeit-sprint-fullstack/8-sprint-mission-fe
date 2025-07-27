// input 요소들 선택
const emailInput = document.querySelector(".login-email input");
const nicknameInput = document.querySelector(".form-nickname input");
const passwordInput = document.querySelector(".form-pswd input");
const passwordConfirmInput = document.querySelectorAll(".form-pswd input")[1];

// 에러 메시지 div들 선택
const emailErrorDiv = document.querySelector("#email-error");
const passwordErrorDiv = document.querySelector("#password-error");
const passwordConfirmErrorDiv = document.querySelector(
  "#password-confirm-error"
);

// 회원가입 버튼 선택
const signupButton = document.querySelector("#signupBtn");

function checkFormValid() {
  const emailValid = validateEmailFormat(emailInput.value);
  const nicknameValid = nicknameInput.value !== "";
  const passwordValid = validatePasswordFormat(passwordInput.value);
  const passwordConfirmValid =
    passwordConfirmInput.value !== "" &&
    passwordInput.value === passwordConfirmInput.value;

  if (emailValid && nicknameValid && passwordValid && passwordConfirmValid) {
    signupButton.disabled = false;
  } else {
    signupButton.disabled = true;
  }
}

// 실시간 체크 이벤트
emailInput.addEventListener("input", checkFormValid);
nicknameInput.addEventListener("input", checkFormValid);
passwordInput.addEventListener("input", checkFormValid);
passwordConfirmInput.addEventListener("input", checkFormValid);

// 회원가입 함수
function handleSignup(event) {
  if (event) event.preventDefault();

  const inputEmail = emailInput.value;

  for (let i = 0; i < USER_DATA.length; i++) {
    if (USER_DATA[i].email === inputEmail) {
      showErrorModal("사용 중인 이메일입니다");
      // 모달을 띄우고 나서는 페이지 이동하지 말고 return
      return;
    }
  }

  // 회원가입 성공
  window.location.href = "./login.html";
}

// 이벤트 추가
signupButton.addEventListener("click", handleSignup);

// 이메일 blur 이벤트 (포커스가 벗어날 때)
emailInput.addEventListener("blur", function () {
  validateEmailWithError(emailInput, emailErrorDiv);
  checkFormValid();
});

// 비밀번호 blur 이벤트 (포커스가 벗어날 때)
passwordInput.addEventListener("blur", function () {
  validatePasswordWithError(passwordInput, passwordErrorDiv);
  checkFormValid();
});

// 비밀번호 확인 blur 이벤트
passwordConfirmInput.addEventListener("blur", function () {
  validatePasswordConfirmWithError(
    passwordInput,
    passwordConfirmInput,
    passwordConfirmErrorDiv
  );
  checkFormValid();
});

// 비밀번호 토글 기능 (2개의 비밀번호 필드)
const passwordToggleIcon = document.querySelector(".password-hide-icon");
const passwordConfirmToggleIcon = document.querySelectorAll(
  ".password-hide-icon"
)[1];

// 비밀번호 토글
if (passwordToggleIcon) {
  passwordToggleIcon.addEventListener("click", function () {
    togglePasswordVisibility(passwordInput, passwordToggleIcon);
  });
}

if (passwordConfirmToggleIcon) {
  passwordConfirmToggleIcon.addEventListener("click", function () {
    togglePasswordVisibility(passwordConfirmInput, passwordConfirmToggleIcon);
  });
}

// 모달 관련 함수들
function showErrorModal(message) {
  const modal = document.getElementById("errorModal");
  const modalMessage = document.getElementById("modalMessage");

  modalMessage.textContent = message;
  modal.style.display = "flex";
}

function hideErrorModal() {
  const modal = document.getElementById("errorModal");
  modal.style.display = "none";
}

// 모달 닫기 버튼 이벤트
const modalCloseBtn = document.getElementById("modalCloseBtn");
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", hideErrorModal);
}
