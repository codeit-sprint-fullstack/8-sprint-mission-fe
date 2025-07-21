//Login Js
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// 초기 버튼 비활성화
loginBtn.disabled = true;

// 이메일 형식 검사
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateEmail() {
  const email = emailInput.value.trim();
  emailError.style.display = "none";
  emailInput.classList.remove("error");

  if (!email) {
    emailError.textContent = "이메일을 입력해주세요.";
    emailError.style.display = "block";
    emailInput.classList.add("error");
    return false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "잘못된 이메일 형식입니다";
    emailError.style.display = "block";
    emailInput.classList.add("error");
    return false;
  }
  return true;
}

//비밀번호 형식 검사
function validatePassword() {
  const pw = passwordInput.value.trim();
  passwordError.style.display = "none";
  passwordInput.classList.remove("error");

  if (!pw) {
    passwordError.textContent = "비밀번호를 입력해주세요.";
    passwordError.style.display = "block";
    passwordInput.classList.add("error");
    return false;
  } else if (pw.length < 8) {
    passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordError.style.display = "block";
    passwordInput.classList.add("error");
    return false;
  }
  return true;
}

function updateButtonState() {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  loginBtn.disabled = !(isEmailValid && isPasswordValid);
}

// 이벤트 등록
emailInput.addEventListener("focusout", () => {
  validateEmail();
  updateButtonState();
});

passwordInput.addEventListener("focusout", () => {
  validatePassword();
  updateButtonState();
});

emailInput.addEventListener("input", updateButtonState);
passwordInput.addEventListener("input", updateButtonState);

loginBtn.addEventListener("click", () => {
  if (!loginBtn.disabled) {
    window.location.href = "/items";
  }
});