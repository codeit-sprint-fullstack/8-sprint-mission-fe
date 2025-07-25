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

// 닉네임 input
// if focus out
// 1. check 값 유무 - 없으면 "닉네임을 입력해주세요."

const nicknameWrapper = document.querySelector(".nickname-wrapper");
const nicknameInput = document.getElementById("nickname");
const nicknameField = document.querySelector(".nicknameField");

const noNickname = document.createElement("div");
noNickname.textContent = "닉네임을 입력해주세요.";
noNickname.classList.add("inputErrText");

const nicknameChecker = (inputValue, updateUI = true) => {
  const nicknameValue = inputValue.trim();

  //초기화
  if (updateUI) {
    if (noNickname?.isConnected) noNickname.remove();
    // 로그인 같이 nicknameWrapper가 없으면 동작X
    if (nicknameWrapper) nicknameWrapper.classList.remove("inputErr");
  }

  // 유효성 검사 및 UI 업데이트 (UI 업데이트를 할 때만)
  if (nicknameValue === "") {
    if (updateUI) {
      // nicknameWrapper가 있을 때만 접근 (로그인 페이지에선X)
      if (nicknameWrapper) nicknameWrapper.classList.add("inputErr");

      // nicknameField가 있을 때만 접근 (로그인 페이지에선X)
      if (nicknameField && !nicknameField.contains(noNickname)) {
        nicknameField.append(noNickname);
      }
    }

    return false;
  } else {
    // 유효할 경우 inputErr 클래스 제거 (UI 업데이트를 할 때만)
    if (updateUI) {
      nicknameWrapper.classList.remove("inputErr");
    }

    return true;
  }
};

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

// 비밀번호 확인 input check
// if focus out
// 1. check 값 유무 - 없으면 "비밀번호를 입력해주세요."
// 2. check 비밀번호 비교 - 다르면 "같은 비밀번호를 입력해주세요."

const pwd2InputWrapper = document.querySelector(".pwd-confirm-wrapper");
const pwd2Input = document.getElementById("pwd-confirm");
const pwd2Field = document.querySelector(".pwdCField");

const noPWD2 = document.createElement("div");
noPWD2.textContent = "비밀번호를 다시 한 번 입력해주세요.";
noPWD2.classList.add("inputErrText");

const wrongPWD2 = document.createElement("div");
wrongPWD2.textContent = "같은 비밀번호를 입력해주세요.";
wrongPWD2.classList.add("inputErrText");

const pwd2Checker = (inputValue, updateUI = true) => {
  const pwd2Value = inputValue.trim();

  //초기화
  if (updateUI) {
    if (noPWD2?.isConnected) noPWD2.remove();
    if (wrongPWD2?.isConnected) wrongPWD2.remove();
    // 로그인 페이지에선 접근X
    if (pwd2InputWrapper) pwd2InputWrapper.classList.remove("inputErr");
  }

  // 유효성 검사 및 UI 업데이트 (UI 업데이트를 할 때만)
  if (pwd2Value === "") {
    if (updateUI) {
      // 로그인 페이지에선 접근X
      if (pwd2InputWrapper) pwd2InputWrapper.classList.add("inputErr");

      // null type error 방지. 로그인 페이지에선 접근X
      if (pwd2Field && !pwd2Field.contains(noPWD2)) {
        pwd2Field.append(noPWD2);
      }
    }

    return false;
  } else if (pwd2Value !== pwdInput.value) {
    //뭔가 pwdInput은 가공값 아녀서 에러날거같음
    if (updateUI) {
      if (pwd2InputWrapper) pwd2InputWrapper.classList.add("inputErr");

      if (pwd2Field && !pwd2Field.contains(wrongPWD2)) {
        pwd2Field.append(wrongPWD2);
      }
    }

    return false;
  } else {
    // 유효할 경우 inputErr 클래스 제거 (UI 업데이트를 할 때만)
    if (updateUI) {
      if (pwd2InputWrapper) pwd2InputWrapper.classList.remove("inputErr");
    }

    return true;
  }
};

// button
// if input 빈값 or 값 만족X
// 로그인 버튼 비활성화(disabled) / 있으면 활성화

const btnSubmit = document.getElementById("submit");

const btnChecker = () => {
  const emailCheck = emailChecker(emailInput.value, false);
  const pwdCheck = pwdChecker(pwdInput.value, false);

  let nicknameCheck = true;
  if (nicknameInput) {
    nicknameCheck = nicknameChecker(nicknameInput.value, false);
  }
  let pwd2Check = true;
  if (pwd2Input) {
    pwd2Check = pwd2Checker(pwd2Input.value, false);
  }

  if (emailCheck && pwdCheck && nicknameCheck && pwd2Check) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
};

emailInput.addEventListener("input", btnChecker);

if (nicknameInput) {
  nicknameInput.addEventListener("input", btnChecker);
  nicknameInput.addEventListener("focusout", (e) =>
    nicknameChecker(e.target.value)
  );
}

pwdInput.addEventListener("input", btnChecker);

if (pwd2Input) {
  pwd2Input.addEventListener("focusout", (e) => pwd2Checker(e.target.value));
  pwd2Input.addEventListener("input", btnChecker);
}

const formChecker = (e) => {
  e.preventDefault();

  const isSignupPage = !!nicknameInput;

  if (isSignupPage) {
    // 회원가입 form check
    // 1. 이메일 check
    // 있으면 '사용 중인 이메일입니다.'
    // 없으면 로그인 페이지로 이동(/login)
    const emailCheck = emailChecker(emailInput.value, false);
    const nicknameCheck = nicknameChecker(nicknameInput.value, false);
    const pwdCheck = pwdChecker(pwdInput.value, false);
    const pwd2Check = pwd2Checker(pwd2Input.value, false);

    if (emailCheck && nicknameCheck && pwdCheck && pwd2Check) {
      const userData = USER_DATA.find((el) => el.email === emailInput.value);

      if (userData) {
        alert("사용 중인 이메일입니다.");
      } else window.location.href = "/login";
    } else alert("회원가입 정보를 올바르게 입력해주세요.");
  } else {
    // 로그인 form check
    // 1. 이메일 check
    // 없으면 '비밀번호가 일치하지 않습니다.'
    // 2. 비밀번호 check
    // 틀리면 '비밀번호가 일치하지 않습니다.'
    // 3. 둘다 맞으면 /items로 이동
    const emailCheck = emailChecker(emailInput.value, false);
    const pwdCheck = pwdChecker(pwdInput.value, false);

    const userData = USER_DATA.find((el) => el.email === emailInput.value);

    if (emailCheck && pwdCheck) {
      // 이메일 없음
      if (!userData) {
        alert("이메일이 일치하지 않습니다.");
        // 비번 다름
      } else if (userData.password !== pwdInput.value) {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        // 다 맞음
        window.location.href = "/items";
      }
    }
  }
};

const form = document.querySelector("form");
form.addEventListener("submit", formChecker);

btnChecker();
