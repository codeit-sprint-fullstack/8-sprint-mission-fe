import { emailInput, passwordInput, btnForm } from './DOM.js';

let emailDone = false;
let passwordDone = false;

function inputCheck(int) {
  int.addEventListener('focusout', ()=>{
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (int === emailInput){
      if (email === '') {
        setError(int, '이메일을 입력해주세요.');
      } else {
        clearError(int);
        emailDone = true;
      }
    } else if (int === passwordInput){
      if (password === '') {
        setError(int, '비밀번호를 입력해주세요.');
      } else if (password.length < 8) {
        setError(int, '비밀번호를 8자 이상 입력해주세요.');
      } else {
        clearError(int);
        passwordDone = true;
      }
    }

    if (emailDone && passwordDone) {
      btnForm.classList.add('active');
    } else {
      btnForm.classList.remove('active');
    }

  });
}

function setError(input, message) {
  input.classList.add('error');
  const errorBox = input.closest('.input-box').querySelector('span');
  errorBox.textContent = message;
}

function clearError(input) {
  input.classList.remove('error');
  const errorBox = input.closest('.input-box').querySelector('span');
  errorBox.textContent = '';
}

inputCheck(emailInput);
inputCheck(passwordInput);