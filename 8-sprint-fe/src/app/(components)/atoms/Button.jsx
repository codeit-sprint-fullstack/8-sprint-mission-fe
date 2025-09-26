import React from "react";

const Button = ({ children, type = "button", isAble = true }) => {
  return (
    <button
      type={type}
      disabled={!isAble}
      className="flex items-center justify-center w-[88px] h-[42px] text-base font-bold rounded-lg text-gray-100 bg-Primary-100 cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
