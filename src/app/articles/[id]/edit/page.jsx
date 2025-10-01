"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchBoard, updateBoard } from "@/api/boards";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BoardForm from "@/components/Board/BoardForm";

const BoardWritePage = ({ params }) => {
  const articleId = params.id;
  const [initialData, setInitialData] = useState({ title: "", content: "" });
  const router = useRouter();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const data = await fetchBoard(articleId);
        setInitialData({ title: data.title, content: data.content });
      } catch (error) {
        console.error("게시글 불러오기 에러:", error);
      }
    };

    getBoard();
  }, [articleId]);

  const handleUpdate = async (data) => {
    try {
      await updateBoard(articleId, data);
      router.push(`/articles/${articleId}`);
    } catch (error) {
      console.error("게시글 수정 에러:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        <BoardForm
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
