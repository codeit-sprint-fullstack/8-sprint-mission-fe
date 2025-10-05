"use client";
import Link from "next/link";
import React from "react";
import { Logo } from "./atoms/Logo";
import Button from "./atoms/Button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";

import ic_profile from "/public/ic_profile.svg";

export default function Nav() {
  const pathName = usePathname();
  const { user } = useAuth();

  return (
    <header className="w-full sticky top-0 bg-white z-50">
      <div className="flex justify-between px-50 h-17 items-center border-b border-[#DFDFDF]">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo />
          </Link>
          <Link href="/board">
            <span
              className={`text-lg font-bold ${
                pathName === "/board" ? "text-Primary-100" : "text-gray-600"
              }`}
            >
              자유게시판
            </span>
          </Link>
          <Link href="/items">
            <span
              className={`text-lg font-bold ${
                pathName === "/items" ? "text-Primary-100" : "text-gray-600"
              }`}
            >
              중고마켓
            </span>
          </Link>
        </div>
        {user ? (
          <div className="flex items-center gap-[6px]">
            <div className="size-10 bg-gray-300 rounded-full">
              <Image src={ic_profile} alt="profile_icon" width={40} />
            </div>
            <span className="text-lg text-gray-600">{user.nickname}</span>
          </div>
        ) : (
          <Link href="/login">
            <Button>로그인</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
