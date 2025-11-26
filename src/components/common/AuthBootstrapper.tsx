'use client';

import { getAccessToken } from '@/libs/token';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect, useRef } from 'react';
import api from '@/libs/api';

const AuthBootstrapper = () => {
  const hasRun = useRef<boolean>(false);
  const { isUserLoaded, setUser, markUserLoaded } = useAuthStore();

  useEffect(() => {
    if (hasRun.current || isUserLoaded) return;
    hasRun.current = true;

    const bootstrap = async () => {
      try {
        const token = getAccessToken();

        if (!token) {
          return;
        }

        const res = await api.get('/auth/me');
        const data = res.data?.data;

        const userData = {
          id: data?.id,
          nickname: data?.nickname,
        };

        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        markUserLoaded();
      }
    };

    bootstrap();
  }, [isUserLoaded, setUser, markUserLoaded]);

  return null;
};

export default AuthBootstrapper;
