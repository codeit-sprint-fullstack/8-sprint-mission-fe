export interface User {
  id: string;
  email?: string;
  nickname: string;
  image?: string;
  // 필요 시 추가
}

// 회원가입 관련 타입 정의
export interface SignUpParams {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignupProps {
  nickname: string;
  email: string;
  password: string;
}

export interface SignupPayload {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// 로그인 관련 타입 정의
export interface LoginResponse {
  accessToken?: string;
  user?: User;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null | undefined;
  login: (props: LoginProps) => Promise<User | null>;
  logout?: () => Promise<void>;
  signUp: (
    params: Omit<SignUpParams, "passwordConfirmation"> & {
      passwordConfirmation: string;
    }
  ) => Promise<void>;
  updateUser: (formData: Partial<User>) => Promise<void>;
}
