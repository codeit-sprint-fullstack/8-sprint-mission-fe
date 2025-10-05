"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BestArticle from "@/components/Article/BestArticle";
import ArticleCard from "@/components/Article/ArticleCard";
import Controller from "@/components/Controller/Controller";
import { fetchArticles } from "@/api/articles";
import { useArticles } from "@/hooks/useArticles";

const FreeboardPage = () => {
  const { articles, loading, error, lodArticles } = useArticles();
  const [sortedArticles, setSortedArticles] = useState([]);

  useEffect(() => {
    setSortedArticles(articles);
  }, [articles]);

  const bestArticles = [...articles]
    .sort((a, b) => (b.favoriteCount ?? 0) - (a.favoriteCount ?? 0))
    .slice(0, 3);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
              <BestArticle key={article.id} article={article} />
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
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FreeboardPage;
