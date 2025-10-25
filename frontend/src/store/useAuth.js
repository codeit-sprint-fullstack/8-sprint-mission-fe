import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultUrl = 'http://localhost:4000/auth'; //백엔드 주소

/* 기본 리스폰스 처리 */
async function responseHandler(res) {
  if (!res.ok) {
    // JSON이 아닌 텍스트 오류 메시지 처리
    const errorText = await res.text();
    throw new Error(errorText);
  }
  const data = {
    ok: true,
    ...(await res.json()),
  };
  return data;
}

/* 기본 에러 처리 */
async function errorHandler(err) {
  console.log(err);
  return err.message;
}

/* useAuth 훅 */
const useAuth = create(
  persist(
    (set, get) => ({
      accessToken: null,
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
          .then(responseHandler)
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
          .then(responseHandler)
          .catch(errorHandler);

        set({ accessToken: result.accessToken });
        return result;
      },
      logout: async () => {
        //백에 쿠키(리프레쉬토큰)를 지워달라고 하고,
        const result = await fetch(`${defaultUrl}/logout`, {
          method: 'POST',
          credentials: 'include',
        })
          .then(responseHandler)
          .catch(errorHandler);

        //프론트에서는 로컬(액세스토큰) 지우기.
        set({ accessToken: null });
        window.location.href = '/login'; //로그인 페이지로
        return result;
      },
      setAccessToken: async (accessToken) => {
        set({ accessToken });
      },
      getRefreshToken: async (accessToken) => {
        const result = await fetch(`${defaultUrl}/getrefresh`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
          .then(responseHandler)
          .catch(errorHandler);

        //백엔드에서 쿠키를 저장해준다.
        return result;
      },
      refresh: async () => {
        const result = await fetch(`${defaultUrl}/refresh`, {
          method: 'POST',
          credentials: 'include', // 쿠키 기반 인증 시 필요
        })
          .then(responseHandler)
          .catch(errorHandler);

        return result;
      },
      /*
      인가가 필요한 api 요청용 커스텀 Fetch입니다.
      1) accessToken를 포함하여 api 요청을 실행, 유효하면 반환.
      2) accessToken 만료 시 refreshToken 유효 검사 후 둘다 재발급하고 api요청 재실행.
      3) refreshToken도 만료 시 로그인 창으로 강제 이동.
      */
      authFetch: async (url, options = {}) => {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${get().accessToken}`,
          'Content-Type': 'application/json',
        };

        let result = await fetch(url, options);

        // Access Token 만료 시 (예: 401 Unauthorized)
        if (result.status === 401) {
          await fetch(`${defaultUrl}/refresh`, {
            method: 'POST',
            credentials: 'include', // 쿠키 기반 인증 시 필요
          })
            .then(async (res) => {
              if (res.ok) {
                //const data = await refreshResponse.json();
                const newAccessToken = res.json().accessToken;
                set({ accessToken: newAccessToken });

                // 원래 요청 재시도
                options.headers.Authorization = `Bearer ${newAccessToken}`;
                result = await fetch(url, options);
              } else {
                throw new Error('Session expired. Please log in again.');
              }
            })
            .catch((err) => {
              // 리프레시 실패 → 로그아웃 처리
              // 강제 리로드 (hook이나, api 함수 안에서는 router를 쓸 수 없어서 이게 가장 안전하네요.)
              // 전체 페이지 리로드가 발생합니다.
              get().logout();
              window.location.href = '/login';
              console.log(err);
            });
        }
        return result;
      },
      //페이지 권한 여부 등에 쓰이는 인가 여부 판단 api
      checkAuth: async () => {
        const result = get()
          .authFetch(`${defaultUrl}/check`, {
            method: 'POST',
          })
          .then(responseHandler)
          .catch(errorHandler);
        //뭔가 혼종이 되었습니다만, 자동 리프레쉬 기능을 달았습니다.
        return result;
      },
    }),
    { name: 'auth-storage' }
  )
);

export default useAuth;
