import React from "react";

const Button = ({ children, type = "button", isAble = true }) => {
  const bgColor = isAble ? "bg-Primary-100 " : "bg-gray-400";
  const cursor = isAble ? "cursor-pointer" : "cursor-auto"
  return (
    <button
      type={type}
      disabled={!isAble}
      className={`flex items-center justify-center w-[88px] h-[42px] text-base font-bold rounded-lg text-gray-100 ${cursor} ${bgColor}`}
    >
      {children}
    </button>
  );
};

export default Button;
