import { api } from './apiClient';

export async function getMe() {
  // apiClient에서 토큰 자동 첨부 (auth: true)
  return api.get('/users/me', { auth: true });
}
