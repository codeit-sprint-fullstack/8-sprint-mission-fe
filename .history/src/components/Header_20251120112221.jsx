'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
// import { useAuth } from '@/providers/AuthProvider';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const navLinks = [
    {
      name: '자유게시판',
      href: '/article',
    },
    {
      name: '중고마켓',
      href: '/items',
    },
  ];

  const handleLoginClick = () => {
    router.push('/login');
  };

  // const handleLogoutClick = async () => {
  //   await logout();
  //   router.push('/');
  // };

  return (
    <header
      className="bg-white border-b sticky top-0 z-50"
      style={{ borderColor: 'var(--gray-200)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center justify-between gap-8">
            <Link href="/" className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center">
                  <Image src="/images/logo.svg" alt="Logo" width={40} height={40} />
                </div>
                <span className="text-[1.6rem] font-logo" style={{ color: 'var(--primary-100)' }}>
                  판다마켓
                </span>
              </div>
            </Link>
            <nav className="flex justify-between items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-bold hover:!text-[var(--primary-100)] transition-colors ${
                    pathname.startsWith(link.href)
                      ? 'text-[var(--primary-100)]'
                      : 'text-[var(--gray-700)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* 인증 영역 */}
          <div className="flex items-center space-x-4">
            {loading ? null : user ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[var(--gray-200)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.image || '/images/icon/ic_profile.svg'}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[var(--gray-800)] font-semibold">{user.nickname}</span>
                {/* <Button onClick={handleLogoutClick} appearance="outline">
                  로그아웃
                </Button> */}
              </div>
            ) : (
              <Button onClick={handleLoginClick} appearance="primary">
                로그인
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
