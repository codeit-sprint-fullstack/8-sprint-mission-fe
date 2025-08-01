export const form = document.querySelector('.form-box'); // 로그인, 회원가입 폼
export const emailInput = form.querySelector('#email'); // 이메일 입력창
export const nameInput = form.querySelector('#name'); // 닉네임 입력창
export const passwordInput = form.querySelector('#password'); // 비밀번호 입력창
export const passwordComfirmInput = form.querySelector('#password-comfirm'); // 비밀번호 확인 입력창
export const btnForm = form.querySelector('.form-btn'); // 로그인, 회원가입 버튼

export const overlay = document.querySelector('.overlay'); // 오버레이
export const alertBox = overlay.querySelector('.alert-box'); // 알림 박스
export const alertSpan = overlay.querySelector('.alert-box span'); // 알림 메시지