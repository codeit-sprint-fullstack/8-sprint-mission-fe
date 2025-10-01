"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchArticle, updateArticle } from "@/api/articles";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ArticleForm from "@/components/Article/ArticleForm";

const BoardWritePage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({ title: "", content: "" });
  const router = useRouter();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const data = await fetchArticle(id);
        setInitialData({ title: data.title, content: data.content });
      } catch (error) {
        console.error("게시글 불러오기 에러:", error);
      }
    };

    getBoard();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateArticle(id, data);
      router.push(`/articles/${id}`);
    } catch (error) {
      console.error("게시글 수정 에러:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        <ArticleForm
          initialData={initialData}
          onSubmit={handleUpdate}
          mode="edit"
        />
      </main>

      <Footer />
    </div>
  );
};

export default BoardWritePage;
