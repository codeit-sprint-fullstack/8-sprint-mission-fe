import { toast } from "sonner";

const CODEIT_API_URL = process.env.NEXT_PUBLIC_CODEIT_API_URL;

export interface Login {
  email: string;
  password: string;
}

export interface SignUp {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

/**
 * 로그인
 * @param email 이메일
 * @param password 비밀번호
 * @returns 로그인 응답
 */
const postLogin = async ({ email, password }: Login) => {
  if (!email || !password) {
    throw new Error("이메일과 비밀번호를 입력해주세요.");
  }

  try {
    const response = await fetch(`${CODEIT_API_URL}/auth/signIn`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 400) {
      throw new Error("존재하지 않는 이메일입니다.");
    }

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 회원가입
 * @param email 이메일
 * @param nickname 닉네임
 * @param password 비밀번호
 * @param passwordConfirmation 비밀번호 확인
 * @returns 회원가입 응답
 */
const postSignUp = async ({
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignUp) => {
  if (!email || !nickname || !password || !passwordConfirmation) {
    throw new Error("모든 필드를 입력해주세요.");
  }

  if (password !== passwordConfirmation) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  try {
    const response = await fetch(`${CODEIT_API_URL}/auth/signUp`, {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 400) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    if (!response.ok) {
      throw new Error("회원가입 실패");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 회원정보 조회
 * @returns User
 */
const getUser = async () => {
  const response = await fetchWithAuth(`${CODEIT_API_URL}/users/me`);

  if (!response || !response.ok) {
    throw new Error("회원정보 조회 실패");
  }

  return response.json();
};

/**
 * RefreshToken을 사용하여 새로운 AccessToken 발급
 * @returns 새로운 accessToken
 */
const reissueToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("리프레시 토큰을 찾을 수 없습니다.");

    const response = await fetch(`${CODEIT_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) throw new Error("리프레시 토큰 갱신 실패");

    const data = await response.json();

    // 새 토큰들을 Local Storage에 저장
    localStorage.setItem("accessToken", data.accessToken);
    // 백엔드가 새로운 Refresh Token을 주는 경우도 처리
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    return data.accessToken;
  } catch (error) {
    // 갱신 실패 (리프레시 토큰 만료 등) 시 강제 로그아웃
    console.error("리프레시 토큰 갱신 실패:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // 로그인 페이지로 리디렉션
    window.location.href = "/auth/login";
    return Promise.reject(error);
  }
};

/**
 * 인증 로직이 포함된 커스텀 fetch 함수
 * @param url 요청 URL
 * @param options 요청 옵션
 * @returns 응답
 */
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const headers = { ...options.headers } as Record<string, string>;

  // 1. 액세스토큰이 없는 경우
  if (!accessToken) {
    // 2. 리프레시토큰이 있는 경우 - 토큰 갱신 시도
    if (refreshToken) {
      try {
        const newAccessToken = await reissueToken();
        headers["Authorization"] = `Bearer ${newAccessToken}`;
      } catch (error) {
        // 리프레시토큰 갱신 실패 - 로그인 페이지로 이동]
        if (window.location.pathname === "/auth/login") {
          return;
        }
        toast.error("로그인이 필요합니다.");
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
    } else {
      // 3. 리프레시토큰도 없는 경우 - 로그인 페이지로 이동
      if (window.location.pathname === "/auth/login") {
        return;
      }
      toast.error("로그인이 필요합니다.");
      window.location.href = "/auth/login";
      return Promise.reject(new Error("로그인이 필요합니다."));
    }
  } else {
    // 액세스토큰이 있는 경우 - 정상적으로 헤더에 추가
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const requestOptions = { ...options, headers };

  // 1차 API 요청 시도
  let response = await fetch(url, requestOptions);

  // 401 에러 감지 (만료된 Access Token)
  if (response.status === 401) {
    try {
      // 토큰 갱신을 시도
      const newAccessToken = await reissueToken();

      // 갱신된 토큰으로 헤더 업데이트
      headers["Authorization"] = `Bearer ${newAccessToken}`;

      // 2차 API 요청 재시도
      response = await fetch(url, requestOptions);
    } catch (error) {
      // 갱신 실패 시 (reissueToken 함수가 이미 로그아웃 처리함)
      return Promise.reject(error);
    }
  }

  // 401 에러가 아니거나, 갱신 후 성공한 응답 반환
  return response;
};

export const authApi = {
  postLogin,
  postSignUp,
  getUser,
};

export { fetchWithAuth };
