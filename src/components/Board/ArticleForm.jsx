"use client";

import { useState, useEffect } from "react";

const ArticleForm = ({ initialData = {}, onSubmit, mode = "create" }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(initialData.title || "");
    setContent(initialData.content || "");
  }, [initialData]);

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = () => {
    if (!isFormValid) return;
    onSubmit({ title, content });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-[#1F2937]">
          {mode === "create" ? "게시글 쓰기" : "게시글 수정"}
        </h1>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`flex justify-center items-center bg-[#9CA3AF] rounded-lg w-[88px] h-12 px-[23px] py-3 text-base text-[#F3F4F6] whitespace-nowrap ${
            isFormValid
              ? "bg-[#3692FF] cursor-pointer hover:underline"
              : "bg-[#9CA3AF] cursor-not-allowed"
          }`}
        >
          {mode === "create" ? "등록" : "수정"}
        </button>
      </div>

      <div>
        <form className="mb-6">
          <h1 className="text-lg font-bold text-[#1F2937] mb-[10px]">*제목</h1>
          <input
            type="text"
            value={title}
            placeholder="제목을 입력해주세요."
            onChange={(e) => setTitle(e.target.value)}
            className="items-start w-full h-14 px-6 py-4 rounded-xl bg-gray-100 focus:border-gray-400 focus:outline-none placeholder-[#9CA3AF] text-black"
          />
        </form>
        <form>
          <h1 className="text-lg font-bold text-[#1F2937] mb-[10px]">*내용</h1>
          <textarea
            value={content}
            placeholder="내용을 입력해주세요."
            onChange={(e) => setContent(e.target.value)}
            className="items-start w-full h-[282px] px-6 py-4 rounded-xl bg-gray-100 focus:border-gray-400 focus:outline-none placeholder-[#9CA3AF] text-black"
          />
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;
