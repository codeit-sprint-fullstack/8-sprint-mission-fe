// DOM 요소 선택
export const getAuthElements = () => {
  return {
    emailInput: document.querySelector("#email"),
    nicknameInput: document.querySelector("#nickname"),
    passwordInput: document.querySelector("#password"),
    passwordCheckInput: document.querySelector("#password-check"),
    loginButton: document.querySelector(".btn-large"),
    loginForm: document.querySelector("#login-form"),
    signupForm: document.querySelector("#signup-form"),
    toggleButtons: document.querySelectorAll(".input-password-toggle")
  };
}; 