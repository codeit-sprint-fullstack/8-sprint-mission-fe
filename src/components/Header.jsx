import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="border-b border-gray-300 px-4 py-2">
      <div className="mx-auto flex max-w-300 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src="/logo-sm.svg"
              alt="Back to Homepage"
              width={153}
              height={40}
            />
          </Link>
          <div className="flex gap-4 font-bold text-gray-600">
            <Link href="/board">자유게시판</Link>
            <Link href="/products">중고마켓</Link>
          </div>
        </div>
        <Link
          href=""
          className="px-5 py-2 rounded-lg font-semibold text-white bg-blue-500"
        >
          로그인
        </Link>
      </div>
    </header>
  );
};

export default Header;
