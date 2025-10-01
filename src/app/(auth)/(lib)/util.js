/** @typedef {{ email: string, password: string }} User */

/**
 * @param {string} v
 * @returns {string} 에러 메시지 또는 빈 문자열(유효함)
 */
export function validateEmail(v) {
  if (!v) return "이메일을 입력해주세요.";
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  return ok ? "" : "이메일 형식이 올바르지 않습니다.";
}

/**
 * @param {string} v
 * @returns {string} 에러 메시지 또는 빈 문자열(유효함)
 */
export function validatePassword(v) {
  if (!v) return "비밀번호를 입력해주세요.";
  const ok = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v);
  return ok ? "" : "비밀번호는 8자 이상, 숫자/문자를 포함해야 합니다.";
}
