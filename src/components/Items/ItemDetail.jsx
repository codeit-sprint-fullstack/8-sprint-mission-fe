"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import KebabMenu from "@/components/Kebab/KebabMenu";
import LikeButton from "@/components/Button/LikeButton";

const ItemsDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState("");

  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto my-8 px-4">
      <div className="flex items-center self-stretch gap-6 mb-10 w-full">
        <Image
          src="/img_default.svg"
          alt="상품 기본 이미지"
          width={486}
          height={486}
          className="w-[486px] h-[486px] rounded-2xl"
        />
        <div className="flex flex-col items-start w-full max-w-[696px]">
          <div className="flesx flex-col items-start self-stretch">
            <div className="flex items-start justify-between self-stretch mb-4">
              <div className="flex flex-col items-start gap-4 self-stretch mb-4">
                <p className="self-stretch text-2xl font-semibold text-[#1F2937] leading-[32px]">
                  아이패드 미니 팔아요.
                </p>
                <h1 className="self-stretch text-5xl font-semibold text-[#1F2937]">
                  500,000원
                </h1>
              </div>

              <KebabMenu type="item" id={products.id} />
            </div>

            <hr className="w-full border-t border-gray-200 mb-6" />
          </div>

          <div className="flex flex-col items-start mb-[62px]">
            <div className="self-stretch text-base font-semibold text-[#4B5563] leading-[26px] mb-6">
              <p className="mb-4">상품 소개</p>
              <p className="font-normal">
                액정에 잔기스랑 주변부 스크래치있습니다만 예민하신분아니면 전혀
                신경쓰이지않을정도입니다. 박스 보관중입니다. 메모용과
                넷플릭스용으로만쓰던거라 뭘 해보질 않아 기능이나 문제점을
                못느꼈네요 잘 안써서 싸게넘깁니다! 택배거래안합니다.
              </p>
            </div>
            <div>
              <p className="self-stretch text-base font-semibold text-[#4B5563] leading-[26px] mb-4">
                상품 태그
              </p>
              <div>
                <span>#아이패드미니</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between self-stretch">
            <div className="flex items-center gap-4">
              <Image
                src="/ic_profile.svg"
                alt="Profile"
                width={40}
                height={40}
              />
              <div className="flex flex-col items-start gap-[2px] text-sm">
                <p className="font-medium text-[#4B5563]">uxer.name</p>
                <p className="font-normal text-[#9CA3AF]">createdAt</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="h-[34px] border-l border-gray-200" />

              <LikeButton initialCount={products.heart_count} />
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full border-t border-gray-200 mb-4" />
    </div>
  );
};

export default ItemsDetail;
