import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 w-full bg-white shadow-sm z-50">
      <nav className="px-[12.5rem] flex items-center justify-between h-[4.3125rem]">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/header_logo.png"
              alt="판다마켓로고"
              width={125}
              height={50}
              className="object-contain"
              priority
            />
          </Link>
          <Link
            href="/board"
            className="inline-flex items-center leading-none px-3 h-full hover:text-blue-500"
          >
            자유게시판
          </Link>
          <Link
            href="/market"
            className="inline-flex items-center leading-none px-3 h-full hover:text-blue-500"
          >
            중고마켓
          </Link>
        </div>

        <Link
          href="/login"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors "
        >
          로그인
        </Link>
      </nav>
    </header>
  );
};

export default Header;
