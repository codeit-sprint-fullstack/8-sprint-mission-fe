"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  console.log(pathname);

  const isArticlePage = pathname.includes("article");
  const isMarketPage = pathname.includes("market");

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
                href="/market"
                className={`text-md ${isMarketPage ? "text-primary" : ""}`}
              >
                중고마켓
              </Link>
            </li>
          </ul>
        </div>

        {/* 버튼들 */}
        <div className="flex gap-2">
          <Button variant="default" asChild>
            <Link href="/auth/login">로그인</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
