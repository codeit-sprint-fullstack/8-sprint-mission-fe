import Image from "next/image";
import React from "react";

import ic_medal from "/public/ic_medal.svg";
import Heart from "@/app/(components)/atoms/Heart";
import ImageBox from "./ImageBox";

const Card = ({ title, createdAt }) => {

  // 작성일 포맷 변경
  const [year, month, day] = createdAt.split("T")[0].split("-");
  const date = `${year}. ${month}. ${day}`;

  return (
    <div className="max-w-sm w-full h-[169px] bg-gray-50 rounded-lg px-6">
      <div className="flex items-center justify-center gap-1 bg-Primary-100 w-25.5 h-7.5 rounded-b-2xl">
        <Image src={ic_medal} alt="medal_icon" />
        <span className=" font-bold text-white">Best</span>
      </div>
      <div>
        <div className="flex gap-2 mt-4 mb-4.5">
          <p className="max-w-3xs w-full text-gray-800 text-xl/8 font-semibold shrink ">
            {title}
          </p>
          <ImageBox />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 text-sm/6 font-normal">
            <span className="text-gray-600">총명한 판다</span>
            <Heart />
          </div>
          <span className="text-sm/6 text-gray-400 font-normal">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
