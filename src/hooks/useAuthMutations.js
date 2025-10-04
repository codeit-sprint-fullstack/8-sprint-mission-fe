'use client';
import { useMutation } from '@tanstack/react-query';
import { signIn, signUp, refreshAccessToken } from '@/lib/authApi';
import { saveTokens } from '@/lib/authStorage';

export function useSignUpMutation(options = {}) {
  const signUpMutation = useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: async ({ email, nickname, password, passwordConfirmation }) => {
      const res = await signUp({ email, nickname, password, passwordConfirmation });
      saveTokens(res);
      return res;
    },
    ...options,
  });
  return signUpMutation;
}

export function useSignInMutation(options = {}) {
  const signInMutation = useMutation({
    mutationKey: ['auth', 'signin'],
    mutationFn: async ({ email, password }) => {
      const res = await signIn({ email, password });
      saveTokens(res);
      return res;
    },
    ...options,
  });
  return signInMutation;
}

export function useRefreshTokenMutation(options = {}) {
  const refreshTokenMutation = useMutation({
    mutationKey: ['auth', 'refresh'],
    mutationFn: async ({ refreshToken }) => {
      const res = await refreshAccessToken(refreshToken);
      if (res?.accessToken) saveTokens({ accessToken: res.accessToken });
      return res;
    },
    ...options,
  });
  return refreshTokenMutation;
}
