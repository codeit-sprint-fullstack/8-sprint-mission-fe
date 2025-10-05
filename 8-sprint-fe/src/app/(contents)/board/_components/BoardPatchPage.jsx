"use client";

import React, { useEffect, useState } from "react";
import ArticleForm from "./ArticleForm";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchArticle, patchArticle } from "@/api/fetchArticle";

const BoardPatchPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: articleData,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
    gcTime: 10 * 60 * 1000,
  });

  const [article, setArticle] = useState({ title: "", content: "" });

  useEffect(() => {
    if (articleData) {
      setArticle(articleData);
    }
  }, [articleData]);

  const queryClient = useQueryClient();
  const { mutate: mutatePatchArticle, isPending: isPatch } = useMutation({
    mutationFn: patchArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article", id] });
      alert("게시글 수정완료");
      router.push(`/board/${id}`);
    },
    onError: (error) => {
      console.error("게시글 수정 중 오류 발생: ", error);
      alert("게시글을 수정하는데 실패했습니다.");
    },
  });

  const handlePatch = (e) => {
    e.preventDefault();
    mutatePatchArticle({ id, article });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">로딩 중...</div>
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
        handleSubmit={handlePatch}
        article={article}
        setArticle={setArticle}
      />
    </section>
  );
};

export default BoardPatchPage;
