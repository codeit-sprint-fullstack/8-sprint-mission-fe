"use client";

import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { authApi, Login, SignUp } from "./fetchers";

export interface User {
  id: number;
  email: string;
  image: string | null;
  nickname: string;
  updatedAt: string;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/**
 * 로그인
 * @returns Login
 */
const usePostLogin = (): UseMutationResult<LoginResponse, Error, Login> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (login: Login) => authApi.postLogin(login),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      queryClient.setQueryData(["user"], data.user); // 사용자 정보를 캐시에 저장 -> 추가 GET 요청 방지
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("로그인 중 오류가 발생했습니다:", error);
    },
  });
};

/**
 * 회원가입
 * @returns SignUp
 */
const usePostSignUp = (): UseMutationResult<SignUpResponse, Error, SignUp> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (signUp: SignUp) => authApi.postSignUp(signUp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("회원가입 중 오류가 발생했습니다:", error);
    },
  });
};

/**
 * 회원정보 조회
 * @param options 쿼리 옵션 (enabled 등)
 * @returns User
 */
const useGetUser = (options?: {
  enabled?: boolean;
}): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => authApi.getUser(),
    staleTime: Infinity,
    refetchOnWindowFocus: false, // 창 포커스 시 자동 재요청 방지
    retry: false, // 실패 시 재시도 방지
    enabled: options?.enabled ?? true, // 기본값은 true
  });
};

export const useAuthQuery = {
  usePostLogin,
  usePostSignUp,
  useGetUser,
};
