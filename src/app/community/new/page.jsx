"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("게시글 생성 실패");

      const data = await res.json();
      alert("게시글이 생성되었습니다!");
      router.push(`/community/${data.id}`); // 생성 후 상세페이지 이동
    } catch (err) {
      console.error(err);
      alert("게시글 생성에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 mt-16">
      {/* 상단 제목과 등록 버튼 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-[20px] font-bold text-[#1F2937]">게시글 쓰기</h1>
        <button
          type="submit"
          form="createPostForm"
          className="flex items-center justify-center h-[42px] px-[23px] gap-[10px] rounded-[8px] bg-[#9CA3AF] text-white font-semibold hover:bg-[#7f8a99] cursor-pointer transition-colors duration-200"
        >
          등록
        </button>
      </div>

      <form
        id="createPostForm"
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {/* 제목 */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-bold text-[18px] text-[#1F2937]">
            *제목
          </label>
          <input
            id="title"
            type="text"
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex h-[56px] px-[24px] py-[16px] rounded-[12px] bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* 내용 */}
        <div className="flex flex-col">
          <label htmlFor="content" className="mb-2 font-bold text-[18px] text-[#1F2937]">
            *내용
          </label>
          <textarea
            id="content"
            placeholder="내용을 입력해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex w-full h-[282px] px-[24px] py-[16px] rounded-[12px] bg-[#F3F4F6] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </form>
    </div>
  );
}
