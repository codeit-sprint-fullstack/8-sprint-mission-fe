"use client";

import BestCard from "@/components/organisms/BestCard";
import { Button } from "@/components/ui/button";
import { useArticles } from "@/hooks/useArticles";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const ARTICLE_PAGE_SIZE = 4;

export default function FreeBoardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [inputValue, setInputValue] = useState("");

  const {
    data: bestArticles,
    isLoading: isBestLoading,
    isError: isBestError,
  } = useArticles.useGetBestArticles();

  const {
    data: articles,
    isLoading: isLoading,
    isError: isError,
  } = useArticles.useGetArticles({
    page: currentPage,
    pageSize: ARTICLE_PAGE_SIZE,
    orderBy: orderBy as "recent" | "like",
    keyword: keyword,
  });

  const articlesList = articles?.articles || [];

  if (isBestLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading</div>
    );
  }

  if (isBestError || isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {isBestError || isError}
      </div>
    );
  }

  return (
    <>
      <section className="mb-10">
        <h1 className="text-xl font-bold mb-6">베스트 게시글</h1>

        <div className="flex gap-6">
          {bestArticles?.map((article) => (
            <BestCard
              key={article.id}
              id={article.id}
              title={article.title}
              image="/free-board/note-book-img.png"
              nickname={article.author}
              createdAt={dayjs(article.createdAt).format("YYYY. MM. DD.")}
              likeCount={article.likes}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">게시글</h1>
          <Button variant="default" asChild>
            <Link href="/free-board/write">글쓰기</Link>
          </Button>
        </div>

        <div className="flex gap-6">
          {articlesList?.map((article) => (
            <BestCard
              key={article.id}
              id={article.id}
              title={article.title}
              image="/free-board/note-book-img.png"
              nickname={article.author}
              createdAt={dayjs(article.createdAt).format("YYYY. MM. DD.")}
              likeCount={article.likes}
            />
          ))}
        </div>
      </section>
    </>
  );
}
