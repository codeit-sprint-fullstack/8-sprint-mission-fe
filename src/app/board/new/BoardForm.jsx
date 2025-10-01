"use client";

import Button from "@/app/components/Button";
import { API_BASE_URL } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const BoardForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const modifyId = searchParams.get("id");
  const initialTitle = searchParams.get("title") || "";
  const initialContent = searchParams.get("content") || "";
  const initialAuthor = searchParams.get("author") || "Mia";

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const isModifyMode = !!modifyId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = isModifyMode
        ? `${API_BASE_URL}/posts/${modifyId}`
        : `${API_BASE_URL}/posts`;
      const method = isModifyMode ? "PATCH" : "POST";

      const res = await fetch(apiUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: isModifyMode ? initialAuthor : "Mia",
          profile: "/profile-default.svg",
          title: title,
          thumbnail: "/product-default.svg",
          // 신규 등록 시에만 전송하기
          ...(!isModifyMode && {
            createdAt: new Date().toISOString(),
            likes: 0,
          }),
          content: content,
        }),
      });

      if (res.ok) {
        const newPost = await res.json();
        router.push(
          isModifyMode ? `/board/${modifyId}` : `/board/${newPost.id}`
        );
      } else {
        // 오답노트: 서버에서 에러 응답이 온 경우
        alert(`게시글 ${isModifyMode ? "수정" : "등록"}에 실패했습니다.`);
        console.error(res.statusText);
      }
    } catch (err) {
      // 오답노트: 네트워크 에러 등 fetch 자체가 실패한 경우
      alert(`게시글 ${isModifyMode ? "수정" : "등록"} 중 오류가 발생했습니다.`);
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 my-6">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          {isModifyMode ? "게시글 수정" : "게시글 쓰기"}
        </div>
        <Button disabled={!(title.trim() && content.trim())}>
          {isModifyMode ? "수정" : "등록"}
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-lg font-bold">제목</div>
        <input
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-100 p-4 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-lg font-bold">내용</div>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-gray-100 resize-none p-4 rounded-lg min-h-80"
        />
      </div>
    </form>
  );
};

export default BoardForm;
