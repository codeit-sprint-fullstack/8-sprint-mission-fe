import React from "react";

import Image from "next/image";
import ImageBox from "@/app/board/_components/ImageBox";

import ic_profile from "/public/ic_profile.svg";
import Heart from "@/app/(components)/atoms/Heart";

const ListCommunity = ({ title, createdAt }) => {
  // 작성일 포맷 변경
  const [year, month, day] = createdAt.split("T")[0].split("-");
  const date = `${year}. ${month}. ${day}`;

  return (
    <div className="w-full p-4 bg-gray-50 border-b border-gray-200">
      <div className="flex justify-between">
        <p className="text-gray-800 text-xl/8 font-semibold shrink ">{title}</p>
        <ImageBox />
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2 text-sm/6 font-normal">
          <Image
            src={ic_profile}
            alt="profile_icon"
            width={24}
            height={24}
            className="bg-gray-400 rounded-full"
          />
          <span className="text-gray-600">총명한 판다</span>
          <span className="text-gray-400">{date}</span>
        </div>
        <Heart />
      </div>
    </div>
  );
};

export default ListCommunity;
