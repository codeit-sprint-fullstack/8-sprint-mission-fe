import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
    const response = await fetch(`${API_URL}/auth/signUp`, {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
  const response = await fetchWithAuth(`${API_URL}/auth/me`);

  if (!response || !response.ok) {
    throw new Error("회원정보 조회 실패");
  }

  return response.json();
};

/**
 * RefreshToken을 쿠키에서 사용하여 새로운 AccessToken 발급
 * @returns 새로운 accessToken
 */
const reissueToken = async () => {
  try {
    // refreshToken은 쿠키에 저장되어 있으므로 body 없이 요청
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("리프레시 토큰 갱신 실패");
    }

    const data = await response.json();

    // 새 accessToken을 Local Storage에 저장
    localStorage.setItem("accessToken", data.accessToken);

    return data.accessToken;
  } catch (error) {
    // 갱신 실패 (리프레시 토큰 만료 등) 시 강제 로그아웃
    console.error("리프레시 토큰 갱신 실패:", error);
    localStorage.removeItem("accessToken");

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
/**
 * 인증 및 자동 토큰 갱신 커스텀 fetch 함수
 * 리프레시 토큰은 쿠키에 저장됨
 * @param url 요청 URL
 * @param options 요청 옵션
 * @returns 응답
 */
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem("accessToken");
  const headers = { ...options.headers } as Record<string, string>;

  // 액세스 토큰 유무에 따라 처리
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const requestOptions = { ...options, headers };

  // 1차 API 요청 시도
  let response = await fetch(url, requestOptions);

  // 401 에러 시(액세스 토큰 만료 등)
  if (response.status === 401) {
    try {
      // 리프레시 토큰은 쿠키에 저장되어 있으므로 별도 확인 없이 토큰 재발급 요청
      const newAccessToken = await reissueToken();

      // 갱신된 토큰으로 Authorization 헤더 설정
      headers["Authorization"] = `Bearer ${newAccessToken}`;

      // 2차 API 요청 재시도
      response = await fetch(url, requestOptions);
    } catch (error) {
      // 토큰 재발급 실패(리프레시 토큰 만료 등)
      if (window.location.pathname !== "/auth/login") {
        toast.error("로그인이 필요합니다.");
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }
  } else if (!accessToken) {
    // 액세스 토큰 없고, 401이 아니라면: 비로그인 상태
    if (window.location.pathname !== "/auth/login") {
      toast.error("로그인이 필요합니다.");
      window.location.href = "/auth/login";
      return Promise.reject(new Error("로그인이 필요합니다."));
    }
    return; // 로그인 페이지에서는 아무 일도 하지 않음
  }

  // 정상 응답 반환
  return response;
};

export const authApi = {
  postLogin,
  postSignUp,
  getUser,
};

export { fetchWithAuth };
