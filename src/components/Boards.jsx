"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Boards = () => {
  return (
    <Link
      href="/freeboard/${id}"
      className="flex w-full h-[138px] bg-[#FCFCFC] mb-6"
    >
      <div className="flex flex-col w-full mb-6 gap-4">
        <div className="flex justify-between items-start self-stretch w-full gap-2">
          <p className="text-xl font-semibold text-[#1F2937] leading-8">
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
          </p>
          <div className="justify-center items-center w-18 h-18 p-3">
            <Image src="/board_image.svg" alt="Board" width={48} height={44} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2 text-sm font-normal leading-6">
            <Image src="/ic_profile.svg" alt="Profile" width={24} height={24} />
            <p className="text-[#4B5563]">user_name</p>
            <p className="text-[#9CA3AF]">createdAt</p>
          </div>
          <div className="flex justify-end items-center gap-2 text-base font-normal leading-[26px]">
            <Image src="/ic_heart.svg" alt="Heart" width={24} height={24} />
            <p className="text-[#6B7280]">heart_count</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Boards;
