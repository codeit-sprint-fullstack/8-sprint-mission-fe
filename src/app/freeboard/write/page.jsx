"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addBoard } from "@/api/boards";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BoardForm from "@/components/Board/BoardForm";

const BoardWritePage = () => {
  const router = useRouter();

  const handleCreate = async (data) => {
    try {
      // 서버 연동이 없을 경우, 임의 데이터 처리
      const newBoard = {
        id: Date.now(),
        ...data,
        user_name: "테스트유저",
        heart_count: Math.floor(Math.random() * 100),
        createdAt: new Date().toISOString(),
      };
      // const newBoard = await addBoard(data);

      router.push(`/freeboard/${newBoard.id}`);
    } catch (error) {
      console.error("게시글 등록 에러:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-[1200px]">
        <BoardForm onSubmit={handleCreate} mode="create" />
      </main>

      <Footer />
    </div>
  );
};

export default BoardWritePage;
