
import { validCheck, USER_DATA } from './main.js';
import { showModal } from '/modal/modal.js';

const inputs = [
    { //email
        ele: document.querySelector('#email'),
        errorlabel: document.querySelector('p.email.error'),

        pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        errorText: ['이메일을 입력해주세요.', '잘못된 이메일 형식입니다.']
    },
    { // password
        ele: document.querySelector('#password'),
        errorlabel: document.querySelector('p.password.error'),

        minLength: 8,
        errorText: ['비밀번호를 입력해주세요.', '비밀번호를 8자 이상 입력해주세요.']
    }
]

const isInputValids = new Array(inputs.length).fill(false);

inputs.forEach((inputObj, index) => {
    inputObj.ele.addEventListener('focusout', () => {
        isInputValids[index] = validCheck(inputObj);

        if (isInputValids.every(valid => valid === true))
            document.querySelector('#login').disabled = false;
        else
            document.querySelector('#login').disabled = true;
    });
});

document.querySelector('#login').addEventListener('click', () => {
    const foundUser = USER_DATA.find(user => user.email === inputs[0].ele.value);

    if (foundUser != undefined && foundUser.password == inputs[1].ele.value) {
        location.href = '/items';
        return;
    }
    else
        showModal('비밀번호가 일치하지 않습니다.');
});