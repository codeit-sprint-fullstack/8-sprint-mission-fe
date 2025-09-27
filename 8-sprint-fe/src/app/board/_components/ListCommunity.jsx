import React from "react";

import ImageBox from "@/app/board/_components/ImageBox";

import Heart from "@/app/(components)/atoms/Heart";
import ProfileIcon from "@/app/(components)/atoms/ProfileIcon";

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
          <ProfileIcon />
          <span className="text-gray-600">총명한 판다</span>
          <span className="text-gray-400">{date}</span>
        </div>
        <Heart size="16" count="9999" fontSize="text-sm"/>
      </div>
    </div>
  );
};

export default ListCommunity;
