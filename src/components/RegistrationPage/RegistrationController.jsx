import React from "react";

const RegistrationController = () => {
  return (
    <div className="flex items-center justify-between mb-6 px-6">
      <h2 className="text-lg font-bold text-gray-800">상품 등록하기</h2>
      <a
        href="/items/new"
        className="h-[42px] px-6 flex justify-center items-center rounded-lg bg-gray-400 text-gray-100 text-base font-semibold no-underline cursor-pointer"
      >
        등록
      </a>
    </div>
  );
};

export default RegistrationController;
