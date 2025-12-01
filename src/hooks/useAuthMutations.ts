'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { signIn, signUp, signOut, refreshAccessToken } from '@/lib/authApi';
import { saveRefreshToken } from '@/lib/authStorage';
import type {
  SignUpData,
  SignInData,
  RefreshTokenData,
  SignUpResponse,
  SignInResponse,
  RefreshTokenResponse,
  SignOutResponse,
} from '@/types';

export function useSignUpMutation(options?: UseMutationOptions<SignUpResponse, Error, SignUpData>) {
  return useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: async ({ email, nickname, password }: SignUpData) => {
      const res = await signUp({ email, nickname, password });
      return res;
    },
    ...options,
  });
}

export function useSignInMutation(options?: UseMutationOptions<SignInResponse, Error, SignInData>) {
  return useMutation({
    mutationKey: ['auth', 'signin'],
    mutationFn: async ({ email, password }: SignInData) => {
      const res = await signIn({ email, password });
      if (res?.refreshToken) {
        saveRefreshToken(res.refreshToken);
      }
      return res;
    },
    ...options,
  });
}

export function useSignOutMutation(options?: UseMutationOptions<SignOutResponse, Error, void>) {
  return useMutation({
    mutationKey: ['auth', 'signout'],
    mutationFn: async () => {
      return signOut();
    },
    ...options,
  });
}

export function useRefreshTokenMutation(
  options?: UseMutationOptions<RefreshTokenResponse, Error, RefreshTokenData>,
) {
  return useMutation({
    mutationKey: ['auth', 'refresh'],
    mutationFn: async ({ refreshToken }: RefreshTokenData) => {
      const res = await refreshAccessToken(refreshToken);
      return res;
    },
    ...options,
  });
}
