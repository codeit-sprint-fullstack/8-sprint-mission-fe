import { USER_DATA } from "../../data/userData.js";
import { emailInput, passwordInput } from "./validation.js";
import { showPopup } from "./ui.js";

const userData = USER_DATA; // 유저 데이터 배열 가져오기

/**
 * 로그인 버튼 클릭 시 이메일, 비밀번호 값 검증
 * @returns {void}
 */
const handleLogin = () => {
  // 유저 데이터에서 사용자 입력값과 동일한 것이 있다면 True를 반환하는 코드
  const isLoginSuccess = userData.some((user) => {
    return user.email === emailInput.value && user.password === passwordInput.value;
  });

  // 로그인 성공 시 페이지 이동 / 실패 시 팝업 실행
  if(isLoginSuccess) {
    location.href = "/items";
  } else {
    showPopup("이메일 또는 비밀번호가 일치하지 않습니다.");
  }
};

/**
 * 회원가입 버튼 클릭 시 이메일 중복 여부 검증
 * @returns {void}
 */
const handleSignup = () => {
  const isEmailExist = userData.some((user) => {
    return user.email === emailInput.value;
  });
  
  // 이메일 중복 시 팝업 실행 / 중복 아닐 시 로그인 페이지로 이동
  if(isEmailExist) {
    showPopup("사용 중인 이메일입니다.");
  } else {
    location.href="/login";
  }
};

/**
 * 로그인, 회원가입 폼 제출 함수
 * @param {Event} e 
 * @returns {void}
 */
const handleSubmit = (e) => {
  e.preventDefault(); // 폼 기본 동작 방지
  const formType = e.target.dataset.formType;
  const handleForm = {
    login: handleLogin,
    signup: handleSignup,
  }[formType];

  handleForm();
};

/**
 * 로그인, 회원가입 폼 제출 이벤트 핸들러
 * @returns {void}
 */
export const handleSubmitEvent = () => {
  const loginForm = document.querySelector("#login-form"); // 로그인 폼
  const signupForm = document.querySelector("#signup-form"); // 회원가입 폼

  loginForm?.addEventListener("submit", handleSubmit);
  signupForm?.addEventListener("submit", handleSubmit);
};