const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

// email and password select
const emailInput = document.querySelector(".login-email input");
const passwordInput = document.querySelector(".form-pswd input");
// emnail and password error msg select
const emailErrorDiv = document.querySelector("#email-error");
const passwordErrorDiv = document.querySelector("#password-error");
// login button select
// [type='submit'] = type 속성이 'submit'인 button 요소
const loginButtonDiv = document.querySelector("#summitBtn");

// 이메일 유효성 검사 함수
function validateEmail() {
  if (emailInput.value === "") {
    // empty input
    emailErrorDiv.textContent = "이메일을 입력해주세요.";
    emailInput.style.border = "1px solid var(--error-red, #f74747)";
    loginButton.disabled = true; // btn 비활성화
    return false;
  } else if (
    emailInput.value.indexOf("@") === -1 || //
    emailInput.value.indexOf(".") === -1 //
  ) {
    emailErrorDiv.textContent = "잘못된 이메일 형식입니다.";
    emailInput.style.border = "1px solid var(--error-red, #f74747)";
    loginButton.disabled = true; // btn 비활성화
    return false;
  } else {
    // 이메일이 정상으로 적혔을때
    emailErrorDiv.textContent = "";
    emailInput.style.border = "";
    checkFormValid(); // 조건에 충족하면 btn 활성화.. 맞나?
    return true;
  }
  checkFormValid();
}

emailInput.addEventListener("blur", validateEmail);

// pswd 유효성 검사 함수
function validatePassword() {
  if (passwordInput.value === "") {
    passwordErrorDiv.textContent = "비밀번호를 입력해주세요.";
    passwordInput.style.border = "1px solid var(--error-red, #f74747)";
    loginButton.disabled = true; // btn 비활성화
    return false;
  } else if (passwordInput.value.length < 8) {
    passwordErrorDiv.textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordInput.style.border = "1px solid var(--error-red, #f74747)";
    loginButton.disabled = true; // btn 비활성화
    return false;
  } else {
    passwordErrorDiv.textContent = "";
    passwordInput.style.border = "";
    checkFormValid(); // 조건에 충족하면 btn 활성화.. 맞나?
    return true;
  }
}

passwordInput.addEventListener("blur", validatePassword);
