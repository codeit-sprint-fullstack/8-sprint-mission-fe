//Login Js
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const signupBtn = document.getElementById("signupBtn");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// 초기 버튼 비활성화
signupBtn.disabled = true;

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

//비밀번호 확인 형식 검사
function validateConfirmPassword() {
  const pw = passwordInput.value.trim();
  const confirmPw = confirmPasswordInput.value.trim();
  confirmPasswordError.style.display = "none";
  confirmPasswordInput.classList.remove("error");

  if (!confirmPw) {
    confirmPasswordError.textContent = "비밀번호 확인을 입력해주세요.";
    confirmPasswordError.style.display = "block";
    confirmPasswordInput.classList.add("error");
    return false;
  } else if (pw !== confirmPw) {
    confirmPasswordError.textContent = "비밀번호가 일치하지 않습니다.";
    confirmPasswordError.style.display = "block";
    confirmPasswordInput.classList.add("error");
    return false;
  }

  return true;
}

function updateButtonState() {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  signupBtn.disabled = !(isEmailValid && isPasswordValid && isConfirmPasswordValid);
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

confirmPasswordInput.addEventListener("focusout", () => {
  validateConfirmPassword();
  updateButtonState();
});

emailInput.addEventListener("input", updateButtonState);
passwordInput.addEventListener("input", updateButtonState);
confirmPasswordInput.addEventListener("input", updateButtonState);

signupBtn.addEventListener("click", () => {
  if (!signupBtn.disabled) {
    window.location.href = "/items";
  }
});