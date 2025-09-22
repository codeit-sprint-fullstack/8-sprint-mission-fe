"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BoardForm from "@/components/Board/BoardForm";

const BoardWritePage = ({ params }) => {
  const boardId = params.id;
  const [initialData, setInitialData] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await fetch(`http://localhost:3000/freeboard/${boardId}`);
        if (!res.ok) throw new Error("게시글 불러오기 실패");
        const data = await res.json();
        setInitialData({ title: data.title, content: data.content });
      } catch (error) {
        console.error("게시글 불러오기 에러:", error);
      }
    };

    fetchBoard();
  }, [boardId]);

  const handleUpdate = async (data) => {
    try {
      const res = await fetch(`http://localhost:3000/freeboard/${boardId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("게시글 수정 실패");

      router.push(`/freeboard/${boardId}`);
    } catch (error) {
      console.error("게시글 수정 에러:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-[1200px]">
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
