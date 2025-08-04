// 이메일 검증
const verifyEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  if (email === "") {
    return "이메일을 입력해주세요.";
  } else if (!emailRegex.test(email)) {
    return "잘못된 이메일 형식입니다";
  } else {
    return "";
  }
};

export const userEmail = document.querySelector("#userEmail");
userEmail.addEventListener("focusout", (event) => {
  const result = verifyEmail(event.target.value);
  const errorMessage = document.querySelector(".email .error-none");

  if (result === "") {
    userEmail.classList.remove("errorBox");
    errorMessage.classList.remove("error-message");
  } else {
    errorMessage.textContent = result;
    errorMessage.classList.add("error-message");
    userEmail.classList.add("errorBox");
  }
});

// 비밀번호 검증
const verifyPassword = (password) => {
  if (password === "") {
    return "비밀번호를 입력해주세요.";
  } else if (password.length < 8) {
    return "비밀번호를 8자 이상 입력해주세요.";
  } else {
    return "";
  }
};

export const userPassword = document.querySelector("#userPassword");
userPassword.addEventListener("focusout", (event) => {
  const result = verifyPassword(event.target.value);
  const errorMessage = document.querySelector(".password .error-none");

  if (result === "") {
    userPassword.classList.remove("errorBox");
    errorMessage.classList.remove("error-message");
  } else {
    errorMessage.textContent = result;
    errorMessage.classList.add("error-message");
    userPassword.classList.add("errorBox");
  }
});
