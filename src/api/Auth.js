const API_URL = "https://panda-market-api.vercel.app/auth";

// 로그인
export const login = async ({ email, password }) => {
  const res = await fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error("로그인 실패");
  }
  return await res.json();
};

// 회원가입
export const signup = async ({
  email,
  nickname,
  password,
  passwordConfirmation,
}) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
  });
  if (!res.ok) {
    throw new Error("회원가입 실패");
  }
  return await res.json();
};

// 토큰 갱신
export const refreshToken = async (refreshToken) => {
  const res = await fetch(`${API_URL}/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("토큰 갱신 실패");
  }
  return await res.json();
};
