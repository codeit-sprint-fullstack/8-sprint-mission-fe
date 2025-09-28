"use client";

import Image from "next/image";
import React, { useState } from "react";

const ActionDropdown = ({ onModify, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen((prev) => !prev)} className="relative">
        {/* <Image
          src="/icons/kebab.svg"
          alt="modify or remove this post"
          width={24}
          height={24}
        /> */}
        ⋮
      </button>
      {isOpen ? (
        <div className="bg-white absolute right-0">
          <div onClick={onModify} className="rounded-t-lg border-black">
            수정하기
          </div>
          <div onClick={onDelete} className="rounded-t-lg">
            삭제하기
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ActionDropdown;
