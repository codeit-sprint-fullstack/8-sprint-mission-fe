"use client";

import Link from "next/link";
import Image from "next/image";

const SocialLogin = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-md bg-blue-50 px-6 py-3">
      <p className="text-sm font-medium text-gray-700">간편 로그인하기</p>
      <div className="flex gap-4">
        <Link href="https://www.google.com/" target="_blank">
          <Image
            src="/ic_Google.svg"
            alt="Google 로그인"
            width={40}
            height={40}
          />
        </Link>
        <Link href="https://www.kakaocorp.com/page" target="_blank">
          <Image
            src="/ic_Kakao.svg"
            alt="Kakao 로그인"
            width={40}
            height={40}
          />
        </Link>
      </div>
    </div>
  );
};

export default SocialLogin;
