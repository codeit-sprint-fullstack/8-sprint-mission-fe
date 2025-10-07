import Image from "next/image";
import React from "react";

import ic_google from "/public/ic_google.svg";
import ic_kakao from "/public/ic_kakao.svg";
import Link from "next/link";

const OAuth = () => {
  return (
    <div className="w-full h-18.5 flex items-center justify-between py-4 px-6 rounded-lg bg-[#E6F2FF]">
      <span className="font-medium text-gray-800">간편 로그인하기</span>
      <div className="flex gap-4">
        <div className="size-10.5 flex items-center justify-center bg-white border border-gray-50 rounded-full">
          <Link href="https://www.google.com">
            <Image src={ic_google} alt="google_icon" width={22} />
          </Link>
        </div>
        <div className="size-10.5 flex items-center justify-center bg-[#F5E14B] rounded-full">
          <Link href="https://www.kakaocorp.com/page">
            <Image src={ic_kakao} alt="kakao_icon" width={22} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OAuth;
