"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BestCard from "@/components/Board/BestCard";
import BoardCard from "@/components/Board/BoardCard";
import Controller from "@/components/Controller/Controller";

const freeboardPage = () => {
  const [board, setBoard] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("");
      const data = await res.json();

      setBoard(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-[1200px]">
        <section>
          <h1 className="mb-6 text-xl text-[#111827] font-bold">
            베스트 게시글
          </h1>
          {/* Array는 실제 데이터 연동 후 {boards.map((board) => 같은 형식으로 변경 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, idx) => (
              <BestCard key={idx} />
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
            {(board ?? []).map((item, idx) => (
              <BoardCard key={idx} board={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default freeboardPage;
