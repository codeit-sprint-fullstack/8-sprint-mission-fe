"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <header className="border-b fixed top-0 z-10 w-full">
      <div className="w-full max-w-[1260px] mx-auto px-[30px] py-[6px] flex items-center justify-between">
        {/* 로고 */}
        <div>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/" className="block font-bold text-xl relative w-40">
                <Image
                  src="/header/logo.svg"
                  alt="판다마켓 로고"
                  priority
                  width={153}
                  height={32}
                  style={{ width: "153", height: "32" }}
                ></Image>
              </Link>
            </li>
            <li>
              <Link
                href="/free-board"
                className={`text-md ${
                  pathname === "/free-board" ? "text-primary" : ""
                }`}
              >
                자유게시판
              </Link>
            </li>
            <li>
              <Link
                href="/items"
                className={`text-md ${
                  pathname === "/items" ? "text-primary" : ""
                }`}
              >
                중고마켓
              </Link>
            </li>
          </ul>
        </div>

        {/* 버튼들 */}
        <div className="flex gap-2">
          <Button variant="default" asChild>
            <Link href="/login">로그인</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
