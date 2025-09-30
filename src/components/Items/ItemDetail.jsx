"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import KebabMenu from "@/components/Kebab/KebabMenu";

const ItemsDetail = () => {
  return (
    <div>
      <div>
        <Image />
        <div>
          <div className="flesx flex-col items-start self-stretch">
            <div className="flex items-start justify-between self-stretch mb-4">
              <div className="flex flex-col items-start gap-4 self-stretch">
                <p className="self-stretch text-2xl font-semibold text-[#1F2937] leading-[32px]">
                  아이패드 미니 팔아요.
                </p>
                <h1 className="self-stretch text-5xl font-semibold text-[#1F2937]">
                  500,000원
                </h1>
              </div>

              <KebabMenu type="item" id={item.id} />
            </div>

            <hr className="w-full border-t border-gray-200 mb-6" />
          </div>

          <div>
            <div className="self-stretch text-base font-semibold text-[#4B5563] leading-[26px] mb-6">
              <p className="mb-4">상품 소개</p>
              <p className="font-normal">본문</p>
            </div>
            <div>
              <p>상품 태그</p>
              <div>
                <span>#아이패드미니</span>
              </div>
            </div>
          </div>

          <div>
            <div>
              <Image
                src="/ic_profile.svg"
                alt="Profile"
                width={40}
                height={40}
              />
              <div>
                <p>uxer.name</p>
                <p>createdAt</p>
              </div>
            </div>

            <div className="h-[34px] border-l border-gray-200" />

            <LikeButton initialCount={board.heart_count} />
          </div>
        </div>
      </div>

      <hr className="w-full border-t border-gray-200 mb-4" />
    </div>
  );
};

export default ItemsDetail;
