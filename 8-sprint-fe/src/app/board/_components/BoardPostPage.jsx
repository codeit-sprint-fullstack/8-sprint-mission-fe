"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "@/app/(components)/atoms/Button";
import ic_plus from "/public/ic_plus.svg";
import Image from "next/image";
import { addArticle } from "@/api/fetchArticle";
import { useRouter } from "next/navigation";

const BoardPostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [btnAble, setBtnAble] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: mutateAddArticle, isPending, error } = useMutation({
    mutationFn: addArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error) => {
      console.error("게시글 추가 중 오류 발생:", error);
      alert("게시글을 추가하는데 실패했습니다.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    mutateAddArticle({ title, content });
    setTitle("");
    setContent("");

    alert("게시글 작성완료");
    router.push("/board");
  };

  useEffect(() => {
    if (title !== "" && content !== "") {
      setBtnAble(true);
    }
  }, [title, content]);

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">작성 중...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section onSubmit={handleSubmit} className="mt-6">
      <form className="flex flex-col">
        <div className="flex items-center justify-between mb-8">  
          <p className="text-xl font-bold text-gray-800">게시글 쓰기</p>
          <Button isAble={btnAble} type="submit">
            등록
          </Button>
        </div>
        <label htmlFor="title" className="mb-3 text-lg font-bold text-gray-900">
          *제목
        </label>
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full py-4 px-6 mb-4 bg-gray-100 rounded-xl"
        />
        <label
          htmlFor="content"
          className="mb-3 text-lg font-bold text-gray-900"
        >
          *내용
        </label>
        <textarea
          name="content"
          id="contentArea"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-70.5 py-4 px-6 mb-4 resize-none bg-gray-100 rounded-xl"
        ></textarea>
        <p className="mb-3 text-lg font-bold text-gray-900">이미지</p>
        <div className="size-70.5 bg-gray-200 rounded-xl flex flex-col gap-3 items-center justify-center">
          <Image src={ic_plus} alt="plus_icon" />
          <p className="text-gray-400">이미지 등록</p>
        </div>
      </form>
    </section>
  );
};

export default BoardPostPage;
