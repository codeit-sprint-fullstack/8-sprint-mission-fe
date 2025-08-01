import { USER_DATA } from '/assets/js/data.js';
import { showCustomAlert, handleFormSubmit, checkFormState, validateEmail, validatePassword, validateConfirmPassword } from '/assets/js/common.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const submit = form.querySelector("button[type='submit']");

  const touched = { email: false, password: false, confirmPassword: false };

  email.addEventListener("focus", () => touched.email = true);
  password.addEventListener("focus", () => touched.password = true);
  confirmPassword.addEventListener("focus", () => touched.confirmPassword = true);

  email.addEventListener("input", () => {
    if (touched.email) validateEmail(email);
    checkFormState(form, email, password, confirmPassword, submit);
  });
  password.addEventListener("input", () => {
    if (touched.password) validatePassword(password);
    checkFormState(form, email, password, confirmPassword, submit);
  });
  confirmPassword.addEventListener("input", () => {
    if (touched.confirmPassword) validateConfirmPassword(password, confirmPassword);
    checkFormState(form, email, password, confirmPassword, submit);
  });

  handleFormSubmit(form, email, password, confirmPassword, () => {
    const user = USER_DATA.find(u => u.email === email.value.trim());
    if (user) {
      showCustomAlert("사용 중인 이메일입니다.");
      return;
    }
    window.location.href = "/login.html";
  });
});
