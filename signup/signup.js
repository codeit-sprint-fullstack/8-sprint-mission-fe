// 공통 모듈 이용
import {
    USER_DATA,
    isValidEmail,
    isValidPwd,
    showError,
    clearError,
} from '/js/formUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.signup-form form');
    const emailInput = document.getElementById('email');
    const nicknameInput = document.getElementById('nickname');
    const pwdInput = document.getElementById('pwd');
    const pwdChkInput = document.getElementById('pwd-chk');
    const signupBtn = document.getElementById('signup-btn');

    // 각 필드 검증 함수
    function validateEmail() {
        const v = emailInput.value.trim();
        clearError(emailInput);
        if (v === '') {
            showError(emailInput, '이메일을 입력해주세요.');
            return false;
        }
        if (!isValidEmail(v)) {
            showError(emailInput, '잘못된 이메일 형식입니다');
            return false;
        }
        return true;
    }

    function validateNickname() {
        const v = nicknameInput.value.trim();
        clearError(nicknameInput);
        if (v === '') {
            showError(nicknameInput, '닉네임을 입력해주세요.');
            return false;
        }
        return true;
    }

    function validatePwd() {
        const v = pwdInput.value;
        clearError(pwdInput);
        if (v === '') {
            showError(pwdInput, '비밀번호를 입력해주세요.');
            return false;
        }
        if (!isValidPwd(v)) {
            showError(pwdInput, '비밀번호를 8자 이상 입력해주세요.');
            return false;
        }
        return true;
    }

    function validatePwdConfirm() {
        const v = pwdChkInput.value;
        clearError(pwdChkInput);
        if (v === '') {
            showError(pwdChkInput, '비밀번호 확인을 입력해주세요.');
            return false;
        }
        if (v !== pwdInput.value) {
            showError(pwdChkInput, '비밀번호가 일치하지 않습니다.');
            return false;
        }
        return true;
    }

    // 버튼 상태 갱신
    function updateButtonState() {
        // 필수 입력 및 에러 없음
        const ok =
            validateEmail() &&
            validateNickname() &&
            validatePwd() &&
            validatePwdConfirm();
        signupBtn.disabled = !ok;
        signupBtn.classList.toggle('active', ok);
    }

    // focusout 시 개별 검증 & 버튼 상태 갱신
    emailInput.addEventListener('focusout', () => {
        validateEmail();
        updateButtonState();
    });
    nicknameInput.addEventListener('focusout', () => {
        validateNickname();
        updateButtonState();
    });
    pwdInput.addEventListener('focusout', () => {
        validatePwd();
        updateButtonState();
    });
    pwdChkInput.addEventListener('focusout', () => {
        validatePwdConfirm();
        updateButtonState();
    });

    // input 중일 때 에러 제거 & 버튼 상태 갱신
    [emailInput, nicknameInput, pwdInput, pwdChkInput].forEach((el) => {
        el.addEventListener('input', () => {
            clearError(el);
            updateButtonState();
        });
    });

    // 폼 제출 처리
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // 최종 검증
        const emailOk = validateEmail();
        const nickOk = validateNickname();
        const pwdOk = validatePwd();
        const pwdChkOk = validatePwdConfirm();
        updateButtonState();
        if (!(emailOk && nickOk && pwdOk && pwdChkOk)) return;

        const email = emailInput.value.trim();
        // 중복 체크
        const exists = USER_DATA.some((u) => u.email === email);
        if (exists) {
            alert('사용 중인 이메일입니다');
            return;
        }
        // 가입 성공 → 로그인 페이지로 이동
        window.location.href = '/login';
    });

    // 초기 버튼 상태
    updateButtonState();
});
