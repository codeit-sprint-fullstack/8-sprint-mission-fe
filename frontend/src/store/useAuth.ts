import { URL } from 'url';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultUrl = 'http://localhost:4000/auth'; //백엔드 주소

/* 기본 리스폰스 처리 */
async function responseHandler<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // JSON이 아닌 텍스트 오류 메시지 처리
    const errorText = await res.text();
    throw new Error(errorText);
  }
  const data = {
    ok: true as const,
    ...((await res.json()) as T),
  };
  return data;
}

// - res: Response → fetch가 반환하는 표준 Response 타입.
// - T → JSON으로 파싱되는 데이터의 타입을 제네릭으로 받음.
// - T는 나중에 외부에서 구체화해야한다. ex) responseHandler<{a, b, c}>(res)
// - 반환 타입은 { ok: true } & T → 항상 ok: true가 붙고, JSON 데이터 구조가 합쳐짐.

/* 기본 에러 처리 */
function errorHandler(err: Error): ErrorResponse {
  //console.log(err);
  return {
    ok: false,
    message: parseMessage(err.message),
  };
}

function parseMessage(message: string) {
  try {
    const parsed = JSON.parse(message);
    console.log(parsed.code);
    console.log(parsed.message);
    return parsed.message;
  } catch (e) {
    console.log('메시지가 JSON 형식이 아님:', message);
    return message;
  }
}

interface ErrorResponse {
  ok: false;
  message: string;
}

/* auth 관련 api 함수 반환 타입 정의 */
interface SuccessResponse {
  ok: true;
}

interface SignupResponse extends SuccessResponse {
  id: string;
  provider: string;
  email: string;
  name: string;
  createdAt: string;
}

interface LoginResponse extends SignupResponse {
  accessToken: string;
}

interface refreshResponse extends SuccessResponse {
  accessToken: string;
}

interface checkAuthResponse {
  authenticated: boolean;
}

interface useAuthType {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<SignupResponse | ErrorResponse>;
  login: (email: string, password: string) => Promise<LoginResponse | ErrorResponse>;
  logout: () => Promise<SuccessResponse | ErrorResponse>;
  refresh: () => Promise<refreshResponse | ErrorResponse>;
  authFetch: (url: URL | string, options: RequestInit) => Promise<Response>;
  checkAuth: () => Promise<checkAuthResponse | ErrorResponse>;
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
        console.log('회원가입 진입');
        const body = {
          name,
          email,
          password,
        };
        const result = await fetch(`${defaultUrl}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
          .then(responseHandler<SignupResponse>)
          .catch(errorHandler);
        return result;
      },
      login: async (email, password) => {
        const body = {
          email,
          password,
        };
        const result = await fetch(`${defaultUrl}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(body),
        })
          .then(responseHandler<LoginResponse>)
          .catch(errorHandler);
        //result가 오류 메세지가 아니면 set 처리
        if (result.ok) {
          set({ accessToken: result.accessToken });
        }
        return result;
      },
      logout: async () => {
        const result = await fetch(`${defaultUrl}/logout`, {
          method: 'POST',
          credentials: 'include',
        })
          .then(responseHandler<SuccessResponse>)
          .catch(errorHandler);

        set({ accessToken: null });
        window.location.href = '/login'; //로그인 페이지로
        return result;
      },
      //getRefreshToken 함수 제거 (보안 위험이 있어서 제거 했습니다.)
      refresh: async () => {
        const result = await fetch(`${defaultUrl}/refresh`, {
          method: 'POST',
          credentials: 'include', // 쿠키 기반 인증 시 필요
        })
          .then(responseHandler<refreshResponse>)
          .catch(errorHandler);

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
          if (res.ok) {
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
        const result = get()
          .authFetch(`${defaultUrl}/check`, {
            method: 'POST',
          })
          .then(responseHandler<checkAuthResponse>)
          .catch(errorHandler);
        //뭔가 혼종이 되었습니다만, 자동 리프레쉬 기능을 달았습니다.
        return result;
      },
    }),
    { name: 'auth-storage' }
  )
);

export default useAuth;
