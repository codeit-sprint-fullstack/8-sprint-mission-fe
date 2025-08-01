// 커스텀 알림창
function showCustomAlert(msg, callback) {
  const prev = document.querySelector(".custom-alert-overlay");
  if (prev) prev.remove();

  const overlay = document.createElement("div");
  overlay.className = "custom-alert-overlay";

  const box = document.createElement("div");
  box.className = "custom-alert-box";

  const p = document.createElement("p");
  p.textContent = msg;
  p.className = "custom-alert-message";

  const btn = document.createElement("button");
  btn.textContent = "확인";
  btn.className = "custom-alert-button";
  btn.addEventListener("click", () => {
    overlay.remove();
    if (callback) callback();
  });

  box.append(p, btn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

// 에러 표시 / 제거
function showError(input, msg) {
  removeError(input);
  const err = document.createElement("div");
  err.className = "error-message";
  err.textContent = msg;
  input.parentNode.appendChild(err);
}

function removeError(input) {
  const err = input.parentNode.querySelector(".error-message");
  if (err) err.remove();
}

// 이메일 유효성 검사
function validateEmail(input) {
  const val = input.value.trim();
  if (!val) {
    showError(input, "이메일을 입력해주세요.");
    return false;
  }
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(val)) {
    showError(input, "올바른 이메일 형식이 아닙니다.");
    return false;
  }
  removeError(input);
  return true;
}

// 비밀번호 유효성 검사
function validatePassword(input) {
  const val = input.value.trim();
  if (!val) {
    showError(input, "비밀번호를 입력해주세요.");
    return false;
  }
  if (val.length < 8) {
    showError(input, "비밀번호는 최소 8자 이상이어야 합니다.");
    return false;
  }
  removeError(input);
  return true;
}

// 비밀번호 확인 유효성 검사
function validateConfirmPassword(passwordInput, confirmPasswordInput) {
  const pwVal = passwordInput.value.trim();
  const cpVal = confirmPasswordInput.value.trim();

  if (!cpVal) {
    showError(confirmPasswordInput, "비밀번호 확인을 입력해주세요.");
    return false;
  }
  if (pwVal !== cpVal) {
    showError(confirmPasswordInput, "비밀번호가 일치하지 않습니다.");
    return false;
  }
  removeError(confirmPasswordInput);
  return true;
}

// 폼 유효성 검사 및 제출 처리
function handleFormSubmit(form, email, password, confirmPassword, submitCallback) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePassword(password) || (confirmPassword && !validateConfirmPassword(password, confirmPassword))) return;

    submitCallback();
  });
}

// 폼 상태 체크
function checkFormState(form, email, password, confirmPassword, submit) {
  const emailOk = validateEmail(email);
  const pwOk = validatePassword(password);
  const cpOk = confirmPassword ? validateConfirmPassword(password, confirmPassword) : true;
  const hasError = form.querySelector(".error-message");
  submit.disabled = !(emailOk && pwOk && cpOk && !hasError);
}

// 비밀번호 토글
function togglePasswordVisibility() {
  document.querySelectorAll(".toggle-password").forEach(btn => {
    const eyeClose = "/assets/images/eye(close).svg";
    const eyeOpen = "/assets/images/eye(open).svg";
    const img = btn.querySelector("img");
    const input = btn.previousElementSibling;

    if (!input || input.tagName !== "INPUT" || (input.type !== "password" && input.type !== "text")) return;

    btn.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        img.src = eyeOpen;
        img.alt = "비밀번호 보이기";
        btn.setAttribute("aria-label", "비밀번호 숨기기");
      } else {
        input.type = "password";
        img.src = eyeClose;
        img.alt = "비밀번호 숨기기";
        btn.setAttribute("aria-label", "비밀번호 보기");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  togglePasswordVisibility();
});

export { showCustomAlert, handleFormSubmit, checkFormState, validateEmail, validatePassword, validateConfirmPassword };
