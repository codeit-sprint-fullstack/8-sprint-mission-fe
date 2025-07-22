import { USER_DATA, userEmail, userPassword } from "../validate/validate.js";

const submitBtn = document.querySelector('.submitBtn');

// 버튼 활성화 여부 검사
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();

  // 로그인 데이터 DB 비교
  const foundEmail = USER_DATA.find((el) => el.email === userEmail.value);
  const foundPassword = USER_DATA.find((el) => el.password === userPassword.value);

  if (verifyForm()) {
    if (foundEmail === undefined || foundPassword === undefined) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      window.location.href = '../items/items.html'
    }
  } else {
    console.log('Failed');
  }
});


// 로그인 버튼 활성화

const verifyForm = () => {
  const checkEmail = userEmail !== '' && !userEmail.classList.contains('errorBox');
  const checkPassword = userPassword !== '' && !userPassword.classList.contains('errorBox');

  return checkEmail && checkPassword
}


// Form 변화 실시간 감지
function updateButtonState() {
  if (verifyForm()) {
    submitBtn.disabled = false;
    submitBtn.classList.add('enableBtn');
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove('enableBtn');
  }
}

userPassword.addEventListener('focusout', updateButtonState);
