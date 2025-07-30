// 질문) 해당 코드에서 캡슐화 혹은 모듈화 등을 더 진행해야 할 부분이 있을지 궁금합니다.

/*
질문) 
여러 개의 html 파일에 스크립트를 적용할 경우에, Conflict가 발생합니다. 
예를 들어, login.html과 signup.html에 login-button이라는 ID를 가진 버튼과 signup-button이라는 ID를 가진 버튼이 있을 때
두 html 코드에 이 스크립트를 적용하면, "login_btn.addEventListener('click', handleLogin);"에서 에러가 발생하여 더이상 아래에 있는 코드가 실행되지 않는 현상이 있습니다.
이러한 현상을 아래에 처리한 if문을 처리한 방법이외에, 다른 방법들이 있을지 궁금합니다.

답변) 
1. 페이지별 스크립트 분리 -> 함수는 공통의 파일에 저장하되, 이벤트 리스너는 각각의 파일에서 호출한다.
2. 이벤트 위임을 이용 -> 엘리먼트 전체에서 일어날 수 있는 이벤트를, 자식 엘리먼트 아디든 클릭할 때 발동
```jsx
document.addEventListener('click', function(e) {
    if (e.target.id === 'login-button') {
        handleLogin(e);
    }
    if (e.target.id === 'signup-button') {
        handleSignup(e);
    }
});
```
*/

/* 전역 변수 선언 */
// 로그인을 위한, User login data
const USER_DATA = [
    { email: '1@1.com', password: "1" }, // 테스트용 데이터
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// 에러상태를 표시하기 위한 전역 변수
let isError_arr = [];

/* 공통 함수 관련 로직 */
// 주어진 에러메시지를, 정해진 Element에 표시하는 함수
function show_error_message(input_element, error_id, error_message) {
    input_element.classList.add("error");
    const error_element = document.getElementById(error_id);
    if (error_element) {
        error_element.textContent = error_message;
        error_element.classList.add("show");
    }
    isError_arr.push(true); // 에러가 활성화 됐음을 의미하는 true 추가.
}

// 표시된 에러메시지를, 정해진 Element로부터 제거하는 함수
function remove_error_message(input_element, error_id) {
    input_element.classList.remove("error");
    const error_element = document.getElementById(error_id);
    if (error_element) {
        error_element.textContent = "";
        error_element.classList.remove("show");
    }
    isError_arr.pop(); // 에러가 비활성화 됐음을 의미하는 true 삭제.
}

/* 이메일 입력 확인 로직 */
const email_input = document.getElementById("email");

// EventListener 등록
if (email_input) {
    email_input.addEventListener("focusout", email_focusout);
    email_input.addEventListener("focus", email_focus);
}

// 에러 메시지를 제거하는 함수(remove_error_message) 호출
function email_focus(event){
    remove_error_message(email_input, 'email-error');
}

// 에러 메시지를 출력하는 함수(show_error_message) 호출
function email_focusout(event) {
    const email_input_value = email_input.value;
    // 요구사항) 이메일 input에서 focus out 할 때, 값이 없을 경우 input에 빨강색 테두리와 아래에 “이메일을 입력해주세요.” 빨강색 에러 메세지를 보입니다.
    if (!email_input_value){
        show_error_message(email_input, 'email-error', "이메일을 입력해주세요.");
        return;
    }

    // 요구사항) 이메일 input에서 focus out 할 때, 이메일 형식에 맞지 않는 경우 input에 빨강색 테두리와 아래에 “잘못된 이메일 형식입니다” 빨강색 에러 메세지를 보입니다.
    const regExp = new RegExp("^[^@]+@[^@]+\\.[^@]+$");
    if (email_input_value && !email_input_value.match(regExp)){
        show_error_message(email_input, 'email-error', '잘못된 이메일 형식입니다');
        return;
    }
    
}

/* 닉네임 입력 확인 로직 */
const nickname_input = document.getElementById("nickname");

// EventListener 등록
if (nickname_input) {
    nickname_input.addEventListener("focusout", nickname_focusout);
    nickname_input.addEventListener("focus", nickname_focus);
}

// 에러 메시지를 제거하는 함수(remove_error_message) 호출
function nickname_focus(event){
    remove_error_message(nickname_input, 'nickname-error');
}

// 에러 메시지를 출력하는 함수(show_error_message) 호출
function nickname_focusout(event) {
    const nickname_input_value = nickname_input.value;
    // 요구사항) 닉네임 input에서 focus out 할 때, 값이 없을 경우 input에 빨강색 테두리와 아래에 “이메일을 입력해주세요.” 빨강색 에러 메세지를 보입니다.
    if (!nickname_input_value){
        show_error_message(nickname_input, 'nickname-error', "닉네임을 입력해주세요.");
        return;
    }
}

/* 비밀번호 입력 확인 로직 */
const password_input = document.getElementById("password");
const password_check_input = document.getElementById("passwordConfirmation");

// EventListener 등록
if (password_input){
    password_input.addEventListener("focusout", password_focusout);
    password_input.addEventListener("focus", password_focus);
}

if (password_check_input){
    password_check_input.addEventListener("focusout", password_check_focusout);
    password_check_input.addEventListener("focus", password_check_focus);
}

// 에러 메시지를 제거하는 함수(remove_error_message) 호출
function password_focus(event){
    remove_error_message(password_input, 'password-error');
}

function password_check_focus(event){
    remove_error_message(password_check_input, 'password-check-error');
}

// 에러 메시지를 출력하는 함수(show_error_message) 호출
function password_focusout(event){
    const password_input_value = password_input.value;

    // 요구사항) 비밀번호 input에서 focus out 할 때, 값이 없을 경우 아래에 “비밀번호를 입력해주세요.” 에러 메세지를 보입니다.
    if (!password_input_value){
        show_error_message(password_input, 'password-error', '비밀번호를 입력해주세요.');
        return;
    }

    // 요구사항) 비밀번호 input에서 focus out 할 때, 값이 8자 미만일 경우 아래에 “비밀번호를 8자 이상 입력해주세요.” 에러 메세지를 보입니다.
    if (password_input_value.length < 8){
        show_error_message(password_input, 'password-error', '비밀번호를 8자 이상 입력해주세요.');
        return;
    }
}

function password_check_focusout(event){
    const password_check_input_value = password_check_input.value;

    // 요구사항) 비밀번호 input에서 focus out 할 때, 값이 없을 경우 아래에 “비밀번호를 입력해주세요.” 에러 메세지를 보입니다.
    if (!password_check_input_value){
        show_error_message(password_check_input, 'password-check-error', '비밀번호를 입력해주세요.');
        return;
    }

    // 요구사항) 비밀번호 input에서 focus out 할 때, 값이 8자 미만일 경우 아래에 “비밀번호를 8자 이상 입력해주세요.” 에러 메세지를 보입니다.
    if (password_check_input_value.length < 8){
        show_error_message(password_check_input, 'password-check-error', '비밀번호를 8자 이상 입력해주세요.');
        return;
    }
}

/* login.html의 로그인 버튼의 Click 이벤트 핸들러 */
const login_btn = document.getElementById('login-button');

if (login_btn && isError_arr.length === 0) { // 로그인 버튼이 존재하고 에러가 없는 경우에만, 이벤트 리스너 작동
    login_btn.addEventListener('click', handleLogin);
}

// 로그인 버튼을 클릭한 이후의 행위를 기술합니다.
function handleLogin(event) {
    event.preventDefault();

    // 요구사항) input 폼에 에러가 있을 경우, 버튼을 비활성화
    if (isError_arr.length > 0) {
        return;
    }
    
    // 입력된 이메일과 비밀번호 데이터 저장
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 요구사항) input 폼에 빈 값이 있을 경우, 버튼을 비활성화
    if (!email || !password) {
        return;
    }

    // 입력된 값과, USER_DATA에 저장된 계정 정보가 일치하는지 확인
    const attempt_data = USER_DATA.find(user => user.email === email && user.password === password);
    if (attempt_data) {
        window.open('items.html', '_self');
    } else {
        alert('비밀번호가 일치하지 않습니다.');
    }
}

