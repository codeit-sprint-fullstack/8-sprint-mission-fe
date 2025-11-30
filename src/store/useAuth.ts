import { URL } from 'url';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { customAuthFetch, customFetch } from '@/api/fetchClient';

/* auth 관련 api 함수 반환 타입 정의 */
interface SuccessResponse {
  ok: true;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  id: string;
  provider: string;
  email: string;
  name: string;
  createdAt: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

interface refreshResponse {
  accessToken: string;
}

interface checkAuthResponse {
  authenticated: boolean;
}

interface useAuthType {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  signup: (name: string, email: string, password: string) => Promise<SignupResponse>;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<SuccessResponse>;
  refresh: () => Promise<refreshResponse>;
  authFetch: (url: URL | string, options: RequestInit) => Promise<Response>;
  checkAuth: () => Promise<checkAuthResponse>;
}

/* useAuth 훅 */
const useAuth = create(
  persist<useAuthType>(
    (set, get) => ({
      accessToken: null,
      setAccessToken: (accessToken) => {
        set({ accessToken });
      },
      signup: async (name, email, password) => {
        const data = {
          name,
          email,
          password,
        };
        const result = await customFetch.post<SignupRequest, SignupResponse>('/auth/signup', data);
        return result;
      },
      login: async (email, password) => {
        const data = {
          email,
          password,
        };
        const result = await customFetch.post<LoginRequest, LoginResponse>('/auth/login', data, {
          credentials: 'include',
        });
        //result가 오류 메세지가 아니면 set 처리
        if (result) {
          set({ accessToken: result.accessToken });
        }
        return result;
      },
      logout: async () => {
        const result = await customFetch.post<{}, SuccessResponse>(
          '/auth/logout',
          {},
          {
            credentials: 'include',
          }
        );

        set({ accessToken: null });
        window.location.href = '/login'; //로그인 페이지로
        return result;
      },
      //getRefreshToken 함수 제거 (보안 위험이 있어서 제거 했습니다.)
      refresh: async () => {
        const result = await customFetch.post<{}, refreshResponse>(
          '/auth/refresh',
          {},
          {
            credentials: 'include', // 쿠키 기반 인증 시 필요
          }
        );
        return result;
      },
      //인가가 필요한 api 요청용 커스텀 Fetch
      authFetch: async (url, options = { headers: {} }) => {
        options.headers = {
          ...(options.headers || {}), //headers가 없다면 빈 객체로 초기화
          Authorization: `Bearer ${get().accessToken}`,
        };

        let result = await fetch(url, options);

        // Access Token 만료 시 (예: 401 Unauthorized)
        if (result.status === 401) {
          const res = await get().refresh();
          if (res) {
            const newAccessToken = res.accessToken;
            set({ accessToken: newAccessToken });
            // 원래 요청 재시도
            options.headers = {
              ...(options.headers || {}), //headers가 없다면 빈 객체로 초기화
              Authorization: `Bearer ${newAccessToken}`,
            };
            result = await fetch(url, options);
            //에러 캐치를 여기서는 안해주는 데, 에러캐치까지 해주는 게 좋은지 고민입니다.
          } else {
            get().logout();
            window.location.href = '/sign-in';
            console.log('Session expired. Please log in again.');
          }
        }
        return result;
      },
      //페이지 권한 여부 등에 쓰이는 인가 여부 판단 api
      checkAuth: async () => {
        const result = customAuthFetch.post<{}, checkAuthResponse>('/auth/check');
        return result;
      },
    }),
    { name: 'auth-storage' }
  )
);

export default useAuth;
