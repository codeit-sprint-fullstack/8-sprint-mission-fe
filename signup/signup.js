
import { validCheck, USER_DATA } from '/login/main.js';
import { showModal } from '/modal/modal.js';

const inputs = [
    { //email
        ele: document.querySelector('#email'),
        errorlabel: document.querySelector('p.email.error'),

        pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        errorText: ['이메일을 입력해주세요.', '잘못된 이메일 형식입니다.']
    },
    { // username
        ele: document.querySelector("#username"),
        errorlabel: document.querySelector('p.username.error'),
        errorText: ['닉네임을 입력해주세요.']
    },
    { // password
        ele: document.querySelector('#password'),
        errorlabel: document.querySelector('p.password.error'),

        minLength: 8,
        repeat: document.querySelector('#repeat-password'),
        errorText: ['비밀번호를 입력해주세요.', '비밀번호를 8자 이상 입력해주세요.', '비밀번호가 일치하지 않습니다.']
    },
    {
        ele: document.querySelector('#repeat-password'),
        errorlabel: document.querySelector('p.repeat-password.error'),

        minLength: 8,
        repeat: document.querySelector('#password'),
        errorText: ['비밀번호를 다시 한 번 입력해주세요.', '비밀번호를 8자 이상 입력해주세요.', '비밀번호가 일치하지 않습니다.']
    }
]

const isInputValids = new Array(inputs.length).fill(false);

inputs.forEach((inputObj, index) => {
    inputObj.ele.addEventListener('focusout', () => {
        isInputValids[index] = validCheck(inputObj);

        if (isInputValids.every(valid => valid === true))
            document.querySelector('#signup').disabled = false;
        else
            document.querySelector('#signup').disabled = true;
    });
});

document.querySelector('#signup').addEventListener('click', () => {
    const exist = USER_DATA.some(user => user.email === inputs[0].ele.value);

    if (exist) {
        showModal('사용 중인 이메일입니다.');
        return;
    }
    else
        location.href = '/login';

});