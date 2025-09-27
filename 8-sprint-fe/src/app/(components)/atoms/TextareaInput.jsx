import React from "react";
import Button from "./Button";

const TextareaInput = ({ name, title }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-2 font-semibold text-gray-900">
        {title}
      </label>
      <textarea
        name={name}
        id={name}
        placeholder="댓글을 입력해주세요."
        className="w-full h-26 py-4 px-6 mb-4 resize-none bg-gray-100 rounded-xl"
      ></textarea>
      <div className="flex justify-end w-full">
        <Button isAble={false}>등록</Button>
      </div>
    </div>
  );
};

export default TextareaInput;
