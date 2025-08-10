import { password } from "./forms.js";
const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/; // 이메일 패턴
const MIN_PASSWORD_LENGTH = 8;

export const btn = document.querySelector('.btn');

let isEmailValid = false;
let isPasswordValid = false;
let isNicknameValid = false;
let isPasswordCheckerValid = false;

function showError(target, err_tag, msg){
  target.classList.add('focusout_error');
  err_tag.textContent = msg;
	err_tag.classList.add('show');
}

function clearError(target, err_tag){
  target.classList.remove('focusout_error');
	err_tag.classList.remove('show');
	
  target.classList.add('focusout');
}

export function loginPage(){ // 로그인 페이지 확인
  isNicknameValid = true;
  isPasswordCheckerValid = true;
}

function validateForm() { // 버튼활성화 확인 함수
	if (isEmailValid && isPasswordValid && isNicknameValid && isPasswordCheckerValid) { // 활성화
		btn.disabled = false;
	} else { // 비활성화
		btn.disabled = true;
	}
}

export function validateEmail(e) { // 이메일 유효성 검사
  const target = e.target;
  const err_tag = document.querySelector('#email_msg'); // 오류메세지 태그
  const emptyErr = '이메일을 입력해주세요.';
  const invalidErr = '잘못된 이메일 형식입니다.';
  if(!target.value){ // 비어있는 경우
    showError(target, err_tag, emptyErr);
    isEmailValid = false;
  } else if(emailPattern.test(target.value) === false){ // 이메일 형식 틀린 경우
    showError(target, err_tag, invalidErr);
    isEmailValid = false;
  } else { // 정상 입력
    clearError(target, err_tag);
    isEmailValid = true;
  }
  validateForm(); //버튼활성화 확인
}

export function validatePassword(e) { // 비밀번호 유효성 검사
  const target = e.target;
  const length = e.target.value.length;
	const err_tag = document.querySelector('#pwd_msg'); // 오류메세지 태그
  const emptyErr = '비밀번호를 입력해주세요.';
  const invalidErr = '비밀번호를 8자 이상 입력해주세요.';
	if (!e.target.value) { // 비어있는 경우
    showError(target, err_tag, emptyErr);
    isPasswordValid = false;
	} else if (length < MIN_PASSWORD_LENGTH){ // 8자아래 비밀번호
    showError(target, err_tag, invalidErr);
    isPasswordValid = false;
	} else { // 정상 입력
    clearError(target, err_tag);
    isPasswordValid = true;
	}
	validateForm(); //버튼활성화 확인
}

export function validateNickname(e) { // 닉네임 유효성 검사
  if(e.target.value){
		e.target.classList.add('focusout');
		isNicknameValid = true;
	}
}

export function validatePasswordChecker(e) { // 비밀번호 확인 유효성 검사
  const target = e.target;
  const err_tag = document.querySelector('#pwd_check_msg'); // 오류메세지 태그
  const invalidErr = '비밀번호가 일치하지 않습니다.';
  if (!e.target.value) { // 비어있는 경우
    showError(target, err_tag, invalidErr);
    isPasswordCheckerValid = false;
	} else if (target.value !== password.value){ // 비밀번호 확인
    showError(target, err_tag, invalidErr);
    isPasswordCheckerValid = false;
	} else { // 정상 입력
    clearError(target, err_tag);
    isPasswordCheckerValid = true;
	}
	validateForm(); //버튼활성화 확인
}