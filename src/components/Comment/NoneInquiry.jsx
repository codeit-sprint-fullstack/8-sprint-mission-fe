import React from "react";
import Image from "next/image";

const NoneInquiry = () => {
  return (
    <div className="flex flex-col items-center self-stretch w-full">
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src="/empty_inquiry.svg"
          alt="Empty inquiry"
          width={140}
          height={140}
        />
        <p className="self-stretch text-base font-normal text-[#9CA3AF] leading-[26px]">
          아직 문의가 없어요.
        </p>
      </div>
    </div>
  );
};

export default NoneInquiry;
