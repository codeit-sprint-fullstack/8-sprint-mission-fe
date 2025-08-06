import { USER_DATA } from '/assets/js/data.js';
import { showCustomAlert, handleFormSubmit, checkFormState, validateEmail, validatePassword } from '/assets/js/common.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submit = form.querySelector("button[type='submit']");

  const touched = { email: false, password: false };

  email.addEventListener("focus", () => touched.email = true);
  password.addEventListener("focus", () => touched.password = true);

  email.addEventListener("input", () => {
    if (touched.email) validateEmail(email);
    checkFormState(form, email, password, null, submit);
  });
  password.addEventListener("input", () => {
    if (touched.password) validatePassword(password);
    checkFormState(form, email, password, null, submit);
  });

  handleFormSubmit(form, email, password, null, () => {
    const user = USER_DATA.find(u => u.email === email.value.trim());
    if (!user || user.password !== password.value.trim()) {
      showCustomAlert("비밀번호가 일치하지 않습니다.");
      return;
    }
    window.location.href = "/items";
  });
});
