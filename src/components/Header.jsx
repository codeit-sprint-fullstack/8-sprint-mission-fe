import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="border-b border-[#DFDFDF]">
      <div className="mx-auto flex h-24 max-w-screen-lg items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-sm.svg"
            alt="Back to Homepage"
            width={153}
            height={40}
          />
        </Link>
        <div className="flex gap-4">
          <Link href="/board">자유게시판</Link>
          <Link href="/products">중고마켓</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
