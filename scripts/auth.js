// 선택사항: `DOMContentLoaded` 이벤트 리스너를 사용해 DOM 요소들이 완전히 로드된 후에 이벤트 리스너를 등록하면, 스크립트 태그의 위치와 상관 없이 DOM 요소를 안전하게 참조할 수 있어요.
//         현재 HTML 구조에서는 자바스크립트 파일이 문서의 마지막에 위치해 있기 때문에 DOMContentLoaded 없이 바로 이벤트 리스너들을 추가해도 문제 없어요.
//         스크립트의 위치를 문서 상단으로 이동하거나, 동적으로 스크립트를 로드하는 경우에는 DOMContentLoaded 이벤트 리스너 내부에서 이벤트 리스너들을 등록하는 것이 안전해요.

document.addEventListener("DOMContentLoaded", () => {
  // 각 필드의 유효성 검사 상태를 저장하는 전역 변수
  let isEmailValid = false;
  let isPasswordValid = false;
  let isPasswordConfirmationValid = false;

  // ID를 통해 타겟 DOM 요소에 접근
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const emailInput = document.getElementById("email");
  const nicknameInput = document.getElementById("nickname");
  const passwordInput = document.getElementById("password");
  const passwordConfirmationInput = document.getElementById(
    "passwordConfirmation"
  );
  const submitButton = document.querySelector(
    '.auth-container form button[type="submit"]'
  );

  function showError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "block";
    input.style.border = "1px solid #f74747";
  }

  function hideError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "none";
    input.style.border = "none";
  }

  function togglePasswordVisibility(event) {
    const button = event.currentTarget;
    const inputField = button.parentElement.querySelector("input");
    const toggleIcon = button.querySelector(".password-toggle-icon");

    const isPasswordVisible = inputField.type === "text";

    inputField.type = isPasswordVisible ? "password" : "text";

    toggleIcon.src = isPasswordVisible
      ? "images/icons/eye-invisible.svg"
      : "images/icons/eye-visible.svg";
    toggleIcon.alt = isPasswordVisible
      ? "비밀번호 표시 상태 아이콘"
      : "비밀번호 숨김 상태 아이콘";

    button.setAttribute(
      "aria-label",
      isPasswordVisible ? "비밀번호 보기" : "비밀번호 숨기기"
    );
  }

  function validateEmailString(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  function checkEmailValidity() {
    const emailValue = emailInput.value.trim();

    isEmailValid = false;
    hideError(emailInput, "emailEmptyError");
    hideError(emailInput, "emailInvalidError");

    if (!emailValue) {
      showError(emailInput, "emailEmptyError");
    } else if (!validateEmailString(emailValue)) {
      showError(emailInput, "emailInvalidError");
    } else {
      isEmailValid = true;
      hideError(emailInput, "emailEmptyError");
      hideError(emailInput, "emailInvalidError");
    }

    updateSubmitButtonState();
  }

  function checkPasswordValidity() {
    const passwordValue = passwordInput.value.trim();
    isPasswordValid = false;

    hideError(passwordInput, "passwordEmptyError");
    hideError(passwordInput, "passwordInvalidError");

    if (!passwordValue) {
      showError(passwordInput, "passwordEmptyError");
    } else if (passwordValue.length < 8) {
      showError(passwordInput, "passwordInvalidError");
    } else {
      isPasswordValid = true;
      hideError(passwordInput, "passwordEmptyError");
      hideError(passwordInput, "passwordInvalidError");
    }
    updateSubmitButtonState();

    if (signupForm) {
      checkPasswordConfirmationValidity();
    }
  }

  function checkPasswordConfirmationValidity() {
    const passwordConfirmationValue = passwordConfirmationInput.value.trim();
    isPasswordConfirmationValid = false;

    hideError(passwordConfirmationInput, "passwordConfirmationError");
    hideError(passwordConfirmationInput, "passwordConfirmationInitError");

    if (!isPasswordValid) {
      showError(passwordConfirmationInput, "passwordConfirmationInitError");
    } else if (
      !passwordConfirmationValue ||
      passwordConfirmationValue !== passwordInput.value.trim()
    ) {
      showError(passwordConfirmationInput, "passwordConfirmationError");
    } else {
      isPasswordConfirmationValid = true;
      hideError(passwordConfirmationInput, "passwordConfirmationError");
      hideError(passwordConfirmationInput, "passwordConfirmationInitError");
    }
    updateSubmitButtonState();
  }

  function updateSubmitButtonState() {

    let isFormValid = isEmailValid && isPasswordValid;

    if (signupForm) {
      isFormValid =
        isFormValid && isPasswordConfirmationValid;
    }

    submitButton.disabled = !isFormValid;
  }

  if (emailInput) {
    emailInput.addEventListener("focusout", checkEmailValidity);
  }
  if (nicknameInput) {
    nicknameInput.addEventListener("focusout", checkNicknameValidity);
  }
  if (passwordInput) {
    passwordInput.addEventListener("input", checkPasswordValidity);
  }
  if (passwordConfirmationInput) {
    passwordConfirmationInput.addEventListener(
      "input",
      checkPasswordConfirmationValidity
    );
  }

  updateSubmitButtonState();

  const toggleButtons = document.querySelectorAll(".password-toggle-button"); // 'password-toggle-button' 클래스를 가진 모든 요소들의 배열
  toggleButtons.forEach((button) => {
    button.addEventListener("click", togglePasswordVisibility);
  });

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailValue = emailInput.value.trim();
      const passwordValue = passwordInput.value.trim();

      const user = USER_DATA.find((user) => user.email === emailValue);
      if (!user || user.password !== passwordValue) {
        showModal(errors.passwordMismatch, "/signup.html");
      } else {
        window.location.href = "/items.html";
      }
    });
  }
  
  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailValue = emailInput.value.trim();
      const passwordValue = passwordInput.value.trim();

      const userExists = USER_DATA.some((user) => user.email === emailValue);
      if (userExists) {
        showModal(errors.emailExists, "/login.html");
      } else {
        USER_DATA.push({ email: emailValue, password: passwordValue });
        window.location.href = "/login.html";
      }
    });
  }
});
