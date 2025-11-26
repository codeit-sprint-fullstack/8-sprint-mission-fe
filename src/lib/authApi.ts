import { api } from './apiClient';
import type {
  User,
  UpdateUserData,
  SignUpData,
  SignInData,
  SignUpResponse,
  SignInResponse,
  RefreshTokenResponse,
  SignOutResponse,
} from '@/types';
import {
  signUpResponseSchema,
  signInResponseSchema,
  refreshTokenResponseSchema,
  userSchema,
} from '@/schemas';

// 회원가입
export async function signUp({ email, nickname, password }: SignUpData) {
  const response = await api.post<SignUpResponse>('/auth/signUp', { email, nickname, password });
  return signUpResponseSchema.parse(response);
}

// 로그인
export async function signIn({ email, password }: SignInData) {
  const response = await api.post<SignInResponse>('/auth/signIn', { email, password });
  return signInResponseSchema.parse(response);
}

// 로그아웃
export async function signOut() {
  return api.post<SignOutResponse>('/auth/logout', {});
}

// 토큰 갱신
export async function refreshAccessToken(refreshToken: string) {
  const response = await api.post<RefreshTokenResponse>('/auth/refresh', { refreshToken });
  return refreshTokenResponseSchema.parse(response);
}

// 사용자 조회
export async function getUser(userId: string) {
  const response = await api.get<User>(`/auth/${userId}`, { auth: true });
  return userSchema.parse(response);
}

// 사용자 정보 수정
export async function updateUser(userId: string, data: UpdateUserData) {
  const response = await api.patch<User>(`/auth/${userId}`, data, { auth: true });
  return userSchema.parse(response);
}

// 사용자 삭제
export async function deleteUser(userId: string) {
  return api.delete<SignOutResponse>(`/auth/${userId}`, { auth: true });
}
