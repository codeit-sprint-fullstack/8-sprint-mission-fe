import { USER_DATA } from '/assets/js/data.js';  

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const submit = form.querySelector("button[type='submit']");

  const touched = { email: false, password: false, confirmPassword: false };

  function validatePassword() {
    const val = password.value.trim();
    if (!val) {
      showError(password, "비밀번호를 입력해주세요.");
      return false;
    }
    if (val.length < 8) {
      showError(password, "비밀번호는 최소 8자 이상이어야 합니다.");
      return false;
    }
    removeError(password);
    return true;
  }

  function validateConfirmPassword() {
    const pwVal = password.value.trim();
    const cpVal = confirmPassword.value.trim();

    if (!cpVal) {
      showError(confirmPassword, "비밀번호 확인을 입력해주세요.");
      return false;
    }
    if (pwVal !== cpVal) {
      showError(confirmPassword, "비밀번호가 일치하지 않습니다.");
      return false;
    }
    removeError(confirmPassword);
    return true;
  }

  function checkForm() {
    const emailOk = touched.email ? validateEmail(email) : true;
    const pwOk = touched.password ? validatePassword() : true;
    const cpOk = touched.confirmPassword ? validateConfirmPassword() : true;
    const hasError = form.querySelector(".error-message");
    submit.disabled = !(emailOk && pwOk && cpOk && !hasError);
  }

  email.addEventListener("focus", () => touched.email = true);
  password.addEventListener("focus", () => touched.password = true);
  confirmPassword.addEventListener("focus", () => touched.confirmPassword = true);

  email.addEventListener("input", () => {
    if (touched.email) validateEmail(email);
    checkForm();
  });
  password.addEventListener("input", () => {
    if (touched.password) validatePassword();
    checkForm();
  });
  confirmPassword.addEventListener("input", () => {
    if (touched.confirmPassword) validateConfirmPassword();
    checkForm();
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateEmail(email) || !validatePassword() || !validateConfirmPassword()) return;

    const user = USER_DATA.find(u => u.email === email.value.trim());
    if (user) {
      showCustomAlert("사용 중인 이메일입니다.");
      return;
    }
    window.location.href = "/login.html";
  });
});
