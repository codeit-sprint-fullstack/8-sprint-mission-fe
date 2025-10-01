"use client";
import React, { useState } from "react";

import Image from "next/image";
import ic_arrow_down from "/public/ic_arrow_down.svg";

const Dropdown = ({ order = "recent" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menu = order === "recent" ? "최신순" : "좋아요순";

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // const handleNewestClick = () => {
  //   toggleDropdown();
  //   onNewestClick();
  // };
  // const handleBestClick = () => {
  //   toggleDropdown();
  //   onBestClick();
  // };

  return (
    <div className="w-32.5 h-10.5 relative">
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center size-full px-5 bg-white border border-gray-200 rounded-xl text-gray-800 cursor-pointer"
      >
        {menu}
        <Image src={ic_arrow_down} alt="arrow_icon" />
      </button>
      {isOpen && (
        <ul className="absolute w-full h-21 mt-2 bg-white border border-gray-200 rounded-xl text-gray-800">
          <li className="w-full h-[50%] border-b border-gray-200 flex items-center justify-center">
            최신순
          </li>
          <li className="w-full h-[50%] flex items-center justify-center">
            좋아요순
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
