"use client";

import { useState, useEffect } from "react";
import ImageForm from "../InputField/ImageForm";
import InputField from "../InputField/InputField";
import TextareaField from "../InputField/TextareaField";

const ArticleForm = ({ initialData = {}, onSubmit, mode = "create" }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (mode === "edit") {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
    }
  }, [mode, initialData]);

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = async () => {
    if (!isFormValid) return;
    onSubmit({ title, content });
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-800">
          {mode === "create" ? "게시글 쓰기" : "게시글 수정"}
        </h1>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`flex justify-center items-center rounded-lg w-[88px] h-12 px-[23px] py-3 text-base text-gray-100 whitespace-nowrap ${
            isFormValid
              ? "bg-[#3692FF] cursor-pointer hover:underline"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {mode === "create" ? "등록" : "수정"}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <InputField
          title="*제목"
          type="text"
          id="title"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextareaField
          title="*내용"
          id="content"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </section>
  );
};

export default ArticleForm;
