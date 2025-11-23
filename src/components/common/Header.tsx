'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from './Button';
import { useAuthStore } from '@/stores/useAuthStore';

const Header = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <header className="flex h-[56px] items-center justify-between px-[200px]">
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
            href="/items"
            className="text-secondary-600 px-[15px] py-[21px] text-lg leading-[26px] font-bold"
          >
            중고마켓
          </Link>
        </nav>
      </div>
      {user ? (
        <div className="flex items-center gap-[6px]">
          <Image src="/icons/ic_profile.svg" alt="ic_profile" width={32} height={32} />
          <div className="text-coolGray-600 text-lg font-normal">{user?.nickname}</div>
        </div>
      ) : (
        <Button type="login" onClick={() => router.push('/auth/login')} />
      )}
    </header>
  );
};

export default Header;
