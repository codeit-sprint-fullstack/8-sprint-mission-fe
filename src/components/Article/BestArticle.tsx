"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BestArticleProps } from "@/types/entities";

const BestArticle = ({ article }: BestArticleProps) => {
  return (
    <div className="mb-10">
      <Link
        href={`/articles/${article.id}`}
        className="flex flex-col px-6 bg-gray-50 rounded-lg w-full max-w-[364px]"
      >
        <div className="flex flex-col">
          <div className="flex flex-col justify-center items-center w-25 mb-4 px-6 py-0.5 bg-[#3692FF] rounded-b-xl text-white font-semibold">
            <div className="flex justify-center items-center gap-[4px]">
              <div className="w-4 h-4">
                <Image src="/ic_medal.svg" alt="Medal" width={16} height={16} />
              </div>
              <p>Best</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-start gap-[8px] mb-4.5">
              <p className="text-gray-800 font-semibold leading-8">
                {article.title}
              </p>
              <div className="justify-center items-center w-18 h-18 p-3">
                <Image
                  src="/board_image.svg"
                  alt="Board"
                  width={48}
                  height={44}
                />
              </div>
            </div>

            <div className="flex justify-between mb-3 text-sm font-normal">
              <div className="inline-flex items-start gap-x-[8px]">
                <p className="text-gray-600">{article.nickname}</p>
                <button className="flex gap-x-[4px] justify-end">
                  <Image
                    src="/ic_heart.svg"
                    alt="heart"
                    width={16}
                    height={16}
                  />
                  <p className="text-gray-500">{article.likeCount}</p>
                </button>
              </div>
              <p className="items-end text-gray-400">{article.createdAt}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BestArticle;
