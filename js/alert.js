import { USER_DATA } from "./USERDATA.js";
import { email, password, modal_bg, modal_content} from "./forms.js";



export function login_submit(){
  const isValidUser = USER_DATA.some((el) => {
    return el.email === email.value && el.password === password.value;
  });
  if(isValidUser){
    location.href = '../items';
    console.log('submit');
  } else {
    modal_bg.classList.add('alert');
    modal_content.textContent='비밀번호가 일치하지 않습니다.';
    return;
  }
}

export function signup_submit(){
  const isValidUser = USER_DATA.every((el) => {
    return el.email !== email.value;
  });
  if(isValidUser){
    location.href = '../login';
  } else {
    modal_bg.classList.add('alert');
    modal_content.textContent='사용 중인 이메일입니다.';
    return;
  }
}