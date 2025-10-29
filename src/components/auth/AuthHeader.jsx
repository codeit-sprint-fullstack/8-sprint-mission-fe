'use client';
import Link from 'next/link';
import Image from 'next/image';

const AuthHeader = () => {
  return (
    <Link href="/" className=" w-full flex items-center justify-center gap-5 mb-12">
      <Image
        src="/images/logo.svg"
        alt="판다마켓 로고"
        width={104}
        height={104}
        className="w-[72px] h-[72px] sm:w-[104px] sm:h-[104px]"
      />
      <h1 className="font-logo text-[5rem] text-primary">판다마켓</h1>
    </Link>
  );
};

export default AuthHeader;
