const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 검증 정규표현식
const MIN_PASSWORD_LENGTH = 8; // 비밀번호 최소 길이

const errorMessages = {
  email: "이메일을 입력해주세요.",
  nickname: "닉네임을 입력해주세요.",
  password: "비밀번호를 입력해주세요.",
  passwordCheck: "비밀번호가 일치하지 않습니다.",
  emailFormat: "잘못된 이메일 형식입니다.",
  passwordLength: "비밀번호를 8자 이상 입력해주세요.",
};

/**
 * 이메일 유효성 검증
 * @param {string} value 
 * @returns {string|null}
 */
export const validateEmail = (value) => {
  if (!value) return errorMessages.email;
  if (!emailRegex.test(value)) return errorMessages.emailFormat;
  return null;
};

/**
 * 닉네임 유효성 검증
 * @param {string} value 
 * @returns {string|null}
 */
export const validateNickname = (value) => {
  if (!value) return errorMessages.nickname;
  return null;
};

/**
 * 비밀번호 유효성 검증
 * @param {string} value 
 * @returns {string|null}
 */
export const validatePassword = (value) => {
  if (!value) return errorMessages.password;
  if (value.length < MIN_PASSWORD_LENGTH) return errorMessages.passwordLength;
  return null;
};

/**
 * 비밀번호 확인 유효성 검증
 * @param {string} value 
 * @param {string} password
 * @returns {string|null}
 */
export const validatePasswordCheck = (value, password) => {
  if (!value) return errorMessages.password;
  if (value !== password) return errorMessages.passwordCheck;
  return null;
};