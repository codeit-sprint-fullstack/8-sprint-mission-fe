"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditPost({ params }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 게시글 불러오기
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`http://localhost:8080/posts/${params.id}`);
        if (!res.ok) throw new Error("데이터 불러오기 실패");
        const data = await res.json();

        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        alert("게시글을 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("수정 실패");

      alert("수정 완료!");
      router.push(`/community/${params.id}`);
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) return <p className="text-center">불러오는 중...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 mt-16">
      {/* 상단 제목과 수정 버튼 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-[20px] font-bold text-[#1F2937]">
          게시글 수정하기
        </h1>
        <button
          type="submit"
          form="editPostForm"
          className="flex items-center justify-center h-[42px] px-[23px] gap-[10px] rounded-[8px] bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer transition-colors duration-200"
        >
          수정 완료
        </button>
      </div>

      <form
        id="editPostForm"
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
