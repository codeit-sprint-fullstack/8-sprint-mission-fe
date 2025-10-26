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
import { getRefreshToken, clearTokens } from '@/lib/authStorage';
import { refreshAccessToken } from '@/lib/authApi';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default function AuthProvider({ children }) {
  // 로그인 응답의 user 정보를 저장
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bootstrappedRef = useRef(false);

  // 토큰 갱신
  const refreshToken = useCallback(async () => {
    const refresh = getRefreshToken();
    if (!refresh) return false;
    try {
      const res = await refreshAccessToken(refresh);
      setUser(res.user);
      return res?.message === 'Token refreshed successfully';
    } catch (e) {
      if (e?.status === 401 || e?.status === 403) clearTokens();
      return false;
    }
  }, []);

  // 초기화: refreshToken이 있으면 유지, 없으면 로그아웃 상태
  const bootstrap = useCallback(async () => {
    if (bootstrappedRef.current) return;
    bootstrappedRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const refresh = getRefreshToken();
      if (refresh) {
        // refreshToken이 있으면 토큰 갱신 시도
        const success = await refreshToken();
        if (!success) {
          // 갱신 실패 시 로그아웃
          setUser(null);
          clearTokens();
        }
        // 성공 시 user는 null 유지 (로그인 후 setUser 호출로 설정됨)
      } else {
        setUser(null);
      }
    } catch (e) {
      setError(e?.message || '초기화 실패');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [refreshToken]);

  // 로그아웃
  const logout = useCallback(async () => {
    try {
      // 백엔드 로그아웃 API 호출
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      // 에러 무시 (로컬 상태는 정리)
    } finally {
      clearTokens();
      setUser(null);
    }
  }, []);

  // user 설정 함수 (로그인 성공 시 호출)
  const setAuthUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const value = useMemo(
    () => ({ 
      user, 
      loading, 
      error, 
      logout, 
      setAuthUser, // 로그인 시 user 설정용
      refreshToken, // 토큰 갱신용
    }),
    [user, loading, error, logout, setAuthUser, refreshToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
