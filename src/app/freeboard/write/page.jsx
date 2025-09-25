"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addBoard } from "@/api/boards";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BoardForm from "@/components/Board/BoardForm";

const BoardWritePage = () => {
  const router = useRouter();

  //게시글 등록 API
  const handleCreate = async (data) => {
    try {
      const newBoard = await addBoard(data);

      // 프론트에서 임의값으로 처리
      const enrichedBoard = {
        ...newBoard,
        user_name: newBoard.user_name || "게시글 추가 테스트유저",
        heart_count: newBoard.heart_count ?? Math.floor(Math.random() * 100),
        createdAt: newBoard.createdAt || new Date().toISOString(),
      };

      router.push(`/freeboard/${enrichedBoard.id}`);
    } catch (error) {
      console.error("게시글 등록 에러:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        <BoardForm onSubmit={handleCreate} mode="create" />
      </main>

      <Footer />
    </div>
  );
};

export default BoardWritePage;
