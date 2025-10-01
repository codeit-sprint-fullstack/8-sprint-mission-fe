"use client";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe } from "@/lib/api";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isFreeboard = pathname?.startsWith("/freeboard");
  const isItems = pathname?.startsWith("/items");

  const [me, setMe] = useState(null);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    setHasToken(!!t);
    if (!t) {
      setMe(null);
      return;
    }
    let mounted = true;
    (async () => {
      try {
        const data = await getMe();
        if (mounted) setMe(data);
      } catch {
        localStorage.removeItem("accessToken");
        setHasToken(false);
        setMe(null);
        if (pathname?.startsWith("/items")) {
          router.replace("/login");
        }
      }
    })();
    return () => { mounted = false; };
  }, [pathname, router]);


import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isFreeboard = pathname?.startsWith("/freeboard");
  const isItems = pathname?.startsWith("/items");


  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="left-group">

          <Link href="/" className="logo-link" aria-label="판다마켓 홈">
            <img src="/logo.svg" alt="판다마켓 로고" className="logo-img" />
          </Link>


          <nav className="nav-tabs">
            <Link href="/freeboard" className={`tab${isFreeboard ? " active" : ""}`}>
              자유게시판
            </Link>
            <Link href="/items" className={`tab${isItems ? " active" : ""}`}>
              중고마켓
            </Link>
          </nav>
        </div>


        
        {!hasToken ? (
          <Link href="/login" className="login-button">로그인</Link>
        ) : (
          <div className="profile-box flex items-center gap-6">
            <img
              src="/images/ic-profile.svg"
              alt="프로필"
              className="w-9 h-9 rounded-full"
            />
            <span className="profile-name">
              {me?.nickname ?? "프로필"}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
