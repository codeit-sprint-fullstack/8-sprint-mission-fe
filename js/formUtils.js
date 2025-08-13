// 더미 유저 데이터
export const USER_DATA = [
    { email: 'codeit1@codeit.com', password: 'codeit101!' },
    { email: 'codeit2@codeit.com', password: 'codeit202!' },
    { email: 'codeit3@codeit.com', password: 'codeit303!' },
    { email: 'codeit4@codeit.com', password: 'codeit404!' },
    { email: 'codeit5@codeit.com', password: 'codeit505!' },
    { email: 'codeit6@codeit.com', password: 'codeit606!' },
];

// 이메일 형식 검증
export function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 비밀번호 길이 검증
export function isValidPwd(pwd) {
    return pwd.length >= 8;
}

// 에러 메시지 표시 함수
export function showError(input, message) {
    clearError(input);
    input.style.border = '1px solid red';
    const err = document.createElement('p');
    err.className = 'error-message';
    err.innerText = message;
    err.style.color = 'red';
    err.style.margin = '0.4rem 0 0 0';
    err.style.fontSize = '1.4rem';
    input.parentElement.insertAdjacentElement('afterend', err);
}

// 에러 메시지 제거 함수
export function clearError(input) {
    input.style.border = '';
    const next = input.parentElement.nextElementSibling;
    if (next?.classList.contains('error-message')) {
        next.remove();
    }
}
