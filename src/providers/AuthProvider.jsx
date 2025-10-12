'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
  useRef,
} from 'react';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '@/lib/authStorage';
import { refreshAccessToken } from '@/lib/authApi';
import * as userApi from '@/lib/userApi';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bootstrappedRef = useRef(false);

  const loadMe = useCallback(async () => {
    try {
      const me = await userApi.getMe();
      setUser(me);
      setError(null);
      return me;
    } catch (e) {
      if (e?.status === 401 || e?.status === 403) {
        clearTokens();
      }
      setUser(null);
      setError(e?.message || '유저 정보 불러오기 실패');
      return null;
    }
  }, []);

  const refreshToken = useCallback(async () => {
    const refresh = getRefreshToken();
    if (!refresh) return null;
    try {
      const res = await refreshAccessToken(refresh);
      if (res?.accessToken) saveTokens({ accessToken: res.accessToken });
      return res?.accessToken || null;
    } catch (e) {
      if (e?.status === 401 || e?.status === 403) clearTokens();
      return null;
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const me = await loadMe();
    if (!me) {
      const refresh = getRefreshToken();
      if (refresh) {
        const newAccess = await refreshToken();
        if (newAccess) return loadMe();
      }
    }
    return me;
  }, [loadMe, refreshToken]);

  const bootstrap = useCallback(async () => {
    if (loading || bootstrappedRef.current) return; // 중복 방지
    bootstrappedRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const access = getAccessToken();
      const refresh = getRefreshToken();
      if (!access && refresh) {
        await refreshToken();
      }
      if (getAccessToken()) {
        await loadMe();
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, [loadMe, refreshToken, loading]);

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const value = useMemo(
    () => ({ user, loading, error, refreshUser, logout }),
    [user, loading, error, refreshUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
