// email and password select
const emailInput = document.querySelector(".login-email input");
const passwordInput = document.querySelector(".form-pswd input");

// email and password error msg select
const emailErrorDiv = document.querySelector("#email-error");
const passwordErrorDiv = document.querySelector("#password-error");

// login button select
const loginButton = document.querySelector("button[type='submit']");

function checkFormValid() {
  const emailValid = validateEmailFormat(emailInput.value);
  const passwordValid = validatePasswordFormat(passwordInput.value);

  if (emailValid && passwordValid) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

// 로그인 함수 (먼저 정의)
function handleLogin(event) {
  if (event) event.preventDefault();

  const inputEmail = emailInput.value;
  const inputPassword = passwordInput.value;
  for (let i = 0; i < USER_DATA.length; i++) {
    if (USER_DATA[i].email === inputEmail) {
      if (USER_DATA[i].password === inputPassword) {
        window.location.href = "/items";
        return;
      } else {
        showErrorModal("비밀번호가 일치하지 않습니다.");
        return;
      }
    }
  }
  showErrorModal("가입되지 않은 이메일입니다");
}

// 이벤트 리스너들 (함수 정의 후에 등록)
loginButton.addEventListener("click", handleLogin);

emailInput.addEventListener("blur", function () {
  validateEmailWithError(emailInput, emailErrorDiv);
  checkFormValid();
});

passwordInput.addEventListener("blur", function () {
  validatePasswordWithError(passwordInput, passwordErrorDiv);
  checkFormValid();
});

emailInput.addEventListener("input", checkFormValid);
passwordInput.addEventListener("input", checkFormValid);

// 비밀번호 토글 기능
const passwordToggleIcon = document.querySelector(".password-hide-icon");

if (passwordToggleIcon) {
  passwordToggleIcon.addEventListener("click", function () {
    togglePasswordVisibility(passwordInput, passwordToggleIcon);
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
