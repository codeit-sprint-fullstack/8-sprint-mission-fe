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
          <div>
            <div>
              <p>아이패드 미니 팔아요.</p>
              <h1>500,000원</h1>
            </div>
            <KebabMenu />
          </div>

          <div>
            <div>
              <p>상품 소개</p>
              <p>본문</p>
            </div>
            <p>상품 태그</p>
            <div>
              <span>#아이패드미니</span>
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
