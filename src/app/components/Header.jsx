"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // 현재 경로에 따라 스타일 적용
  function linkClass(path, extraPaths = []) {
    return pathname === path || extraPaths.includes(pathname)
      ? "text-blue-600 font-bold"
      : "text-gray-600 hover:text-blue-600";
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm h-16 flex items-center justify-between px-[200px]">
      {/* 왼쪽 영역 */}
      <div className="flex items-center">
        {/* 로고 */}
        <Link href="/" aria-label="홈으로 이동" className="mr-4 md:mr-9 xl:mr-12">
          <Image
            src="/images/logo.svg"
            alt="판다마켓 로고"
            width={153}
            height={40}
            priority
          />
        </Link>

        {/* 네비게이션 */}
        <nav>
          <ul className="flex items-center gap-2 md:gap-9 font-semibold text-base md:text-lg">
            <li>
              <Link href="/community" className={linkClass("/community")}>
                자유게시판
              </Link>
            </li>
            <li>
              <Link
                href="/items"
                className={linkClass("/items", ["/registration"])}
              >
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* 로그인 버튼 */}
      <Link
        href="/login"
        className="text-base font-semibold rounded-lg px-6 py-3 hover:bg-gray-100"
      >
        로그인
      </Link>
    </header>
  );
}
