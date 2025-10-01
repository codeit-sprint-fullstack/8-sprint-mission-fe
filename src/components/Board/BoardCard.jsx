"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const BoardCard = ({ article }) => {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="flex w-full max-w-[1200px] mx-auto h-[138px] bg-[#FCFCFC] mb-6"
    >
      <div className="flex flex-col w-full mb-6 gap-4">
        <div className="flex justify-between items-start self-stretch w-full gap-2">
          <p className="text-xl font-semibold text-[#1F2937] leading-8">
            {article.title}
          </p>
          <div className="justify-center items-center w-18 h-18 p-3">
            <Image src="/board_image.svg" alt="Board" width={48} height={44} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2 text-sm font-normal leading-6">
            <Image src="/ic_profile.svg" alt="Profile" width={24} height={24} />
            <p className="text-[#4B5563]">{article.nickname}</p>
            <p className="text-[#9CA3AF]">{article.createdAt}</p>
          </div>
          <button className="flex justify-end items-center gap-2 text-base font-normal leading-[26px]">
            <Image src="/ic_heart.svg" alt="Heart" width={24} height={24} />
            <p className="text-[#6B7280]">{article.likeCount}</p>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BoardCard;
