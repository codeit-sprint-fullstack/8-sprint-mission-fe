"use client";

import { MouseEventHandler } from "react";

interface AuthButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const AuthButton = ({ text, onClick, disabled = false }: AuthButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-full py-3 text-lg font-semibold text-white ${
        disabled
          ? "bg-gray-400 cursor-not-allowed opacity-60"
          : "bg-blue-500 hover:underline cursor-pointer"
      }`}
    >
      {text}
    </button>
  );
};

export default AuthButton;
