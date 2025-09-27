"use client";
import React, { useState } from "react";

import ic_kebab from "/public/ic_kebab.svg";
import Image from "next/image";

const KebabMenu = ({handleDelete, handlePatch}) => {
  const [open, setOpen] = useState(false);

  const handleMenuclick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      onClick={handleMenuclick}
      className="flex items-center justify-center cursor-pointer size-6 relative"
    >
      <Image src={ic_kebab} alt="kebab_icon" />
      {open && (
        <ul className="absolute right-1 top-6 w-[139px] h-23 bg-white text-gray-500 border border-gray-300 rounded-lg z-10">
          <li onClick={handlePatch} className="flex items-center justify-center h-[50%]">수정하기</li>
          <li onClick={handleDelete} className="flex items-center justify-center h-[50%]">삭제하기</li>
        </ul>
      )}
    </div>
  );
};

export default KebabMenu;
