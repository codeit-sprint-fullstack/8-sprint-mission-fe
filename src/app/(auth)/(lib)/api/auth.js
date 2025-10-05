const API_BASE = process.env.NEXT_PUBLIC_API_BASE_USER;

export async function authFetch(path, { headers, ...opts } = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data?.message || "요청에 실패했습니다.");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data; // { accessToken, ... }
}
export async function signIn({ email, password }) {
  return authFetch("/auth/signIn", {
    method: "POST",
    body: JSON.stringify({
      email: String(email).trim(),
      password: String(password).trim(),
    }),
  });
}

export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  return authFetch("/auth/signUp", {
    method: "POST",
    body: JSON.stringify({
      email: String(email).trim(),
      nickname: String(nickname).trim(),
      password: String(password).trim(),
      passwordConfirmation: String(passwordConfirmation ?? password).trim(),
    }),
  });
}

export async function getMe() {
  return authFetch("/users/me", { method: "GET" });
}
