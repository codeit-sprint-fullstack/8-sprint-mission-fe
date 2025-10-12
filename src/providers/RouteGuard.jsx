"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

// 로그인된 사용자만 접근 가능한 경로
const protectedPaths = [
  "/items",
  "/items/write",
  "/items/[id]",
  "/items/[id]/edit",
  "/articles",
  "/articles/write",
  "/articles/[id]",
  "/articles/[id]/edit",
  "/registeration",
];

// 미인증 사용자만 접근 가능한 경로
const publicPaths = ["/", "/login", "/signup"];

export default function RouteGuard({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const path = pathname.split("?")[0];

      const isProtectedRoute = protectedPaths.some((route) =>
        path.startsWith(route)
      );
      const isPublicRoute = publicPaths.some((route) => path.startsWith(route));

      if (!accessToken && isProtectedRoute) {
        alert("로그인이 필요합니다.");
        router.replace("/login");
      }

      if (accessToken && isPublicRoute) {
        router.replace("/items");
      }

      setIsLoading(false);
    };

    checkAccess();
  }, [user, pathname, router]);

  if (isLoading) return null;

  return children;
}
