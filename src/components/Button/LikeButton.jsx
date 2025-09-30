"use client";

import { useState } from "react";
import Image from "next/image";

const LikeButton = ({ initialCount = 0 }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  //백엔드와 연동 후 수정 필요
  const handleClick = () => {
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col gap-[10px] h-10 ml-4 px-3 py-1 bg-white border border-[#E5E7EB] rounded-[35px]"
    >
      <div className="flex items-center gap-1 cursor-pointer">
        <Image
          src={liked ? "/ic_fullheart.svg" : "/ic_heart.svg"}
          alt="Heart"
          width={32}
          height={32}
        />
        <p className="text-base font-medium text-[#6B7280] leading-[26px]">
          {count}
        </p>
      </div>
    </button>
  );
};

export default LikeButton;
