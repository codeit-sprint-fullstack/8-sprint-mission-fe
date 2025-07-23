import { USER_DATA } from "../data/userData.js";

document.addEventListener("DOMContentLoaded", () => {   // dom이 로드되면 실행

  const loginForm = document.querySelector("#login-form"); // 로그인 폼
  const signupForm = document.querySelector("#signup-form"); // 회원가입 폼
  const emailInput = document.querySelector("#email"); // 이메일 입력 필드
  const nicknameInput = document.querySelector("#nickname"); // 닉네임 입력 필드
  const passwordInput = document.querySelector("#password"); // 비밀번호 입력 필드
  const passwordCheckInput = document.querySelector("#password-check"); // 비밀번호 확인 입력 필드
  const passwordToggleButtons = document.querySelectorAll(".input-password-toggle"); // 비밀번호 보기 버튼

  // 비밀번호 보기 버튼 클릭 시 비밀번호 표시 여부 토글
  passwordToggleButtons.forEach((button) => {
    const passwordInputs = button.parentElement.querySelector(".input-password");
    button.addEventListener("click", () => {
      const passwordType = passwordInputs.type === "password";
      passwordInputs.type = passwordType ? "text" : "password";

      const iconSrc = passwordType 
      ? "../assets/img/auth/visible-icon.svg" 
      : "../assets/img/auth/hidden-icon.svg";

      button.querySelector("img").src = iconSrc;
    });
  });

  // 이메일 및 비밀번호 유효성 검증
  const validateInput = (inputElement, type) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 검증 정규표현식
    const loginButton = document.querySelector(".btn-large"); // 로그인 버튼

    // 에러 메시지 추가
    const showError = (message) => {
      inputElement.classList.add("error");
      let errorMessage = inputElement.parentElement.querySelector("p");

      if (!errorMessage) {
        // 에러메시지가 존재하지 않을 경우 생성
        errorMessage = document.createElement("p");
        inputElement.parentElement.appendChild(errorMessage);
      }

      errorMessage.textContent = message; // 에러메시지가 존재하더라도 다른 에러가 작성될 수 있으므로 if문 밖에 작성.
    };

    // 에러 메시지 제거
    const removeError = () => {
      inputElement.classList.remove("error");
      const errorMessage = inputElement.parentElement.querySelector("p");
      errorMessage?.remove(); // 에러메시지가 존재하면 제거
    };

    // 버튼 활성화 여부 확인
    const isBtnDisabled = () => {
      const emailError = emailInput.classList.contains("error");
      const passwordError = passwordInput.classList.contains("error");
      const emailValue = emailInput.value;
      const passwordValue = passwordInput.value;

      // 4가지 조건이 모두 만족했을 시 버튼 활성화, 결과값이 모두 false일 때 버튼 활성화 ex) disabled=false
      return emailError || passwordError || emailValue === "" || passwordValue === "";
    };

    // 입력 값 검증
    if (inputElement.value === "") { // 값이 없을 경우
      showError(
        type === "email"
          ? "이메일을 입력해주세요."
          : type === "nickname"
          ? "닉네임을 입력해주세요."
          : "비밀번호를 입력해주세요."
      );
    } else if (type === "email" && !emailRegex.test(inputElement.value)) {
      // 이메일 형식에 맞지 않을 경우
      showError("잘못된 이메일 형식입니다.");
    } else if (type === "password" && inputElement.value.length < 8) {
      // 비밀번호가 8자 미만일 경우
      showError("비밀번호를 8자 이상 입력해주세요.");
    } else if (type === "password-check" && inputElement.value !== passwordInput.value) {
      // 비밀번호 확인 입력 필드가 비밀번호와 다를 경우
      showError("비밀번호가 일치하지 않습니다.");
    } else {
      // 값이 있고 형식에 맞을 경우
      removeError(); // 에러 메시지 제거
    }

    loginButton.disabled = isBtnDisabled(); // disabled가 false일 때 버튼 활성화 됨
  };

  // 이메일, 닉네임, 비밀번호 입력 필드 포커스 아웃 시 유효성 검증
  emailInput.addEventListener("blur", () => validateInput(emailInput, "email"));
  nicknameInput?.addEventListener("blur", () => validateInput(nicknameInput, "nickname")); // 닉네임 입력 필드가 없을 경우 실행하지 않음
  passwordInput.addEventListener("blur", () => validateInput(passwordInput, "password"));
  passwordCheckInput?.addEventListener("blur", () => validateInput(passwordCheckInput, "password-check")); // 비밀번호 확인 입력 필드가 없을 경우 실행하지 않음

  // 유저 데이터 배열 가져오기
  const userData = USER_DATA;
  // 로그인 버튼 클릭 시 이메일, 비밀번호 값 검증

  const handleSubmit = (e) => {
    e.preventDefault();

    const formType = e.target.dataset.formType;

    if (formType === "login") {
      handleLogin();
    } else if (formType === "signup") {
      handleSignup();
    }
  };

  loginForm?.addEventListener("submit", handleSubmit);
  signupForm?.addEventListener("submit", handleSubmit);

  // 로그인 버튼 클릭 시 이메일, 비밀번호 값 검증
  const handleLogin = () => {

    // 유저 데이터에서 사용자 입력값과 동일한 것이 있다면 True를 반환하는 코드
    const isLoginSuccess = userData.some((user) => {
      return user.email === emailInput.value && user.password === passwordInput.value;
    });

    // 로그인 성공 시 페이지 이동 / 실패 시 팝업 실행
    if (isLoginSuccess) {
      location.href = "/items";
    } else {
      showPopup("이메일 또는 비밀번호가 일치하지 않습니다.");
      emailInput.value = "";
      passwordInput.value = "";
    }
    };

  // 회원가입 버튼 클릭 시 이메일 중복 여부 확인
  const handleSignup = () => {

    const isEmailExist = userData.some((user) => {
      return user.email === emailInput.value;
    });
    
    if (isEmailExist) {
      showPopup("사용 중인 이메일입니다.");
      emailInput.value = "";
      nicknameInput.value = "";
      passwordInput.value = "";
      passwordCheckInput.value = "";
    } else {
      location.href="/login";
    }
  };

  // 팝업 관련 함수
  const showPopup = (message) => {
    const popup = document.querySelector("#popup");
    const content = popup.querySelector(".popup-content");
    content.textContent = message;
    popup.classList.add("active");
  };

  const closePopup = () => {
    const popup = document.querySelector("#popup");
    popup.classList.remove("active");
  };

  // 팝업 오버레이 클릭 시 팝업 닫기
  document.getElementById("popup").addEventListener("click", (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      closePopup();
    }
  });

  const popupBtn = document.querySelector(".popup-btn"); // 팝업 확인 버튼
  popupBtn.addEventListener("click", closePopup); // 팝업 확인 버튼 클릭 시 팝업 닫기
});
