document.querySelectorAll('.input-password').forEach(wrapper => {
    const input = wrapper.querySelector('input');
    const icon = wrapper.querySelector('img');

    if (input && icon) {
        icon.addEventListener('click', () => {
            input.type = input.type === 'password' ? 'text' : 'password';
        });
    } else {
        console.warn('input-password 요소 내부에 input 또는 img가 존재하지 않습니다.', wrapper);
    }
});

export const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
]

/*
validcheck-object = {
    ele: 검사할 input요소 (필수),
    errorlabel: 에러를 띄울 label (필수),
    pattern: 정규식검사 (생략가능),
    minLength: 최소길이 (생략가능),
    repeat: element와 본인의 ele.value값이 동일한지 확인 
    errorText: ['- 입력해주세요.', ...] 에러메시지 공백일 시 에러 이후 검사 순서대로 알림
}
*/

export function validCheck(object) {
    let check = 0;

    if (object.ele.value.trim() === '') {
        object.ele.classList.add('error-input');
        object.errorlabel.textContent = object.errorText[check];
        return false;
    }
    else check++;

    if (object.pattern !== undefined) {
        if (!object.pattern.test(object.ele.value)) {
            object.ele.classList.add('error-input');
            object.errorlabel.textContent = object.errorText[check];
            return false;
        }
        else check++;
    }

    if (object.minLength !== undefined) {
        if (object.ele.value.length < object.minLength) {
            object.ele.classList.add('error-input');
            object.errorlabel.textContent = object.errorText[check];
            return false;
        }
        else check++;
    }

    if (object.repeat !== undefined) {
        if (object.ele.value != object.repeat.value) {
            object.ele.classList.add('error-input');
            object.errorlabel.textContent = object.errorText[check];
            return false;
        }
        else check++;
    }

    object.ele.classList.remove('error-input');
    object.errorlabel.textContent = '';
    return true;
}

/* 유지보수 및 확장성 부족으로 폐기함
email_input.addEventListener('focusout', () => {
    if (email_input.value.trim() === '') {
        email_input.classList.add('error-input');
        email_errorlabel.textContent = '이메일을 입력해주세요.';
        validCheck.email = false;
        return;
    }

    if (email_pattern.test(email_input.value)) {
        email_input.classList.remove('error-input');
        email_errorlabel.textContent = '';
        validCheck.email = true;
    }
    else {
        email_input.classList.add('error-input');
        email_errorlabel.textContent = '잘못된 이메일 형식입니다.';
        validCheck.email = false;
    }
});

password_input.addEventListener('focusout', () => {
    if (password_input.value.trim() === '') {
        password_input.classList.add('error-input');
        password_errorlabel.textContent = '비밀번호를 입력해주세요.';
        validCheck.password = false;
        return;
    }

    if (password_input.value.length >= 8) {
        password_input.classList.remove('error-input');
        password_errorlabel.textContent = '';
        validCheck.password = true;
    }
    else {
        password_input.classList.add('error-input');
        password_errorlabel.textContent = '비밀번호를 8자 이상 입력해주세요.';
        validCheck.password = false;
    }
});

document.querySelectorAll('input').forEach(element => {
    element.addEventListener('focusout', () => {
        if (Object.values(validCheck).every(Boolean)) {
            console.log('통과');
        }
    });
});

*/