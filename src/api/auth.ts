import { defaultFetch } from "@/api/fetchClient";
import { LoginProps, LoginResponse, SignupProps } from "@/types/auth";

export const authService = {
  // 로그인
  login: async ({ email, password }: LoginProps): Promise<LoginResponse> => {
    const res = await defaultFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // 서버에서 받은 토큰 localStorage에 저장
    if (res?.accessToken) {
      localStorage.setItem("accessToken", res.accessToken);
    }

    return res;
  },

  // 회원가입
  signUp: async ({
    nickname,
    email,
    password,
  }: SignupProps): Promise<LoginResponse> => {
    const res = await defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ nickname, email, password }),
    });

    if (res?.accessToken) {
      localStorage.setItem("accessToken", res.accessToken);
    }

    return res;
  },
};
