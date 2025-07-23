const passwordInput = document.getElementById('password');
const toggleIcon = document.getElementById('togglepassword');

toggleIcon.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';

 toggleIcon.src = isPassword ? 'Panda_Market/images/visibility_on.png' : 'Panda_Market/images/visibility_off.png';
});


const passwordInput_re = document.getElementById('password_re');
const toggleIcon_re = document.getElementById('togglepassword_re');

toggleIcon_re.addEventListener('click', () => {
  const isPassword = passwordInput_re.type === 'password';
  passwordInput_re.type = isPassword ? 'text' : 'password';

 toggleIcon_re.src = isPassword ? 'Panda_Market/images/visibility_on.png' : 'Panda_Market/images/visibility_off.png';
});
