import { USER_DATA,  add_user } from './user_data.js';

const form = document.querySelector('#signup_form');

const username = document.querySelector('#username');
const password = document.querySelector('#password');
const password_ck = document.querySelector('#password_ck');

const email_error = document.querySelector('#email_error');
const password_error = document.querySelector('#password_error');
const password_ck_error = document.querySelector('#password_ck_error');

const login_btn = document.querySelector('.login_btn');

const pw_icon = document.querySelector('.password_icon');
const pw_icon_ck = document.querySelector('.password_icon_ck');

const error_modal = document.querySelector('#error_modal');
const modal_message = document.querySelector('#modal_message');
const modal_close_btn = document.querySelector('#modal_close_btn');

username.addEventListener('focusout', (e)=>{
     if(username.value.trim() === ''){
        console.log('이메일을 입력해주세요.');
        email_error.textContent='이메일을 입력해주세요.';
        username.style.border='1px solid red'
        btn_statue_false();
    }
    else if(!validate_username(username)){
        email_error.textContent='잘못된 이메일 형식입니다';            
        username.style.border='1px solid red'
        btn_statue_false();
    }
    else if(validate_username(username) && username.value.trim() !== ''){
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

password_ck.addEventListener('focusout', (e)=>{
    if(password.value !== password_ck.value){
        password_ck_error.textContent='비밀번호가 일치하지 않습니다.';
        password_ck.style.border='1px solid red';
        btn_statue_false();
        
    }
    else{
        password_ck_error.textContent='';
        password_ck.style.border='none';
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

    const exists = USER_DATA.find(user => user.email === email);

    //alert로 뜨는게 맞는데 심화 과제어서 modal로 오류 메시지 보내라해서 세팅
    if (exists) {
        show_error_modal('이미 존재하는 이메일입니다.');
        // alert('이미 존재하는 이메일입니다.');
        return;
    }


    const new_user = {
        email: email,
        password: pw
    };

    add_user(new_user);

    alert('회원가입이 완료되었습니다!');
    window.location.href = './login.html';
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

pw_icon_ck.addEventListener('click', () => {
    const is_hidden = password_ck.type === 'password';
    if (is_hidden) {
        password_ck.setAttribute('type', 'text');
    }
    else {
        password_ck.setAttribute('type', 'password');
    }
});

function show_error_modal(message) {
    modal_message.textContent = message;
    error_modal.classList.remove('hidden');
}

modal_close_btn.addEventListener('click', () => {
    error_modal.classList.add('hidden');
});