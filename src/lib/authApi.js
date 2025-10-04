import { api } from './apiClient';

// 가입
export async function signUp({ email, nickname, password, passwordConfirmation }) {
  return api.post('/auth/signUp', { email, nickname, password, passwordConfirmation });
}

// 로그인
export async function signIn({ email, password }) {
  return api.post('/auth/signIn', { email, password });
}

// 토큰 갱신
export async function refreshAccessToken(refreshToken) {
  return api.post('/auth/refresh-token', { refreshToken });
}

// safeJson 제거 (apiClient에서 처리)