/* signup.html의 회원가입 버튼의 Click 이벤트 핸들러 */
const signup_btn = document.getElementById('signup-button');

if (signup_btn && isError_arr.length === 0) { // 회원가입 버튼이 존재하는 경우에만, 이벤트 리스너 작동
    signup_btn.addEventListener('click', handleSignup);
}

// 회원가입 버튼을 클릭한 이후의 행위를 기술합니다.
function handleSignup(event) {
    event.preventDefault();

    // 요구사항) input 폼에 에러가 있을 경우, 버튼을 비활성화
    if (isError_arr.length > 0) {
        return;
    }

    // 입력된 이메일, 비밀번호, 비밀번호 확인, 닉네임 데이터 저장
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password_check = document.getElementById('passwordConfirmation').value;
    const nickname = document.getElementById('nickname').value;

    // 요구사항) input 폼에 빈 값이 있을 경우, 버튼을 비활성화
    if (!email || !password || !password_check || !nickname) {
        return;
    }

    // 입력된 이메일 주소가, USER_DATA에 저장되어 있는지 확인
    if (USER_DATA.find(user => user.email === email)) {
        alert('사용 중인 이메일입니다.');
        return;
    } else {
        window.open('login.html', '_self');
    }
}

/* 추가 요구사항) 눈 모양 아이콘 클릭 시 비밀번호 표시/숨기기 토글 설정 */
const password_btns = document.getElementById("password_button");
const password_input_form = document.getElementById("password");
const password_check_input_form = document.getElementById("passwordConfirmation");

if (password_btns) {
    password_btns.addEventListener('click', password_btn_func);
}

function password_btn_func(event) {
    event.preventDefault();

    if (password_input_form.type === 'password') {
        password_input_form.type = 'text';
    } else {
        password_input_form.type = 'password';
    }

    if (password_check_input_form.type === 'password') {
        password_check_input_form.type = 'text';
    } else {
        password_check_input_form.type = 'password';
    }

}