"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthQuery } from "@/lib/api/auth/queries";
import Text from "../atoms/Text";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState(false);

  const isArticlePage = pathname.includes("article");
  const isMarketPage = pathname.includes("items");

  // 토큰 존재 여부 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    setHasToken(!!(accessToken || refreshToken));
  }, []);

  // 토큰이 있을 때만 사용자 정보 조회
  const {
    data: user,
    isPending,
    isError,
    error,
  } = useAuthQuery.useGetUser({
    enabled: hasToken, // 토큰이 있을 때만 쿼리 실행
  });

  return (
    <header className="border-b fixed top-0 z-10 w-full bg-white">
      <div className="w-full max-w-[1260px] mx-auto px-4 md:px-[30px] py-[6px] flex items-center justify-between">
        {/* 로고 */}
        <div>
          <ul className="flex items-center gap-2 md:gap-4">
            <li>
              <Link href="/" className="block font-bold text-xl relative">
                <picture>
                  <source
                    srcSet="/header/logo-sm.svg"
                    media="(max-width: 768px)"
                  />
                  <Image
                    src="/header/logo.svg"
                    alt="판다마켓 로고"
                    priority
                    width={81}
                    height={32}
                    className="w-[81px] md:w-[153px]"
                  />
                </picture>
              </Link>
            </li>
            <li>
              <Link
                href="/article"
                className={`text-md font-medium ${
                  isArticlePage ? "text-primary" : ""
                }`}
              >
                자유게시판
              </Link>
            </li>
            <li>
              <Link
                href="/items"
                className={`text-md ${isMarketPage ? "text-primary" : ""}`}
              >
                중고마켓
              </Link>
            </li>
          </ul>
        </div>

        {/* 버튼들 */}
        {user ? (
          <>
            {isPending ? (
              <div className="flex items-center gap-2">
                <Text styleName="text-lg-medium">로그인 중</Text>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/profile" className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={"/article/avatar-img.svg"}
                      alt={user.nickname}
                      width={24}
                      height={24}
                    />
                  </Avatar>
                  {user.nickname}
                </Link>
              </div>
            )}
            {isError && (
              <div className="text-(--error-color)">
                {(error as Error).message}
              </div>
            )}
          </>
        ) : (
          <div className="flex gap-2">
            <Button variant="default" asChild>
              <Link href="/auth/login">로그인</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
