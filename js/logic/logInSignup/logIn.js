import { USER_DATA } from '../../data/users.js';

export function login(email, password) {
  const user = USER_DATA.find(u => u.email === email);
  if (!user || user.password !== password) {
    return { success: false, message: '비밀번호가 일치하지 않습니다.' };
  }
  return { success: true, user };
}