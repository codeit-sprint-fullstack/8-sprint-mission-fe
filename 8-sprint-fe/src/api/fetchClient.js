const URL = `${process.env.NEXT_PUBLIC_CODEIT_URL}`;

// 회원가입
export async function fetchSignUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  const response = await fetch(`${URL}/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    body: JSON.stringify({
      email,
      nickname,
      password,
      passwordConfirmation,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text(); // JSON이 아닐 수도 있으니 text로
    throw new Error(errorText);
  }

  return await response.json();
}

// 로그인
export async function fetchLogin({ email, password }) {
  const response = await fetch(`${URL}/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("로그인에 실패했습니다.");
  }

  return await response.json();
}

// get me
export async function fetchGetMe(token) {
  const response = await fetch(`${URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("로그인에 실패했습니다.");
  }

  return await response.json();
}
