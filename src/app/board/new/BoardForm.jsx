"use client";

import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BoardForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: "Mia",
          profile: "/profile-default.svg",
          title: title,
          thumbnail: "/product-default.svg",
          likes: 0,
          createdAt: new Date(), //.toISOString(),
          content: content,
        }),
      });

      if (response.ok) {
        // 등록 성공 시 게시판 목록 페이지로 이동
        router.push("/board");
      } else {
        // 서버에서 에러 응답이 온 경우
        alert("게시글 등록에 실패했습니다.");
        console.error("Server response not OK:", response.statusText);
      }
    } catch (err) {
      // 네트워크 에러 등 fetch 자체가 실패한 경우
      alert("게시글 등록 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 my-6">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">게시글 쓰기</div>
        <Button disabled={!(title && content)}>등록</Button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-lg font-bold">제목</div>
        <input
          placeholder="제목을 입력해주세요"
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-100 p-4 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-lg font-bold">내용</div>
        <textarea
          placeholder="내용을 입력해주세요"
          onChange={(e) => setContent(e.target.value)}
          className="bg-gray-100 resize-none p-4 rounded-lg min-h-80"
        />
      </div>
    </form>
  );
};

export default BoardForm;
