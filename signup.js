const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];
const emailInput=document.getElementById("email");
const emailMsg =document.getElementById("emailMsg");
const passwordInput = document.getElementById("password");
const passwordMsg = document.getElementById("passwordMsg");
const passwordCheckInput = document.getElementById("password_check");
const passwordCheckMsg = document.getElementById("passwordCheckMsg");
const submit=document.getElementById("submit");

//이메일 유효성 검사
function validateEmail(emailInput){
    if(emailInput === '') return "이메일을 입력해주세요.";
    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailpattern.test(emailInput)) return "잘못된 이메일 형식입니다.";
    return "";
}

emailInput.addEventListener('blur',function(){
    const error = validateEmail(emailInput.value.trim());
    emailMsg.textContent =error;
    loginButtonState();
});
// 비밀번호 유효성 검사
function validatePassword(passwordInput){
    if(passwordInput ==='') return "비밀번호를 입력해주세요.";
    const passwordpattern =/^.{8,}$/;
    if(!passwordpattern.test(passwordInput)) return "비밀번호를 8자 이상 입력해주세요."
    return "";
}
passwordInput.addEventListener('blur',function(){
    const error = validatePassword(passwordInput.value.trim());
    passwordMsg.textContent=error;
    loginButtonState();
});


// 비밀번호 확인 유효성 검사
function validatePasswordCheck(password,passwordCheckInput){
    if(passwordCheckInput ==='') return "비밀번호를 다시 입력해주세요.";
    if(password !== passwordCheckInput) return "비밀번호가 일치하지 않습니다."
    return "";
}



function loginButtonState(){   //버튼 비활성화 및 활성화
    const emailError = validateEmail(emailInput.value.trim());    
    const passwordError = validatePassword(passwordInput.value.trim());
    const passwordCheckError = validatePasswordCheck(passwordInput.value.trim(),passwordCheckInput.value.trim());

    emailMsg.textContent =emailError;
    passwordMsg.textContent = passwordError;
    passwordCheckMsg.textContent = passwordCheckError;

    if(emailError || passwordError || passwordCheckError){
        submit.disabled = true;
    }else{submit.disabled = false;}

}
emailInput.addEventListener('input', loginButtonState);
passwordInput.addEventListener('input', loginButtonState);
passwordCheckInput.addEventListener('input',loginButtonState);

emailInput.addEventListener('blur', loginButtonState);
passwordInput.addEventListener('blur', loginButtonState);
passwordCheckInput.addEventListener('blur',loginButtonState);


document.getElementById("signup_form").addEventListener("submit",function(e){
    e.preventDefault();

    const email = emailInput.value.trim();


    const userEmail = USER_DATA.find(user => user.email=== email );

    if(userEmail){
        alert("사용중인 이메일입니다.");
    
        
    }else{
        alert("회원가입이 성공적으로 처리되었습니다.");
            window.location.href = "login.html";
    }

});