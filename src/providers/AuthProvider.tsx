"use client";

import { authService } from "@/api/auth";
import { userService } from "@/api/userService";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AuthContextType, User, LoginProps } from "@/types/auth";

// const AuthContext = createContext({
//   user: null,
//   login: async () => {},
//   // logout: async () => {},
//   signUp: async () => {},
//   updateUser: async () => {},
// });

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

interface SignupProps {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const getUser = async () => {
    try {
      const userData = await userService.getMe();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  // 회원가입
  const signUp = async ({
    nickname,
    email,
    password,
  }: SignupProps): Promise<void> => {
    try {
      await authService.signUp(nickname, email, password);
    } catch (error) {
      console.error("회원가입 실패:", error);
      throw error;
    }
  };

  // 로그인
  const login = async ({
    email,
    password,
  }: LoginProps): Promise<User | null> => {
    try {
      const data = await authService.login(email, password);

      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      const userData = await getUser();
      setUser(userData);

      return userData;
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error instanceof Error ? error : new Error("로그인 실패");
    }
  };

  // // 로그아웃
  // const logout = async () => {
  //   try {
  //     await authService.logout?.();
  //   } catch (error) {
  //     console.warn("로그아웃 API 호출 실패 (무시 가능):", error);
  //   } finally {
  //     setUser(null);
  //   }
  // };

  // 유저 정보 업데이트
  const updateUser = async (formData: Partial<User>): Promise<void> => {
    try {
      const updatedUser = await userService.updateMe(formData);
      setUser(updatedUser);
    } catch (error) {
      console.error("사용자 정보 업데이트 실패:", error);
      throw error;
    }
  };

  // 최초 로그인 상태 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      getUser();
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signUp, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
