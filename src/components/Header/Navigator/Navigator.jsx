"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 m-4">
      <Link
        href="/freeboard"
        className={`text-center font-bold text-lg cursor-pointer hover:underline ${
          pathname === "/freeboard" ? "text-[#3692ff]" : "text-[#4B5563]"
        }`}
      >
        자유게시판
      </Link>
      <Link
        href="/items"
        className={`text-center font-bold text-lg cursor-pointer hover:underline ${
          pathname === "/items" ? "text-[#3692ff]" : "text-[#4B5563]"
        }`}
      >
        중고마켓
      </Link>
    </nav>
  );
};

export default Nav;
