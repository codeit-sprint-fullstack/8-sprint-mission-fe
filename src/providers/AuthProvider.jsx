"use client";

import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  login: async () => {},
  // logout: async () => {},
  signUp: async () => {},
  updateUser: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  const getUser = async () => {
    try {
      const userData = await userService.getMe();
      setUser(userData);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  // 회원가입
  const signUp = async (nickname, email, password) => {
    try {
      await authService.signUp(nickname, email, password);
    } catch (error) {
      console.error("회원가입 실패:", error);
      throw error;
    }
  };

  // 로그인
  const login = async (email, password) => {
    try {
      await authService.login(email, password);

      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      await getUser();
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
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
  const updateUser = async (formData) => {
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
    const token = localStorage.getItem("accessToken");
    if (token) {
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
