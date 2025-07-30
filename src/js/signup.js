const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const emailInput = document.getElementById("email");
const nicknameInput = document.getElementById("nickname");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const signupButton = document.querySelector(".signup-submit");
const form = document.querySelector(".signup-form");

function showError(input, message) {
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains("error-message")) {
    error = document.createElement("div");
    error.className = "error-message";
    input.insertAdjacentElement("afterend", error);
  }
  error.textContent = message;
  error.style.color = "red";
  error.style.fontSize = "14px";
  error.style.marginTop = "4px";
  input.style.border = "1px solid red";
}

function clearError(input) {
  const error = input.nextElementSibling;
  if (error && error.classList.contains("error-message")) {
    error.remove();
  }
  input.style.border = "1px solid transparent";
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (!value) {
    showError(emailInput, "이메일을 입력해주세요.");
    return false;
  }
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(value)) {
    showError(emailInput, "잘못된 이메일 형식입니다");
    return false;
  }
  clearError(emailInput);
  return true;
}

function validateNickname() {
  const value = nicknameInput.value.trim();
  if (!value) {
    showError(nicknameInput, "닉네임을 입력해주세요.");
    return false;
  }
  clearError(nicknameInput);
  return true;
}

function validatePassword() {
  const value = passwordInput.value.trim();
  if (!value) {
    showError(passwordInput, "비밀번호를 입력해주세요.");
    return false;
  }
  if (value.length < 8) {
    showError(passwordInput, "비밀번호를 8자 이상 입력해주세요.");
    return false;
  }
  clearError(passwordInput);
  return true;
}

function validateConfirmPassword() {
  const value = confirmInput.value.trim();
  if (!value) {
    showError(confirmInput, "비밀번호를 다시 입력해주세요.");
    return false;
  }
  if (value !== passwordInput.value.trim()) {
    showError(confirmInput, "비밀번호가 일치하지 않습니다.");
    return false;
  }
  clearError(confirmInput);
  return true;
}

function updateButtonState() {
  const valid = validateEmail() && validateNickname() && validatePassword() && validateConfirmPassword();
  signupButton.disabled = !valid;
  signupButton.style.opacity = valid ? "1" : "0.5";
  signupButton.style.cursor = valid ? "pointer" : "not-allowed";
}

document.querySelectorAll(".toggle-password").forEach(icon => {
  icon.addEventListener("click", () => {
    const input = icon.previousElementSibling;
    if (input.type === "password") {
      input.type = "text";
      icon.src = "img/eye.png";
    } else {
      input.type = "password";
      icon.src = "img/eye.off.png";
    }
  });
});

emailInput.addEventListener("blur", () => {
  validateEmail();
  updateButtonState();
});
nicknameInput.addEventListener("blur", () => {
  validateNickname();
  updateButtonState();
});
passwordInput.addEventListener("blur", () => {
  validatePassword();
  updateButtonState();
});
confirmInput.addEventListener("blur", () => {
  validateConfirmPassword();
  updateButtonState();
});

emailInput.addEventListener("input", updateButtonState);
nicknameInput.addEventListener("input", updateButtonState);
passwordInput.addEventListener("input", updateButtonState);
confirmInput.addEventListener("input", updateButtonState);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    validateEmail() &&
    validateNickname() &&
    validatePassword() &&
    validateConfirmPassword()
  ) {
    const email = emailInput.value.trim();
    const isDuplicated = USER_DATA.some(user => user.email === email);

    if (isDuplicated) {
      showErrorModal("사용 중인 이메일입니다");
      return;
    }

    alert("회원가입 성공!");
    window.location.href = "/login";
  }
});

signupButton.disabled = true;
signupButton.style.opacity = "0.5";
signupButton.style.cursor = "not-allowed";



function showErrorModal(message) {
  const modal = document.getElementById("error-modal");
  const modalMessage = modal.querySelector(".modal-message");
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
}

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("error-modal").classList.add("hidden");
});