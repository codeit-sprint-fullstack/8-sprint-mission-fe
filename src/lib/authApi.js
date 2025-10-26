import { api } from './apiClient';

// 회원가입
export async function signUp({ email, nickname, password }) {
  return api.post('/auth/signUp', { email, nickname, password });
}

// 로그인
export async function signIn({ email, password }) {
  return api.post('/auth/signIn', { email, password });
}

// 로그아웃
export async function signOut() {
  return api.post('/auth/logout', {});
}

// 토큰 갱신
export async function refreshAccessToken(refreshToken) {
  return api.post('/auth/refresh', { refreshToken });
}

// 사용자 조회
export async function getUser(userId) {
  return api.get(`/auth/${userId}`, { auth: true });
}

// 사용자 정보 수정
export async function updateUser(userId, data) {
  return api.patch(`/auth/${userId}`, data, { auth: true });
}

// 사용자 삭제
export async function deleteUser(userId) {
  return api.delete(`/auth/${userId}`, { auth: true });
}
