// common.js
const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

// 공통 유효성 검사 함수들
function validateEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePasswordFormat(password) {
  return password !== "" && password.length >= 8;
}

// 공통 에러 처리 함수들
function showError(input, errorDiv, message) {
  if (errorDiv) errorDiv.textContent = message;
  input.style.border = "1px solid var(--error-red, #f74747)";
}

function clearError(input, errorDiv) {
  if (errorDiv) errorDiv.textContent = "";
  input.style.border = "";
}

// 공통 이메일 유효성 검사 (에러 처리 포함)
function validateEmailWithError(input, errorDiv) {
  if (input.value === "") {
    showError(input, errorDiv, "이메일을 입력해주세요.");
    return false;
  } else if (!validateEmailFormat(input.value)) {
    showError(input, errorDiv, "잘못된 이메일 형식입니다.");
    return false;
  } else {
    clearError(input, errorDiv);
    return true;
  }
}

// 공통 비밀번호 유효성 검사 (에러 처리 포함)
function validatePasswordWithError(input, errorDiv) {
  if (input.value === "") {
    showError(input, errorDiv, "비밀번호를 입력해주세요.");
    return false;
  } else if (!validatePasswordFormat(input.value)) {
    showError(input, errorDiv, "비밀번호를 8자 이상 입력해주세요.");
    return false;
  } else {
    clearError(input, errorDiv);
    return true;
  }
}

// 비밀번호 확인 유효성 검사 (에러 처리 포함)
function validatePasswordConfirmWithError(
  passwordInput,
  confirmInput,
  errorDiv
) {
  if (confirmInput.value === "") {
    showError(confirmInput, errorDiv, "비밀번호를 다시 입력해주세요.");
    return false;
  } else if (passwordInput.value !== confirmInput.value) {
    showError(confirmInput, errorDiv, "비밀번호가 일치하지 않습니다.");
    return false;
  } else {
    clearError(confirmInput, errorDiv);
    return true;
  }
}

// 비밀번호 보기/숨기기 토글 함수
function togglePasswordVisibility(passwordInput, toggleIcon) {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
