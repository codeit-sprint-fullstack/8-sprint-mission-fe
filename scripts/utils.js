export const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// 이메일 유효성 검사
export function validateEmail(email) {
    if (email === '') return "이메일을 입력해주세요.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return "잘못된 이메일 형식입니다.";
    return "";
}

// 비밀번호 유효성 검사
export function validatePassword(password) {
    if (password === '') return "비밀번호를 입력해주세요.";
    const passwordPattern = /^.{8,}$/;
    if (!passwordPattern.test(password)) return "비밀번호를 8자 이상 입력해주세요.";
    return "";
}

// 비밀번호 확인 유효성 검사
export function validatePasswordCheck(password, passwordCheck) {
    if (passwordCheck === '') return "비밀번호를 다시 입력해주세요.";
    if (password !== passwordCheck) return "비밀번호가 일치하지 않습니다.";
    return "";
}

// 버튼 상태 업데이트
export function updateButtonState({ 
    email, password, passwordCheck = null, 
    emailMsg, passwordMsg, passwordCheckMsg = null, 
    submitButton 
}) {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const passwordCheckError = passwordCheck !== null ? validatePasswordCheck(password, passwordCheck) : "";

    emailMsg.textContent = emailError;
    passwordMsg.textContent = passwordError;
    if (passwordCheckMsg) {
        passwordCheckMsg.textContent = passwordCheckError;
    }

    submitButton.disabled = !!(emailError || passwordError || passwordCheckError);
}
