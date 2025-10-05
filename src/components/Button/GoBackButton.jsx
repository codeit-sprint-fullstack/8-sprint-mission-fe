"use client";

import Link from "next/link";
import Image from "next/image";

const GoBackButton = ({ href }) => {
  return (
    <Link href={href} className="flex justify-center items-center mt-16">
      <div className="flex justify-center items-center w-60 h-12 px-16 py-3 gap-2 bg-[#3692FF] rounded-[40px]">
        <p className="text-lg font-semibold text-gray-100 leading-none text-nowrap">
          목록으로 돌아가기
        </p>
        <Image
          src="/ic_back.svg"
          alt="Back Arrow"
          width={24}
          height={24}
          className="self-center"
        />
      </div>
    </Link>
  );
};

export default GoBackButton;
