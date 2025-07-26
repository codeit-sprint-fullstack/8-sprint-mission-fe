import { showError, removeError, isBtnDisabled } from "./ui.js";

export const emailInput = document.querySelector("#email"); // 이메일 입력 필드
export const nicknameInput = document.querySelector("#nickname"); // 닉네임 입력 필드
export const passwordInput = document.querySelector("#password"); // 비밀번호 입력 필드
export const passwordCheckInput = document.querySelector("#password-check"); // 비밀번호 확인 입력 필드
const loginButton = document.querySelector(".btn-large"); // 로그인 버튼
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 검증 정규표현식
const MIN_PASSWORD_LENGTH = 8; // 비밀번호 최소 길이

const errorMessages = {
  email: "이메일을 입력해주세요.",
  nickname: "닉네임을 입력해주세요.",
  password: "비밀번호를 입력해주세요.",
  passwordCheck: "비밀번호가 일치하지 않습니다.",
  emailFormat: "잘못된 이메일 형식입니다.",
  passwordLength: "비밀번호를 8자 이상 입력해주세요.",
}

/**
 * 이메일, 닉네임, 비밀번호 유효성 검증 규칙
 */
const validationRules = {
  email: (value) => {
    if (!value) return errorMessages.email;
    if (!emailRegex.test(value)) return errorMessages.emailFormat;
    return null;
  },
  nickname: (value) => {
    if (!value) return errorMessages.nickname;
    return null;
  },
  password: (value) => {
    if (!value) return errorMessages.password;
    if (value.length < MIN_PASSWORD_LENGTH) return errorMessages.passwordLength;
    return null;
  },
  passwordCheck: (value) => {
    if (!value) return errorMessages.password;
    if (value !== passwordInput.value) return errorMessages.passwordCheck;
    return null;
  },
};

/**
 * 로그인, 회원가입 유효성 검증 함수
 * @param {HTMLInputElement} inputElement
 * @returns {void}
 */
const validateInput = (inputElement) => {
  const inputType = inputElement.name;
  const inputValue = inputElement.value;
  const errorMessage = validationRules[inputType](inputValue);
  
  errorMessage 
  ? showError(inputElement, errorMessage) 
  : removeError(inputElement);

  loginButton.disabled = isBtnDisabled();
};

/**
 * 이메일, 닉네임, 비밀번호 입력 필드 포커스 아웃 시 유효성 검증
 * @returns {void}
 */
export const validateBlurEvent = () => {
  emailInput.addEventListener("blur", () => {validateInput(emailInput)});
  nicknameInput?.addEventListener("blur", () => {validateInput(nicknameInput)}); // 닉네임 입력 필드가 없을 경우 실행하지 않음
  passwordInput.addEventListener("blur", () => {validateInput(passwordInput)});
  passwordCheckInput?.addEventListener("blur", () => {validateInput(passwordCheckInput)}); // 비밀번호 확인 입력 필드가 없을 경우 실행하지 않음
}