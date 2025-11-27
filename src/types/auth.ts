export interface User {
  id: string;
  email: string;
  nickname: string;
  image?: string;
  // 필요 시 추가
}

export interface SignUpParams {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginResponse {
  accessToken?: string;
  user?: User;
}

export interface SignupProps {
  nickname: string;
  email: string;
  password: string;
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
