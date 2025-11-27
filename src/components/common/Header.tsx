'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from './Button';
import { useAuthStore } from '@/stores/useAuthStore';

const Header = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    // TODO: 로그아웃 로직 구현
    // - 토큰 제거
    // - 사용자 상태 초기화
    // - 로그인 페이지로 리다이렉트
    setIsDropdownOpen(false);
  };

  return (
    <header className="mx-auto flex h-[56px] max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <Image src="/brandLogo.svg" alt="brandLogo" width={153} height={43} />
        </Link>
        <nav>
          <Link
            href="/articles"
            className="text-secondary-600 px-[15px] py-[21px] text-lg leading-[26px] font-bold"
          >
            자유게시판
          </Link>
          <Link
            href="/products"
            className="text-secondary-600 px-[15px] py-[21px] text-lg leading-[26px] font-bold"
          >
            중고마켓
          </Link>
        </nav>
      </div>
      {user ? (
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex cursor-pointer items-center gap-[6px]"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Image src="/icons/ic_profile.svg" alt="ic_profile" width={32} height={32} />
            <div className="text-coolGray-600 text-lg font-normal">{user?.nickname}</div>
          </div>
          {isDropdownOpen && (
            <ul className="border-coolGray-300 absolute top-full right-0 z-[1000] mt-2 w-[130px] flex-col items-start rounded-[8px] border border-solid bg-white">
              <li
                onClick={handleLogout}
                className="text-secondary-500 hover:bg-coolGray-50 flex h-[46px] cursor-pointer items-center justify-center rounded-[8px] bg-white py-4 text-center text-base leading-[26px] font-normal"
              >
                로그아웃
              </li>
            </ul>
          )}
        </div>
      ) : (
        <Button type="login" onClick={() => router.push('/auth/login')} />
      )}
    </header>
  );
};

export default Header;
