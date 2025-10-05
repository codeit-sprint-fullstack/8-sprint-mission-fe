"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Text from "@/components/atoms/Text";

interface AuthGuardProviderProps {
  children: React.ReactNode;
}

// 인증이 필요한 라우트 목록
const PROTECTED_ROUTES = [
  "/items/create", // 상품 등록
  "/items/[id]/edit", // 상품 수정 (동적 라우트)
  "/article/create", // 게시글 작성
  "/article/[id]/edit", // 게시글 수정 (동적 라우트)
  "/auth/profile", // 프로필 페이지
];

// 로그인한 사용자가 접근하면 안 되는 라우트 (이미 로그인된 경우 리다이렉트)
const AUTH_ROUTES = ["/auth/login", "/auth/join"];

/**
 * 현재 경로가 보호된 라우트인지 확인
 * @param pathname 현재 경로
 * @returns boolean
 */
const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some((route) => {
    // 동적 라우트 처리 ([id] 등)
    const routePattern = route.replace(/\[.*?\]/g, "[^/]+");
    const regex = new RegExp(`^${routePattern}$`);
    return regex.test(pathname);
  });
};

/**
 * 현재 경로가 인증 관련 라우트인지 확인
 * @param pathname 현재 경로
 * @returns boolean
 */
const isAuthRoute = (pathname: string): boolean => {
  return AUTH_ROUTES.includes(pathname);
};

export default function AuthGuardProvider({
  children,
}: AuthGuardProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const hasValidToken = !!(accessToken || refreshToken);
      setIsAuthenticated(hasValidToken);

      const needsAuth = isProtectedRoute(pathname);
      const isAuthPage = isAuthRoute(pathname);

      // 인증이 필요한 페이지인데 토큰이 없는 경우
      if (needsAuth && !hasValidToken) {
        toast.error("로그인이 필요합니다.");
        router.push("/auth/login");
        return;
      }

      // 이미 로그인된 사용자가 로그인/회원가입 페이지에 접근하는 경우
      if (isAuthPage && hasValidToken) {
        router.push("/items");
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [pathname, router]);

  // 인증 체크 중일 때 로딩 표시 (보호된 라우트에서만)
  if (isChecking && isProtectedRoute(pathname)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text styleName="text-lg-medium">
          <Spinner /> 인증 확인 중입니다.
        </Text>
      </div>
    );
  }

  return <>{children}</>;
}
