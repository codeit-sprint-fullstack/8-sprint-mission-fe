"use client";

import React from "react";
import { RegistrationControllerProps } from "@/types/controller";

const RegistrationController = ({
  onClick,
  mode = "create",
  disabled = false,
}: RegistrationControllerProps) => {
  return (
    <div className="flex items-center justify-between mb-6 px-6">
      <h2 className="text-lg font-bold text-gray-800">
        상품 {mode === "create" ? "등록" : "수정"}하기
      </h2>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`h-[42px] px-6 flex justify-center items-center rounded-lg text-gray-100 text-base no-underline ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#3692FF] cursor-pointer hover:underline"
        }`}
      >
        {mode === "create" ? "등록" : "수정"}
      </button>
    </div>
  );
};

export default RegistrationController;
