"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BestCard from "@/components/Board/BestCard";
import BoardCard from "@/components/Board/BoardCard";
import Controller from "@/components/Controller/Controller";
import { fetchBoards } from "@/api/boards";

const freeboardPage = () => {
  const [articles, setArticles] = useState([]);
  const [sortedArticles, setSortedArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBoards();

        setArticles(data);
        setSortedArticles(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const bestArticles = [...articles]
    .sort((a, b) => (b.favoriteCount ?? 0) - (a.favoriteCount ?? 0))
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        <section>
          <h1 className="mb-6 text-xl text-[#111827] font-bold">
            베스트 게시글
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(bestArticles ?? []).map((article) => (
              <BestCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <section>
          <Controller
            controls={{ search: true, orderBy: true }}
            articles={articles}
            setSortedArticles={setSortedArticles}
          />
          <div className="grid grid-cols-1 gap-4">
            {(sortedArticles ?? []).map((article) => (
              <BoardCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default freeboardPage;
