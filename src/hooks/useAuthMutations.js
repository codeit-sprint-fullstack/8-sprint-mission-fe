'use client';

import { useMutation } from '@tanstack/react-query';

import { signIn, signUp, signOut, refreshAccessToken } from '@/lib/authApi';
import { saveRefreshToken } from '@/lib/authStorage';

export function useSignUpMutation(options = {}) {
  const signUpMutation = useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: async ({ email, nickname, password }) => {
      const res = await signUp({ email, nickname, password });
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
      if (res?.refreshToken) {
        saveRefreshToken(res.refreshToken);
      }
      return res;
    },
    ...options,
  });
  return signInMutation;
}

export function useSignOutMutation(options = {}) {
  const signOutMutation = useMutation({
    mutationKey: ['auth', 'signout'],
    mutationFn: async () => {
      return signOut();
    },
    ...options,
  });
  return signOutMutation;
}

export function useRefreshTokenMutation(options = {}) {
  const refreshTokenMutation = useMutation({
    mutationKey: ['auth', 'refresh'],
    mutationFn: async ({ refreshToken }) => {
      const res = await refreshAccessToken(refreshToken);
      return res;
    },
    ...options,
  });
  return refreshTokenMutation;
}
