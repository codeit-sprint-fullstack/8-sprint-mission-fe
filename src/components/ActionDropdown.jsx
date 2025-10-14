"use client";

import React, { useState } from "react";

const ActionDropdown = ({ onModify, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100"
      >
        ⋮
      </button>
      {isOpen ? (
        <div className="bg-white absolute right-0 mt-2 w-28 border border-gray-200 rounded-lg shadow-xs z-10">
          <button
            onClick={() => {
              setIsOpen(false);
              onModify();
            }}
            className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg border-b border-gray-200"
          >
            수정하기
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              onDelete();
            }}
            className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
          >
            삭제하기
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ActionDropdown;
