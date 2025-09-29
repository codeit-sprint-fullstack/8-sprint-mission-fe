"use client";

import { useState } from "react";
import Image from "next/image";

const InputField = ({
  title,
  type = "text",
  id,
  placeholder,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col w-full gap-4">
      <label htmlFor={id} className="font-bold text-gray-800">
        {title}
      </label>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg bg-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 placeholder-[#9CA3AF] text-black"
          required
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Image
              src={showPassword ? "/eye_open.svg" : "/eye_close.svg"}
              alt="toggle password"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
