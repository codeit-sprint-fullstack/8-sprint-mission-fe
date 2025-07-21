document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const nicknameInput = document.getElementById('nickname');
  const pwdInput = document.getElementById('pwd');
  const pwdChkInput = document.getElementById('pwd-chk');
  const signupBtn = document.getElementById('signup-btn');

  function updateButtonState() {
    const emailFilled = emailInput.value.trim() !== '';
    const nicknameFilled = nicknameInput.value.trim() !== '';
    const pwdFilled = pwdInput.value.trim() !== '';
    const pwdChkFilled = pwdChkInput.value.trim() !== '';
    const shouldEnable = (emailFilled && nicknameFilled) && (pwdFilled && pwdChkFilled);

    signupBtn.disabled = !shouldEnable;
    signupBtn.classList.toggle('active', shouldEnable);
  }

  // 입력값이 변할 때마다 상태 갱신
  [emailInput, nicknameInput, pwdInput, pwdChkInput].forEach(el =>
    el.addEventListener('input', updateButtonState)
  );

  // 초기 상태 설정
  updateButtonState();
});