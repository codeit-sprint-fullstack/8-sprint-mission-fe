"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const BoardWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // 게시글 등록 API 호출
    console.log("제목:", title, "내용:", content);
    // try {
    //   const res = await fetch("http://localhost:3000/freeboard", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ title, content }),
    //   });

    //   if (!res.ok) throw new Error("게시글 등록 실패");

    //   const data = await res.json(); // { id: 123, ... }
    //   router.push(`/freeboard/${data.id}`);
    // } catch (err) {
    //   console.error("등록 ERROR:", err);
    // }

    router.push(`/freeboard/${boardId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-[1200px]">
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold text-[#1F2937]">게시글 쓰기</h1>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`flex justify-center items-center bg-[#9CA3AF] rounded-lg w-22 h-12 px-[23px] py-3 text-base text-[#F3F4F6] whitespace-nowrap ${
                isFormValid
                  ? "bg-[#3692FF] cursor-pointer hover:underline"
                  : "bg-[#9CA3AF] cursor-not-allowed"
              }`}
            >
              등록
            </button>
          </div>

          <div>
            <form className="mb-6">
              <h1 className="text-lg font-bold text-[#1F2937] mb-[10px]">
                *제목
              </h1>
              <input
                type="text"
                value={title}
                placeholder="제목을 입력해주세요."
                onChange={(e) => setTitle(e.target.value)}
                className="items-start w-full h-14 px-6 py-4 rounded-xl bg-gray-100 focus:border-gray-400 focus:outline-none placeholder-[#9CA3AF] text-black"
              />
            </form>
            <form>
              <h1 className="text-lg font-bold text-[#1F2937] mb-[10px]">
                *내용
              </h1>
              <textarea
                value={content}
                placeholder="내용을 입력해주세요."
                onChange={(e) => setContent(e.target.value)}
                className="items-start w-full h-[282px] px-6 py-4 rounded-xl bg-gray-100 focus:border-gray-400 focus:outline-none placeholder-[#9CA3AF] text-black"
              />
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BoardWritePage;
