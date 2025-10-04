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
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("액세스 토큰을 찾을 수 없습니다.");
  }

  const response = await fetch(`${CODEIT_API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("회원정보 조회 실패");
  }

  return response.json();
};

export const authApi = {
  postLogin,
  postSignUp,
  getUser,
};
