"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BestCard from "@/components/Board/BestCard";
import BoardCard from "@/components/Board/BoardCard";
import Controller from "@/components/Controller/Controller";
import { fetchBoards } from "@/api/boards";

const freeboardPage = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBoards();

        setBoard(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        <section>
          <h1 className="mb-6 text-xl text-[#111827] font-bold">
            베스트 게시글
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(board ?? []).slice(0, 3).map((board) => (
              <BestCard key={board.id} board={board} />
            ))}
          </div>
        </section>

        <section>
          <Controller
            controls={{ search: true, orderBy: true }}
            boards={board ?? []}
            setSortedBoards={setBoard}
          />
          <div className="grid grid-cols-1 gap-4">
            {(board ?? []).map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default freeboardPage;
