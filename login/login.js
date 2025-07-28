import { userEmail, userPassword } from "../validate/validate.js";
import { USER_DATA } from "../validate/USER_DATA.js";

const submitBtn = document.querySelector(".submitBtn");

// 버튼 활성화 여부 검사
submitBtn.addEventListener("click", (event) => {
  // 로그인 데이터 DB 비교
  const foundUser = USER_DATA.find(
    (user) =>
      user.email === userEmail.value && user.password === userPassword.value
  );

  if (verifyForm()) {
    if (foundUser) {
      console.log("Login Success!");
    } else {
      event.preventDefault();
      alert("비밀번호가 일치하지 않습니다.");
    }
  }
});

// 로그인 버튼 활성화

const verifyForm = () => {
  const checkEmail =
    userEmail !== "" && !userEmail.classList.contains("errorBox");
  const checkPassword =
    userPassword !== "" && !userPassword.classList.contains("errorBox");

  return checkEmail && checkPassword;
};

// Form 변화 실시간 감지
function updateButtonState() {
  if (verifyForm()) {
    submitBtn.disabled = false;
    submitBtn.classList.add("enableBtn");
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove("enableBtn");
  }
}

userPassword.addEventListener("focusout", updateButtonState);
