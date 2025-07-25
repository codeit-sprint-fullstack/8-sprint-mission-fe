const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

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

// 이메일 유효성 검사 함수
function validateEmail() {
  if (emailInput.value === "") {
    emailErrorDiv.textContent = "이메일을 입력해주세요.";
    emailInput.style.border = "1px solid var(--error-red, #f74747)";
    signupButton.disabled = true;
    return false;
  } else if (
    emailInput.value.indexOf("@") === -1 ||
    emailInput.value.indexOf(".") === -1
  ) {
    emailErrorDiv.textContent = "잘못된 이메일 형식입니다.";
    emailInput.style.border = "1px solid var(--error-red, #f74747)";
    signupButton.disabled = true;
    return false;
  } else {
    emailErrorDiv.textContent = "";
    emailInput.style.border = "";
    checkFormValid();
    return true;
  }
}

// 비밀번호 유효성 검사 함수
function validatePassword() {
  if (passwordInput.value === "") {
    passwordErrorDiv.textContent = "비밀번호를 입력해주세요.";
    passwordInput.style.border = "1px solid var(--error-red, #f74747)";
    signupButton.disabled = true;
    return false;
  } else if (passwordInput.value.length < 8) {
    passwordErrorDiv.textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordInput.style.border = "1px solid var(--error-red, #f74747)";
    signupButton.disabled = true;
    return false;
  } else {
    passwordErrorDiv.textContent = "";
    passwordInput.style.border = "";
    checkFormValid();
    return true;
  }
}

emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);

function checkFormValid() {
  const emailValid =
    emailInput.value !== "" &&
    emailInput.value.indexOf("@") !== -1 &&
    emailInput.value.indexOf(".") !== -1;
  const nicknameValid = nicknameInput.value !== "";
  const passwordValid =
    passwordInput.value !== "" && passwordInput.value.length >= 8;
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
      alert("사용 중인 이메일입니다");
      window.location.href = "./login.html";
      return;
    }
  }

  // 회원가입 성공
  window.location.href = "./index.html";
}

// 이벤트 추가
signupButton.addEventListener("click", handleSignup);
