
function focusOutInput(input) {
  input.addEventListener('focusout', () => {
    if (input.value === '') {
      let errorMessage = '';
      if (input.id === 'email') {
        errorMessage = '이메일을 입력해주세요.';
      } else if (input.id === 'password') {
        errorMessage = '비밀번호를 입력해주세요.';
      }

      input.classList.add('error');
      input.closest('.input-box').querySelector('span').textContent = errorMessage;
    } else if (input.id === 'password' && input.value.length < 8) {
      input.classList.add('error');
      input.closest('.input-box').querySelector('span').textContent = '비밀번호를 8자 이상 입력해주세요.';
    } else {
      btnForm.classList.add('active');
      input.classList.remove('error');
      input.closest('.input-box').querySelector('span').textContent = '';
    }
  });
}

focusOutInput(emailInput);
focusOutInput(passwordInput);
