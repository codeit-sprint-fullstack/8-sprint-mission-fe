const form = document.querySelector('.form-box');
const emailInput = form.querySelector('#email');
const nameInput = form.querySelector('#name');
const passwordInput = form.querySelector('#password');
const passwordComfirmInput = form.querySelector('#password-comfirm');
const btnForm = form.querySelector('.form-btn');

////////////////////// 이메일 /// ///////////////////
function validateEmail () { 
  const email = emailInput.value;
  if (email === '') {
    setError(emailInput, '이메일을 입력해주세요.');
    return false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError(emailInput, '잘못된 이메일 형식입니다');
    return false;
  } else {
    clearError(emailInput);
    return true;
  }
}

////////////////////// 닉네임 //////////////////////
function checkName() { 
  if (nameInput && nameInput.value.trim() === '') {
    setError(nameInput, '닉네임을 입력해주세요.');
    return false;
  } else {
    if (nameInput) clearError(nameInput);
    return true;
  }
}

////////////////////// 비밀번호 //////////////////////
function checkPassword() {
  const password = passwordInput.value;
  if (password === '') {
    setError(passwordInput, '비밀번호를 입력해주세요.');
    return false;
  } else if (password.length < 8) {
    setError(passwordInput, '비밀번호를 8자 이상 입력해주세요.');
    return false;
  } else {
    clearError(passwordInput);
    return true;
  }
}

////////////////////// 비밀번호 확인 //////////////////////
function checkPasswordComfirm() {
  const password = passwordInput.value;
  const passwordComfirm = passwordComfirmInput.value;
  if (passwordComfirm === '') {
    setError(passwordComfirmInput, '비밀번호를 다시 입력해주세요.');
    return false;
  } else if (password !== passwordComfirm) {
    setError(passwordComfirmInput, '비밀번호가 일치하지 않습니다.');
    return false;
  } else {
    clearError(passwordComfirmInput);
    return true;
  }
}

////////////////////// 유효성 검사 //////////////////////
function updateButtonState() {
  let valid = validateEmail() && checkPassword();
  if (nameInput && passwordComfirmInput) {
    valid = valid && checkName() && checkPasswordComfirm();
  }
  if (valid) {
    btnForm.classList.add('active');
  } else {
    btnForm.classList.remove('active');
  }
}

function validateInput(int) {
  int.addEventListener('focusout', ()=>{

    if (int === emailInput){ 
      validateEmail ()
    } else if (int === passwordInput){ 
      checkPassword();
      if (passwordComfirmInput) checkPasswordComfirm();
    } else if (int === nameInput) { 
      checkName();
    } else if (int === passwordComfirmInput) { 
      checkPasswordComfirm();
    }
    updateButtonState();

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