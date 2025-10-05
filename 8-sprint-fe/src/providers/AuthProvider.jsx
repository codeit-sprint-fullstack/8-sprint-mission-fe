"use client";
import { fetchGetMe, fetchLogin, fetchSignUp } from "@/api/fetchClient";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  login: async () => {},
  logout: () => {},
  user: null,
  accessToken: null,
  updateUser: () => {},
  signUp: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const getUser = async (token) => {
    try {
      const user = await fetchGetMe(token);
      setUser(user);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const signUp = async (value) => {
    const data = await fetchSignUp(value);
    const token = data.accessToken;
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
    await getUser(token);
  };

  const login = async (value) => {
    const data = await fetchLogin(value);
    const token = data.accessToken;
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
    await getUser(token);
  };

  // const logout = async () => {
  //   await authService.logout();
  //   setUser(null);
  // };

  // const updateUser = async (user) => {
  //   const updatedUser = await userService.updateMe(user);
  //   setUser(updatedUser);
  // };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    getUser(storedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signUp, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
