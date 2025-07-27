import { validateEmail, validatePassword, validateNickname, btn, loginPage, validatePasswordChecker } from "./validation.js";
import { login_submit, signup_submit } from "./alert.js";
// form 선택자
const forms_body = document.querySelector('.forms');
const login_form = document.querySelector('#login_form');
const signup_form = document.querySelector('#signup_form');
// input 선택자
export const email = document.querySelector('#inputEmail');
export const password = document.querySelector('#inputPassword');
const nickname = document.querySelector('#inputNickname');
const passwordChecker = document.querySelector('#inputPassword_check');
// visibility 선택자
const btn_visibility = document.querySelectorAll('.btn_visibility');
const visibility_off = document.querySelectorAll('.visibility_off');
const visibility_on = document.querySelectorAll('.visibility_on');
// modal 선택자
export const modal_btn = document.querySelector('.modal_btn');
export const modal_bg = document.querySelector('.modal_bg');
export const modal_content = document.querySelector('.modal_conent');


document.addEventListener('DOMContentLoaded', () => { // DOM 활성화 
	btn.disabled = true; // 초기 버튼 비활성화
	visibility_off.forEach((el) => el.classList.add('show'));

	/* input event */
	forms_body.addEventListener('keyup', (e) => { // enter시 focusout
		if (e.key === 'Enter' || e.keyCode === 13) {
			e.target.blur();
		}
	});

	// 비밀번호 눈 아이콘
	btn_visibility[0].addEventListener('click', (e) =>{
		visibility_off[0].classList.toggle('show');
		visibility_on[0].classList.toggle('show');

		if (visibility_on[0].classList.contains('show')) {
			password.type = 'text'; // 비밀번호 보이기
		} else {
			password.type = 'password'; // 비밀번호 가리기
		}
	});


	modal_btn.addEventListener('click', (e) => { // modal창 확인 버튼
		modal_bg.classList.remove('alert');
		modal_content.textContent = '';
		email.value = '';
		password.value = '';
		email.classList.remove('focusout');
		password.classList.remove('focusout');
	});


	email.addEventListener('focusout', validateEmail);
	password.addEventListener('focusout', validatePassword);
  if (document.body.dataset.page === 'login') { // 로그인 페이지
		loginPage();
		
		login_form.addEventListener('submit', (e) => {
			e.preventDefault(); // 폼 제출 방지
			login_submit();
		});
	} else if(document.body.dataset.page === 'signup'){ // 회원가입 페이지
		nickname.addEventListener('focusout', validateNickname);
		passwordChecker.addEventListener('focusout', validatePasswordChecker);

		signup_form.addEventListener('submit', (e) => {
			e.preventDefault(); // 폼 제출 방지
			signup_submit();
		});

		//비밀번호 확인 눈 아이콘
		btn_visibility[1].addEventListener('click', (e) =>{
			visibility_off[1].classList.toggle('show');
			visibility_on[1].classList.toggle('show');

			if (visibility_on[1].classList.contains('show')) {
			passwordChecker.type = 'text'; 
			} else {
			passwordChecker.type = 'password';
			}
		});

		modal_btn.addEventListener('click', (e) => {
			passwordChecker.value = '';
			passwordChecker.classList.remove('focusout');
		});
	}
});

