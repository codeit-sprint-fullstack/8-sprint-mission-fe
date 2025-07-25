// 이메일 input
// if focus out
// 1. check 값의 유무 - 없으면 "이메일을 입력해주세요."
// 2. check 이메일 형식 - 안맞으면 "잘못된 이메일 형식입니다."

const emailInputWrapper = document.querySelector(".email-wrapper");
const emailInput = document.getElementById("email");
const emailField = document.querySelector(".emailField");
const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const noEmail = document.createElement("div");
noEmail.textContent = "이메일을 입력해주세요.";
noEmail.classList.add("inputErrText");

const wrongEmail = document.createElement("div");
wrongEmail.textContent = "잘못된 이메일 형식입니다.";
wrongEmail.classList.add("inputErrText");

const emailChecker = (inputValue, updateUI = true) => {
  const emailValue = inputValue.trim();

  //초기화
  if (updateUI) {
    if (noEmail?.isConnected) noEmail.remove();
    if (wrongEmail?.isConnected) wrongEmail.remove();
    emailInputWrapper.classList.remove("inputErr");
  }

  // 유효성 검사 및 UI 업데이트 (UI 업데이트를 할 때만)
  if (emailValue === "") {
    if (updateUI) {
      emailInputWrapper.classList.add("inputErr");

      if (!emailField.contains(noEmail)) {
        emailField.append(noEmail);
      }
    }

    return false;
  } else if (!emailRule.test(emailValue)) {
    if (updateUI) {
      emailInputWrapper.classList.add("inputErr");

      if (!emailField.contains(wrongEmail)) {
        emailField.append(wrongEmail);
      }
    }

    return false;
  } else {
    // 유효할 경우 inputErr 클래스 제거 (UI 업데이트를 할 때만)
    if (updateUI) {
      emailInputWrapper.classList.remove("inputErr");
    }

    return true;
  }
};

emailInput.addEventListener("focusout", (e) => emailChecker(e.target.value));

// 비밀번호 input
// if focus out
// 1. check 값 유무 - 없으면 "비밀번호를 입력해주세요."
// 2. check 값 길이 - 8자 미만 "비밀번호를 8자 이상 입력해주세요."

const pwdInputWrapper = document.querySelector(".pwd-wrapper");
const pwdInput = document.getElementById("pwd");
const pwdField = document.querySelector(".pwdField");

const noPWD = document.createElement("div");
noPWD.textContent = "비밀번호를 입력해주세요.";
noPWD.classList.add("inputErrText");

const wrongPWD = document.createElement("div");
wrongPWD.textContent = "비밀번호를 8자 이상 입력해주세요.";
wrongPWD.classList.add("inputErrText");

const pwdChecker = (inputValue, updateUI = true) => {
  const pwdValue = inputValue.trim();

  //초기화
  if (updateUI) {
    if (noPWD?.isConnected) noPWD.remove();
    if (wrongPWD?.isConnected) wrongPWD.remove();
    pwdInputWrapper.classList.remove("inputErr");
  }

  // 유효성 검사 및 UI 업데이트 (UI 업데이트를 할 때만)
  if (pwdValue === "") {
    if (updateUI) {
      pwdInputWrapper.classList.add("inputErr");

      if (!pwdField.contains(noPWD)) {
        pwdField.append(noPWD);
      }
    }

    return false;
  } else if (pwdValue.length < 8) {
    if (updateUI) {
      pwdInputWrapper.classList.add("inputErr");

      if (!pwdField.contains(wrongPWD)) {
        pwdField.append(wrongPWD);
      }
    }

    return false;
  } else {
    // 유효할 경우 inputErr 클래스 제거 (UI 업데이트를 할 때만)
    if (updateUI) {
      pwdInputWrapper.classList.remove("inputErr");
    }

    return true;
  }
};

pwdInput.addEventListener("focusout", (e) => pwdChecker(e.target.value));
