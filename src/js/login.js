const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.querySelector(".login-submit");
const form = document.querySelector(".login-form");

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
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    showError(emailInput, "잘못된 이메일 형식입니다");
    return false;
  }
  clearError(emailInput);
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

function updateButtonState() {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isEmailValid && isPasswordValid) {
    loginButton.disabled = false;
    loginButton.style.opacity = "1";
    loginButton.style.cursor = "pointer";
  } else {
    loginButton.disabled = true;
    loginButton.style.opacity = "0.5";
    loginButton.style.cursor = "not-allowed";
  }
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
passwordInput.addEventListener("blur", () => {
  validatePassword();
  updateButtonState();
});
emailInput.addEventListener("input", updateButtonState);
passwordInput.addEventListener("input", updateButtonState);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateEmail() && validatePassword()) {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const foundUser = USER_DATA.find(user => user.email === email);

    if (!foundUser || foundUser.password !== password) {
      showErrorModal('비밀번호가 일치하지 않습니다.');
    } else {
      window.location.href = '/items';
    }
  }
});

function showErrorModal(message) {
  const modal = document.getElementById("error-modal");
  const modalMessage = modal.querySelector(".modal-message");
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
}

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("error-modal").classList.add("hidden");
});

loginButton.disabled = true;
loginButton.style.opacity = "0.5";
loginButton.style.cursor = "not-allowed";
