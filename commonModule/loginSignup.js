let isVaildEmail = false;
let isVaildPassword = false;

const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const emailInput = document.querySelector("#email-input");
const pwInput = document.querySelector("#pw-input");
const repwInput = document.querySelector("#repw-input");

function checkValidEmail(){
    const MessageText = document.querySelector('.email-form .valid-check-text');
    const email = emailInput.value;
    if(pattern.test(email)){
        MessageText.textContent = ''; 
        emailInput.classList.remove('error');
        
        isVaildEmail = true;
    }
    else{
        emailInput.classList.add('error');
        if(email == ''){ MessageText.textContent = '이메일을 입력해주세요.';}
        else{MessageText.textContent = '잘못된 이메일 형식입니다.'; }

        isVaildEmail = false;
    }
    checkActiveButton();
}

function checkValidPassword(){
    const MessageText = document.querySelector('.pw-form .valid-check-text');
    const password = this.value; //입력칸 자신
    if(password.length >= 8){
        MessageText.textContent = ''; 
        this.classList.remove('error');

        isVaildPassword = true;
    }
    else{
        this.classList.add('error');
        if(password == ''){ MessageText.textContent =  '비밀번호를 입력해주세요.';}
        else{MessageText.textContent = '비밀번호를 8자 이상 입력해주세요.';}

        isVaildPassword = false;
    }    
    checkActiveButton();
}

function checkValidPasswordRe(){
    const MessageText = document.querySelector('.repw-form .valid-check-text');
    const password = this.value; //입력칸 자신
    if(password.length >= 8 && pwInput.value == repwInput.value){
        MessageText.textContent = ''; 
        this.classList.remove('error');
    }
    else{
        this.classList.add('error');
        if(password == ''){ MessageText.textContent =  '비밀번호를 입력해주세요.';}
        else if(password.length < 8){MessageText.textContent = '비밀번호를 8자 이상 입력해주세요.';}
        else if(pwInput.value != repwInput.value){ MessageText.textContent =  '동일한 비밀번호를 입력해주세요.'; }
    }
    checkActiveButton();
}

const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');
const loginBtn = document.querySelector('.login-form button');
const signUpBtn = document.querySelector('.signup-form button');

function checkActiveButton(){
    if(loginBtn){
        checkLoginBtnActive();
    }
    if(signUpBtn){
        checkSignUpBtnActive();
    }
}

if(loginBtn){
    loginBtn.disabled = true;
}
if(signUpBtn){
    signUpBtn.disabled = true;
}

function checkSignUpBtnActive(){
    if(isVaildEmail && isVaildPassword && pwInput.value == repwInput.value){
        signUpBtn.disabled = false;
        signUpBtn.classList.add('clickable');
    }
    else{
        signUpBtn.disabled = true;
        signUpBtn.classList.remove('clickable');
    }   
}

function checkLoginBtnActive(){
    if(isVaildEmail && isVaildPassword){
        loginBtn.disabled = false;
        loginBtn.classList.add('clickable');
    }
    else{
        loginBtn.disabled = true;
        loginBtn.classList.remove('clickable');
    }   
}

function signup(e){
    e.preventDefault(); //submit 폼을 자꾸 보내서 막음
    for(let e of USER_DATA){
        if(e.email == emailInput.value){           
            alert('사용 중인 이메일입니다.');
            return;
        }
    }
    window.location.href ='/login';
}

function login(e){
    e.preventDefault(); //submit 폼을 자꾸 보내서 막음
    for(let e of USER_DATA){
        if(e.email == emailInput.value && e.password == pwInput.value){           
            location.href ='/items';
            return;
        }
    }
    alert('비밀번호가 일치하지 않습니다.');
}

emailInput?.addEventListener('focusout', checkValidEmail);
pwInput?.addEventListener('focusout', checkValidPassword);
repwInput?.addEventListener('focusout', checkValidPasswordRe); //비밀번호 확인이 없는 로그인 페이지에서는 넘어가도록 ?를 넣음

loginForm?.addEventListener('submit', login); //같은 이유로 ?로 넘김
signupForm?.addEventListener('submit', signup); //같은이유로 ?로 넘김


const pwEye= document.querySelector('.signup-form button');
