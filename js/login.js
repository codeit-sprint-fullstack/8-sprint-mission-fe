import { USER_DATA } from './user_data.js';

const form = document.querySelector('#login_form');

const username = document.querySelector('#username');
const password = document.querySelector('#password');

const email_error = document.querySelector('#email_error');
const password_error = document.querySelector('#password_error');

const login_btn = document.querySelector('.login_btn');

const pw_icon = document.querySelector('.password_icon');

const error_modal = document.querySelector('#error_modal');
const modal_message = document.querySelector('#modal_message');
const modal_close_btn = document.querySelector('#modal_close_btn');

username.addEventListener('focusout', (e)=>{
    if(username.value.trim() === ''){
        email_error.textContent='이메일을 입력해주세요.';
        username.style.border='1px solid red';
        btn_statue_false();
    }
    else if(!validate_username(username)){
        email_error.textContent='잘못된 이메일 형식입니다';            
        username.style.border='1px solid red';
        btn_statue_false();
    }
    else {
        email_error.textContent=''; 
        username.style.borderColor='';
        btn_statue_true();
    }
});

password.addEventListener('focusout', (e)=>{
    if (password.value.trim()===''){
        password_error.textContent='비밀번호를 입력해주세요.';
        password.style.border='1px solid red';
        btn_statue_false();
    }
    else if (!validate_password(password)){
        password_error.textContent='비밀번호를 8자 이상 입력해주세요.';
        password.style.border='1px solid red';
        btn_statue_false();
    }
    else if (validate_password(password) && password.value.trim() !== ''){
        password_error.textContent='';
        password.style.borderColor='';
        btn_statue_true();
    }
    
});

function btn_statue_false(){
    return login_btn.setAttribute('type', 'button');
}

function btn_statue_true(){
    return login_btn.setAttribute('type', 'submit');
}

function validate_username(username){
    const email_test = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    return email_test.test(username.value);   
}

function validate_password(password){
    const password_test = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return password_test.test(password.value);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = username.value;
    const pw = password.value;

    const user = USER_DATA.find((user) => user.email === email);
    //alert로 뜨는게 맞는데 심화 과제어서 modal로 오류 메시지 보내라해서 세팅
    if (!user) {
        show_error_modal('사용자가 존재하지 않습니다.');
        // alert('사용자가 존재하지 않습니다.');
        return;
    }

    if (user.password !== pw) {
        show_error_modal('비밀번호가 일치하지 않습니다.');
        // alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    alert('로그인 성공!');
    window.location.href = 'items.html';
});

pw_icon.addEventListener('click', () => {
    const is_hidden = password.type === 'password';
    if (is_hidden) {
        password.setAttribute('type', 'text');
    }
    else {
        password.setAttribute('type', 'password');
    }
});

function show_error_modal(message) {
    modal_message.textContent = message;
    error_modal.classList.remove('hidden'); 
    document.body.style.overflow = 'hidden'; 
}

document.addEventListener("DOMContentLoaded", function() {
    modal_close_btn.addEventListener("click", function() {
        error_modal.classList.add("hidden");
    });
});