import { validateEmail, validatePassword, validateNickname, btn, loginPage, validatePasswordChecker } from "./validation.js";
const forms_body = document.querySelector('.forms');
const email = document.querySelector('#inputEmail');
export const password = document.querySelector('#inputPassword');
const nickname = document.querySelector('#inputNickname');
const passwordChecker = document.querySelector('#inputPassword_check');

/* input event */
forms_body.addEventListener('keyup', (e) => { // enter시 focusout
  if (e.key === 'Enter' || e.keyCode === 13) {
    e.target.blur();
  }
});

document.addEventListener('DOMContentLoaded', () => { // DOM 활성화 
	btn.disabled = true; // 초기 버튼 비활성화
	
	email.addEventListener('focusout', validateEmail);
	password.addEventListener('focusout', validatePassword);
  if (document.body.dataset.page === 'login') {
		loginPage();
	} else if(document.body.dataset.page === 'signup'){
		nickname.addEventListener('focusout', validateNickname);
		passwordChecker.addEventListener('focusout', validatePasswordChecker);
	}
});

