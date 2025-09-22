"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BoardForm from "@/components/Board/BoardForm";

const BoardWritePage = () => {
  const router = useRouter();

  const handleCreate = async (data) => {
    try {
      const res = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("게시글 등록 실패");

      const newBoard = await res.json(); //서버에서 새 게시글 id 반환
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
