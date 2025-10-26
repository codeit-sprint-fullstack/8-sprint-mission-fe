import { defaultFetch } from "@/api/fetchClient";

export const authService = {
  // 로그인
  login: async (email, password) => {
    const res = await defaultFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // 서버에서 받은 토큰 localStorage에 저장
    if (res?.token) {
      localStorage.setItem("accessToken", res.token);
    }

    return res;
  },

  // 회원가입
  signUp: async (nickname, email, password, passwordConfirmation) => {
    const res = await defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ nickname, email, password, passwordConfirmation }),
    });

    if (res?.token) {
      localStorage.setItem("accessToken", res.token);
    }

    return res;
  },
};
