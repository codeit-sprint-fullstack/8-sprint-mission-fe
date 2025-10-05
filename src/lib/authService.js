import { defaultFetch, cookieFetch } from "@/lib/fetchClient";

export const authService = {
  // 로그인
  login: (email, password) =>
    cookieFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // 회원가입
  register: (nickname, email, password) =>
    defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ nickname, email, password }),
    }),
};
