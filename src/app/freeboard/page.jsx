"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BestCard from "../../components/BestCard";
import Boards from "../../components/Borads";
import Controller from "../../components/Controller/Controller";

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

      <main className="flex-1 flex flex-col items-stretch mx-auto p-4 w-[1200px]">
        <section>
          <h1 className="mb-6 text-xl text-[#111827] font-bold">
            베스트 게시글
          </h1>
          <BestCard />
        </section>

        <section>
          <Controller />
          <Boards />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default freeboardPage;
