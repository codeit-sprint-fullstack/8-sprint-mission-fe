"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addArticle } from "@/api/articles";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ArticleForm from "@/components/Article/ArticleForm";

const ArticleWritePage = () => {
  const router = useRouter();

  //게시글 등록 API
  const handleCreate = async (data) => {
    try {
      const newBoard = await addArticle(data);

      // 프론트에서 임의값으로 처리
      const enrichedBoard = {
        ...newBoard,
        nickname: newBoard.nickname || "게시글 추가 테스트유저",
        likeCount: newBoard.likeCount ?? Math.floor(Math.random() * 100),
        createdAt: newBoard.createdAt || new Date().toISOString(),
      };

      router.push(`/articles/${enrichedBoard.id}`);
    } catch (error) {
      console.error("게시글 등록 에러:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        <ArticleForm onSubmit={handleCreate} mode="create" />
      </main>

      <Footer />
    </div>
  );
};

export default ArticleWritePage;
