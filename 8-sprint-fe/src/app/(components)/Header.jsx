import Link from "next/link";
import React from "react";
import Logo from "./atoms/Logo";
import Button from "./atoms/Button";

const Header = () => {
  return (
    <header className="w-full sticky top-0 bg-white">
      <div className="flex justify-between px-50 h-17 items-center border-b border-[#DFDFDF]">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo />
          </Link>
          <Link href="/board"><span className="basic_nav">자유게시판</span></Link>
          <span className="basic_nav">중고마켓</span>
        </div>
        <Link href="/login">
          <Button>로그인</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
