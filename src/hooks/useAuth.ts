'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import { clearAccessToken, setAccessToken } from '@/libs/token';
import api from '@/libs/api';
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/common/Sonner';

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

      showToast({ kind: 'success', message: '로그인에 성공했습니다.' });
      router.push('/');
    } catch (error) {
      console.error(error);
      showToast({ kind: 'error', message: '로그인에 실패했습니다.' });
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

      showToast({ kind: 'success', message: '회원가입에 성공했습니다.' });
      router.push('/');
    } catch (error) {
      console.error(error);
      showToast({ kind: 'error', message: '회원가입에 실패했습니다.' });
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
      clearAccessToken();

      showToast({ kind: 'success', message: '로그아웃에 성공했습니다.' });
      router.push('/');
    } catch (error) {
      console.error(error);
      showToast({ kind: 'error', message: '로그아웃에 실패했습니다.' });
    }
  };

  return { logout };
};
