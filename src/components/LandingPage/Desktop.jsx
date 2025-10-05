import React from "react";
import Image from "next/image";
import Link from "next/link";

const Desktop = () => {
  return (
    <section className="relative flex justify-center w-full h-[540px] bg-[#CFE5FF]">
      <div className="absolute bottom-0 flex items-center justify-center gap-7 max-w-[1200px] mx-auto">
        <div className="flex flex-col justify-center items-start gap-8 pb-[60px]">
          <h1 className="text-[40px] font-bold text-gray-700 leading-[140%] text-nowrap">
            일상의 모든 물건을
            <br />
            거래해 보세요
          </h1>
          <Link
            href="/items"
            className="flex justify-center items-center bg-[#3692FF] rounded-[40px] h-14 px-[124px] font-semibold text-lg text-gray-50 hover:underline text-nowrap"
          >
            구경하러 가기
          </Link>
        </div>
        <Image
          src="/home_top_img.svg"
          alt="HomeTop"
          className="flex-shrink-0"
          width={746}
          height={340}
        />
      </div>
    </section>
  );
};

export default Desktop;
