// src/providers/RouteGuard.jsx
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
    if (user === null) {
      setCheckingAuth(false);
      return;
    }

    const path = pathname.split("?")[0];

    const isProtectedRoute = protectedPaths.some((route) =>
      path.startsWith(route)
    );
    const isPublicRoute = publicPaths.some((route) => path.startsWith(route));

    if (!user && isProtectedRoute) {
      router.replace("/login");
    } else if (user && isPublicRoute) {
      router.replace("/items");
    } else {
      setCheckingAuth(false);
    }
  }, [user, pathname, router]);

  if (checkingAuth) return null;

  return children;
}
