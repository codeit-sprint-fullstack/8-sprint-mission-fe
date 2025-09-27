"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addArticle } from "@/api/fetchArticle";
import { useRouter } from "next/navigation";
import ArticleForm from "./ArticleForm";

const BoardPostPage = () => {
  const [article, setArticle] = useState({
    title: "",
    content: "",
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: mutateAddArticle,
    isPending,
    error,
  } = useMutation({
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
    if (!article.title.trim() || !article.content.trim()) return;

    mutateAddArticle(article);
    setArticle({
      title: "",
      content: "",
    });

    alert("게시글 작성완료");
    router.push("/board");
  };

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
    <section className="mt-6">
      <ArticleForm
        handleSubmit={handleSubmit}
        article={article}
        setArticle={setArticle}
      />
    </section>
  );
};

export default BoardPostPage;
