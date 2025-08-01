import { USER_DATA } from '../../data/users.js';

export function signup(email) {
  const user = USER_DATA.find(u => u.email === email);
  if (user) {
    return { success: false, message: '사용 중인 이메일입니다.' };
  }
  return { success: true };
}