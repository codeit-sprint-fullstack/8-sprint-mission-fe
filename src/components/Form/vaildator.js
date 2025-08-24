const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/; // 이메일 패턴
const MIN_PASSWORD_LENGTH = 8; // 비밀번호 최소길이

export function validateEmail(val) {
  if (!val) return "이메일을 입력해주세요.";
  if (!emailPattern.test(val)) return "잘못된 이메일 형식입니다.";
  return "";
}

export function validatePassword(val) {
  if (!val) return "비밀번호를 입력해주세요.";
  if (val.length < MIN_PASSWORD_LENGTH)
    return "비밀번호는 8자 이상 입력해주세요.";
  return "";
}

export function validateNickname(val) {
  if (!val) return "닉네임을 입력해주세요.";
  return "";
}

export function validatePasswordChecker(val, checker) {
  if (!val) return "비밀번호가 일치하지 않습니다.";
  if (val !== checker)
    return "비밀번호가 일치하지 않습니다.";
  return "";
}