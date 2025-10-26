"use client";

import Logo from "./Logo/Logo";
import Nav from "./Navigator/Navigator";
import Link from "next/link";
import Image from "next/image";
import { userService } from "@/api/userService";
import { useAuth } from "@/providers/AuthProvider";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-[100] flex justify-center items-center w-full h-[70px] border-b border-[#DFDFDF] bg-white">
      <nav className="flex justify-between items-center w-full px-4 md:px-6 lg:px-[100px]">
        <div className="flex justify-center items-end">
          <Logo />
          <Nav />
        </div>
        <div>
          {user ? (
            <Link
              href="/mypage"
              className="flex justify-center items-center w-[96px] h-[40px] gap-[6px] shrink-0 text-lg font-normal text-gray-600 whitespace-nowrap cursor-pointer"
            >
              <Image
                src="/ic_profile.svg"
                alt="Profile icon"
                width={40}
                height={40}
              />
              {user.nickname || "닉네임"}
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex justify-center items-center bg-[#3692FF] rounded-lg w-[88px] h-12 px-[23px] py-3 text-base text-gray-100 whitespace-nowrap hover:underline"
            >
              로그인
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
