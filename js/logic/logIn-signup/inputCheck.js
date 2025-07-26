import { form, emailInput, passwordInput, passwordComfirmInput, passwordToggle, nameInput, btnForm } from './DOM.js';

let emailDone = false;
let passwordDone = false;
let nameDone = false; 
let passwordComfirmDone = false;

////////////////////// 이메일 /// ///////////////////
function checkEmail() { 
  const email = emailInput.value;
  if (email === '') {
    setError(emailInput, '이메일을 입력해주세요.');
    emailDone = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError(emailInput, '잘못된 이메일 형식입니다');
    emailDone = false;
  } else {
    clearError(emailInput);
    emailDone = true;
  }
}

////////////////////// 닉네임 //////////////////////
function checkName() { 
  if (nameInput && nameInput.value.trim() === '') {
    setError(nameInput, '닉네임을 입력해주세요.');
    nameDone = false;
  } else {
    if (nameInput) clearError(nameInput);
    nameDone = true;
  }
}

////////////////////// 비밀번호 //////////////////////
function checkPassword() {
  const password = passwordInput.value;
  if (password === '') {
    setError(passwordInput, '비밀번호를 입력해주세요.');
    passwordDone = false;
  } else if (password.length < 8) {
    setError(passwordInput, '비밀번호를 8자 이상 입력해주세요.');
    passwordDone = false;
  } else {
    clearError(passwordInput);
    passwordDone = true;
  }
  if (passwordComfirmInput) checkPasswordComfirm();
}

////////////////////// 비밀번호 확인 //////////////////////
function checkPasswordComfirm() {
  const password = passwordInput.value;
  const passwordComfirm = passwordComfirmInput.value;
  if (passwordComfirm === '') {
    setError(passwordComfirmInput, '비밀번호를 다시 입력해주세요.');
    passwordComfirmDone = false;
  } else if (password !== passwordComfirm) {
    setError(passwordComfirmInput, '비밀번호가 일치하지 않습니다.');
    passwordComfirmDone = false;
  } else {
    clearError(passwordComfirmInput);
    passwordComfirmDone = true;
  }
}

////////////////////// 유효성 검사 //////////////////////
function validateInput(int) {
  int.addEventListener('focusout', ()=>{

    if (int === emailInput){ 
      checkEmail()
    } else if (int === passwordInput){ 
      checkPassword();
    } else if (int === nameInput) { 
      checkName();
    } else if (int === passwordComfirmInput) { 
      checkPasswordComfirm();
    }

    if (nameInput && passwordComfirmInput) {
      if (emailDone && passwordDone && nameDone && passwordComfirmDone) {
        btnForm.classList.add('active');
      } else {
        btnForm.classList.remove('active');
      }
    } else {
      if (emailDone && passwordDone) {
        btnForm.classList.add('active');
      } else {
        btnForm.classList.remove('active');
      }
    }

  });
}

////////////////////// 에러 //////////////////////
function setError(input, message) {
  const errorBox = input.closest('.input-box').querySelector('span');
  input.classList.add('error');
  errorBox.textContent = message;
}

function clearError(input) {
  const errorBox = input.closest('.input-box').querySelector('span');
  input.classList.remove('error');
  errorBox.textContent = '';
}

////////////////////// 버튼 활성화 //////////////////////
form.addEventListener('submit', function (e) {
  if (!btnForm.classList.contains('active')) {
    e.preventDefault();
  }
});

////////////////////// 비밀번호 숨김 토글 //////////////////////
form.querySelectorAll('.input-box').forEach(box => {
  const input = box.querySelector('input[type="password"], input[type="text"]');
  const toggle = box.querySelector('.password-toggle');
  if (input && toggle) {
    toggle.addEventListener('click', function () {
      if (input.type === 'password') {
        input.type = 'text';
        toggle.classList.add('active');
      } else {
        input.type = 'password';
        toggle.classList.remove('active');
      }
    });
  }
});


////////////////////// 실행 //////////////////////
validateInput(emailInput);
validateInput(passwordInput);
if (nameInput) validateInput(nameInput);
if (passwordComfirmInput) validateInput(passwordComfirmInput);