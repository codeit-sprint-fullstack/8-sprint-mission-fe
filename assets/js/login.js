const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submit = form.querySelector("button[type='submit']");

  const touched = { email: false, password: false };

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

  function checkForm() {
    const emailOk = touched.email ? validateEmail(email) : true;
    const pwOk = touched.password ? validatePassword() : true;
    const hasError = form.querySelector(".error-message");
    submit.disabled = !(emailOk && pwOk && !hasError);
  }

  email.addEventListener("focus", () => touched.email = true);
  password.addEventListener("focus", () => touched.password = true);

  email.addEventListener("input", () => {
    if (touched.email) validateEmail(email);
    checkForm();
  });
  password.addEventListener("input", () => {
    if (touched.password) validatePassword();
    checkForm();
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateEmail(email) || !validatePassword()) return;

    const user = USER_DATA.find(u => u.email === email.value.trim());
    if (!user || user.password !== password.value.trim()) {
      showCustomAlert("비밀번호가 일치하지 않습니다.");
      return;
    }
    window.location.href = "/items";
  });
});
