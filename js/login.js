//Login 유효성 검사 기능
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// 초기 버튼 비활성화
loginBtn.disabled = true;

// 이메일 형식 검사
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateEmail() {
  const email = emailInput.value.trim();
  emailError.style.display = "none";
  emailInput.classList.remove("error");

  if (!email) {
    emailError.textContent = "이메일을 입력해주세요.";
    emailError.style.display = "block";
    emailInput.classList.add("error");
    return false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "잘못된 이메일 형식입니다";
    emailError.style.display = "block";
    emailInput.classList.add("error");
    return false;
  }
  return true;
}

//비밀번호 형식 검사
function validatePassword() {
  const pw = passwordInput.value.trim();
  passwordError.style.display = "none";
  passwordInput.classList.remove("error");

  if (!pw) {
    passwordError.textContent = "비밀번호를 입력해주세요.";
    passwordError.style.display = "block";
    passwordInput.classList.add("error");
    return false;
  } else if (pw.length < 8) {
    passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordError.style.display = "block";
    passwordInput.classList.add("error");
    return false;
  }
  return true;
}

function updateButtonState() {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  loginBtn.disabled = !(isEmailValid && isPasswordValid);
}

// 이벤트 등록
emailInput.addEventListener("focusout", () => {
  validateEmail();
  updateButtonState();
});

passwordInput.addEventListener("focusout", () => {
  validatePassword();
  updateButtonState();
});

emailInput.addEventListener("input", updateButtonState);
passwordInput.addEventListener("input", updateButtonState);

// 로그인 성공 여부 판단 및 페이지 이동 기능
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
	{ email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
	{ email: 'codeit4@codeit.com', password: "codeit404!" },
	{ email: 'codeit5@codeit.com', password: "codeit505!" },
	{ email: 'codeit6@codeit.com', password: "codeit606!" },
]

loginBtn.addEventListener("click", () => {
  const inputEmail = emailInput.value.trim();
  const inputPassword = passwordInput.value.trim();

  //유효성 재검사
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  if (!isEmailValid || !isPasswordValid) return;

  const user = USER_DATA.find((u) => u.email === inputEmail);

  // 로그인 실패
  if (!user || user.password !== inputPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  // 로그인 성공
  location.href = "/items";
});