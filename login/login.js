document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const pwdInput = document.getElementById('pwd');
  const loginBtn = document.getElementById('login-btn');

  function updateButtonState() {
    const emailFilled = emailInput.value.trim() !== '';
    const pwdFilled   = pwdInput.value.trim()   !== '';
    const shouldEnable = emailFilled && pwdFilled;

    loginBtn.disabled = !shouldEnable;
    loginBtn.classList.toggle('active', shouldEnable);
  }

  // 입력값이 변할 때마다 상태 갱신
  emailInput.addEventListener('input', updateButtonState);
  pwdInput  .addEventListener('input', updateButtonState);

  // 초기 상태 설정
  updateButtonState();
});