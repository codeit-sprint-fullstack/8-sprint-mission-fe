const passwordInput = document.getElementById('password');
const toggleIcon = document.getElementById('togglepassword');

toggleIcon.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';

 toggleIcon.src = isPassword ? 'Panda_Market/images/visibility_on.png' : 'Panda_Market/images/visibility_off.png';
});

