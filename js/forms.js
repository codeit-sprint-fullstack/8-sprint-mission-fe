const forms_body = document.querySelector('.forms');
const email = document.querySelector('#inputEmail');
const password = document.querySelector('#inputPassword');
const btn = document.querySelector('.btn');

let isEmailValid = false;
let isPasswordValid = false;

function validateForm() { // 버튼활성화 확인 함수
	if (isEmailValid && isPasswordValid) { // 활성화
		btn.disabled = false;
	} else { // 비활성화
		btn.disabled = true;
	}
}

function checkerEmail(e) { // 이메일 유효성 검사
	const error_msg = document.querySelector('#email_msg'); // 오류메세지
	const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/; //이메일 패턴 
	if (!e.target.value) { // 비어있는 경우
		error_msg.textContent = '이메일을 입력해주세요.';
		error_msg.classList.add('show');
		e.target.classList.add('focusout_error');
		isEmailValid = false;
	} else if (pattern.test(e.target.value) === false){ // 이메일 형식 틀린 경우
		error_msg.textContent = '잘못된 이메일 형식입니다.';
		error_msg.classList.add('show');
		e.target.classList.add('focusout_error');
		isEmailValid = false;
	} else { // 정상 입력
		e.target.classList.remove('focusout_error');
		error_msg.classList.remove('show');
		e.target.classList.add('focusout');
		isEmailValid = true;
	}
	validateForm(); //버튼활성화 확인
}

function checkerPassword(e) { // 비밀번호 유효성 검사
	const error_msg = document.querySelector('#pwd_msg'); // 오류메세지
	const pwd_length = e.target.value.length;
	if (!e.target.value) { // 비어있는 경우
		error_msg.textContent = '비밀번호를 입력해주세요.';
		error_msg.classList.add('show');
		e.target.classList.add('focusout_error');
		isPasswordValid = false;
	} else if (pwd_length <= 8){ // 8자아래 비밀번호
		error_msg.textContent = '비밀번호를 8자 이상 입력해주세요.';
		error_msg.classList.add('show');
		e.target.classList.add('focusout_error');
		isPasswordValid = false;
	} else { // 정상 입력
		e.target.classList.remove('focusout_error');
		error_msg.classList.remove('show');
		e.target.classList.add('focusout');
		isPasswordValid = true;
	}
	validateForm(); //버튼활성화 확인
}

function checkerNick(e){
	if(e.target.value){
		e.target.classList.add('focusout');
		isNicknameValid = true;
	}
}


btn.disabled = true; // 초기 버튼 비활성화

/* input event */
forms_body.addEventListener('keyup', (e) => { // enter시 focusout
  if (e.key === 'Enter' || e.keyCode === 13) {
    e.target.blur();
  }
});
email.addEventListener('focusout', checkerEmail);
password.addEventListener('focusout', checkerPassword);