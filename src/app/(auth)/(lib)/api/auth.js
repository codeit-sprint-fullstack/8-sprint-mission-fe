const API_BASE = process.env.NEXT_PUBLIC_API_BASE_USER;

export async function signIn({ email, password }) {
  const res = await fetch(`${API_BASE}/auth/signIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: String(email).trim(),
      password: String(password).trim(),
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.message || "로그인에 실패했습니다.";
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  return data; // { accessToken, ... }
}
