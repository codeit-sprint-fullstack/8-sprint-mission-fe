import React, { useState } from "react";

const CommentForm = ({ title, placeholder, onSubmit }) => {
  const [comment, setComment] = useState("");

  const isFormValid = comment.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      await onSubmit(comment);
      setComment("");
    } catch (error) {
      console.error("상품 상세 페이지 댓글 등록 ERROR:", error);
    }
  };

  return (
    <form className="flex flex-col items-end gap-4 mb-10">
      <div className="flex flex-col justify-center items-start self-stretch">
        <h1 className="text-base font-semibold text-[#111827] leading-[26px] mb-[9px]">
          {title}
        </h1>
        <textarea
          value={comment}
          placeholder={placeholder}
          onChange={(e) => setComment(e.target.value)}
          className="items-start w-full h-[104px] px-6 py-4 rounded-xl bg-gray-100 focus:border-gray-400 focus:outline-none placeholder-[#9CA3AF] text-black"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`flex justify-center items-center bg-[#9CA3AF] rounded-lg w-[88px] h-12 px-[23px] py-3 text-base text-[#F3F4F6] whitespace-nowrap ${
          isFormValid
            ? "bg-[#3692FF] cursor-pointer hover:underline"
            : "bg-[#9CA3AF] cursor-not-allowed"
        }`}
      >
        등록
      </button>
    </form>
  );
};

export default CommentForm;
