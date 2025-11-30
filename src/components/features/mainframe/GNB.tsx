import Link from 'next/link';
import Image from 'next/image';

import Button from '../../atoms/Button';
import logoImg from '@/images/logo.svg';
import logoMobileImg from '@/images/logo_mobile.svg';

interface GNBProps {
  HasNav?: boolean;
}

export default function GNB({ HasNav = false }: GNBProps) {
  return (
    <header className="min-w-[460px] fixed z-10 flex h-[70px] w-full items-center justify-center border-b-1 border-[#DFDFDF] bg-white">
      <div className="flex h-full w-full max-w-[1200px] items-center justify-between px-[16px] md:px-[24px] xl:px-0">
        <div className="flex items-center gap-[24px]">
          <Link className="flex items-center" href="/">
            <Image src={logoImg} className="hidden w-[153px] md:block" alt="판다마켓 로고" />
            <Image src={logoMobileImg} className="block w-[81px] md:hidden" alt="판다마켓 로고" />
          </Link>

          {HasNav && (
            <div className="flex items-center gap-[8px] text-center text-[18px] font-[700] text-[var(--Cool-Gray-600)]">
              <Link className="px-[15px]" href="/articles">
                자유게시판
              </Link>
              <Link className="px-[15px]" href="/items">
                중고마켓
              </Link>
            </div>
          )}
        </div>
        <Button to="/login" className="rounded-[8px] px-[23px] py-[12px] text-[16px] font-[600]">
          로그인
        </Button>
      </div>
    </header>
  );
}
