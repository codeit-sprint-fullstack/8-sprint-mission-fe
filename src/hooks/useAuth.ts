'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import { setAccessToken } from '@/libs/token';
import api from '@/libs/api';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await api.post('/auth/signin', { email, password });
      const token = res.data?.data?.accessToken;
      const user = res.data?.data?.user;

      const userData = {
        id: user?.id,
        nickname: user?.nickname,
      };

      if (token) {
        setAccessToken(token);
      }

      if (user) {
        setUser(userData);
      }

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return { login };
};

export const useSignup = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const signup = async ({
    email,
    nickname,
    password,
    passwordConfirm,
  }: {
    email: string;
    nickname: string;
    password: string;
    passwordConfirm: string;
  }) => {
    try {
      const res = await api.post('/auth/signup', { email, nickname, password, passwordConfirm });
      const token = res.data?.data?.accessToken;
      if (token) {
        setAccessToken(token);
      }

      const userData = {
        id: res.data?.data?.user?.id,
        nickname: res.data?.data?.user?.nickname,
      };

      if (userData) {
        setUser(userData);
      }

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return { signup };
};

export const useLogout = () => {
  const { clearUser } = useAuthStore();
  const router = useRouter();

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      clearUser();
      setAccessToken(null);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return { logout };
};
