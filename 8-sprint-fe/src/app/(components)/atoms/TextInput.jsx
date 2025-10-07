"use client";
import React, { useState } from "react";

const TextInput = ({
  name,
  title,
  errmessage,
  type = "text",
  isValid = true,
  children,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleBlurOrEnter = () => {
    // focus out
    setIsFocused(false);
    setIsTouched(true);
  };

  // 스타일 적용 여부 결정
  const getInputClass = () => {
    if (isFocused) return "border border-Primary-100"; // focus 중엔 항상 focused 스타일
    if (!isTouched) return ""; // 처음 입력 전엔 스타일 없음
    // focus out 이후에만 valid/invalid 스타일 적용
    return isValid ? "border border-Primary-100" : "border border-error-red";
  };

  return (
    <div className="w-full flex flex-col relative">
      <label htmlFor={name} className="text-lg font-bold text-gray-900 mb-4">
        {title}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlurOrEnter} // focus out 처리
        onKeyDown={(e) => {
          // enter 시 focus out
          if (e.key === "Enter") {
            handleBlurOrEnter(); // Enter 시 focus out과 동일 처리
            e.currentTarget.blur(); // 실제로 input에서 focus 제거
          }
        }}
        className={`w-full py-4 px-6 bg-gray-100 rounded-xl ${getInputClass()}`}
      />
      {children}
      {!isFocused && !isValid && (
        <p className="text-error-red text-[15px] font-semibold mt-2">
          {errmessage}
        </p>
      )}
    </div>
  );
};

export default TextInput;
