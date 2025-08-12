import { USER_DATA } from "../../data/userData.js";
import { getAuthElements } from "./dom.js";
import { showPopup } from "./popup.js";
import { validateEmail, validatePassword, validateNickname, validatePasswordCheck } from "./validation.js";
import { showError, removeError, checkButtonDisabled } from "./ui.js";

const userData = USER_DATA;

/**
 * 입력 필드 유효성 검증
 * @param {HTMLInputElement} inputElement 
 * @returns {void}
 */
const validateInput = (inputElement) => {
  const { passwordInput } = getAuthElements();
  const value = inputElement.value;
  let errorMessage = null;

  switch (inputElement.name) {
    case "email":
      errorMessage = validateEmail(value);
      break;
    case "nickname":
      errorMessage = validateNickname(value);
      break;
    case "password":
      errorMessage = validatePassword(value);
      break;
    case "passwordCheck":
      errorMessage = validatePasswordCheck(value, passwordInput.value);
      break;
  }

  if (errorMessage) {
    showError(inputElement, errorMessage);
  } else {
    removeError(inputElement);
  }

  updateButtonState();
};

/**
 * 버튼 상태 업데이트
 * @returns {void}
 */
const updateButtonState = () => {
  const { emailInput, passwordInput, nicknameInput, passwordCheckInput, loginButton } = getAuthElements();
  const inputs = [emailInput, passwordInput];
  
  if (nicknameInput) inputs.push(nicknameInput);
  if (passwordCheckInput) inputs.push(passwordCheckInput);

  loginButton.disabled = checkButtonDisabled(inputs);
};

/**
 * 로그인 처리
 * @returns {void}
 */
const handleLogin = () => {
  const { emailInput, passwordInput } = getAuthElements();
  
  const isLoginSuccess = userData.some((user) => {
    return user.email === emailInput.value && user.password === passwordInput.value;
  });

  if(isLoginSuccess) {
    location.href = "/items";
  } else {
    showPopup("이메일 또는 비밀번호가 일치하지 않습니다.");
  }
};

/**
 * 회원가입 처리
 * @returns {void}
 */
const handleSignup = () => {
  const { emailInput } = getAuthElements();
  
  const isEmailExist = userData.some((user) => {
    return user.email === emailInput.value;
  });
  
  if(isEmailExist) {
    showPopup("사용 중인 이메일입니다.");
  } else {
    location.href="/login";
  }
};

/**
 * 폼 제출 처리
 * @param {Event} e 
 * @returns {void}
 */
const handleSubmit = (e) => {
  e.preventDefault();
  const formType = e.target.dataset.formType;
  const handleForm = {
    login: handleLogin,
    signup: handleSignup,
  }[formType];

  handleForm();
};

/**
 * 이벤트 핸들러 초기화
 * @returns {void}
 */
export const initEventHandlers = () => {
  const { 
    emailInput, 
    passwordInput, 
    nicknameInput, 
    passwordCheckInput,
    loginForm,
    signupForm
  } = getAuthElements();

  // Blur 이벤트 핸들러
  emailInput?.addEventListener("blur", () => validateInput(emailInput));
  passwordInput?.addEventListener("blur", () => validateInput(passwordInput));
  nicknameInput?.addEventListener("blur", () => validateInput(nicknameInput));
  passwordCheckInput?.addEventListener("blur", () => validateInput(passwordCheckInput));

  // 폼 제출 이벤트 핸들러
  loginForm?.addEventListener("submit", handleSubmit);
  signupForm?.addEventListener("submit", handleSubmit);
};