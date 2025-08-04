import { userEmail, userPassword } from "../validate/validate.js";
import { USER_DATA } from "../validate/USER_DATA.js";

const submitBtn = document.querySelector(".submitBtn");

// 비밀번호 확인
const passwordCheck = document.querySelector("#passwordCheck");
const passwordChecker = (pwCheck) => {
  if (pwCheck === userPassword.value) {
    return "";
  } else {
    return "비밀번호가 일치하지 않습니다.";
  }
};

passwordCheck.addEventListener("focusout", (event) => {
  const result = passwordChecker(event.target.value);
  const errorMessage = document.querySelector(".passwordCheck .error-none");

  if (result === "") {
    passwordCheck.classList.remove("errorBox");
    errorMessage.classList.remove("error-message");
  } else {
    errorMessage.textContent = result;
    errorMessage.classList.add("error-message");
    passwordCheck.classList.add("errorBox");
  }
});

// 버튼 활성화 여부 검사
submitBtn.addEventListener("click", (event) => {
  // 로그인 데이터 DB 비교
  const foundEmail = USER_DATA.find((el) => el.email === userEmail.value);
  const foundPassword = USER_DATA.find(
    (el) => el.password === userPassword.value
  );

  if (verifyForm()) {
    console.log("Success!");
    if (foundEmail) {
      event.preventDefault();
      alert("사용중인 이메일입니다.");
    } else {
      console.log("Signup!");
      console.log(foundEmail);
    }
  }
});

// 로그인 버튼 활성화

const verifyForm = () => {
  const checkEmail =
    userEmail.value !== "" && !userEmail.classList.contains("errorBox");
  const checkPassword =
    userPassword.value !== "" && !userPassword.classList.contains("errorBox");
  const checkPasswordChecker =
    passwordCheck.value !== "" && !passwordCheck.classList.contains("errorBox");

  return checkEmail && checkPassword && checkPasswordChecker;
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

passwordCheck.addEventListener("focusout", updateButtonState);
