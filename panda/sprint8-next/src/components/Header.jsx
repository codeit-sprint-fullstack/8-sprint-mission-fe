"use client";
import Link from "next/link";
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

        <Link href="/login" className="login-button">로그인</Link>
      </div>
    </header>
  );
}
