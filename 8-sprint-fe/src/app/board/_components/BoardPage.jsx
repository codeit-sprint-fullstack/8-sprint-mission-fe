"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Button from "@/app/(components)/atoms/Button";
import Search from "@/app/(components)/atoms/Search";
import Dropdown from "@/app/(components)/atoms/Dropdown";
import ListCommunity from "./ListCommunity";
import { fetchArticles } from "@/api/fetchArticle";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const BoardPage = () => {
  const {
    data: articles,
    isPending,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">로딩 중...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <section className="mt-6.5">
        <h1 className=" text-gray-900 font-bold text-xl mb-6">베스트 게시글</h1>
        {error ? (
          <p className="font-bold text-center">게시글이 없습니다.</p>
        ) : (
          <div className="flex gap-6">
            {articles.slice(0, 3).map((article) => {
              return (
                <Card
                  key={article.id}
                  title={article.title}
                  createdAt={article.createdAt}
                ></Card>
              );
            })}
          </div>
        )}
        <div className="flex items-center justify-between mt-10 mb-6">
          <h1 className="text-gray-900 font-bold text-xl">게시글</h1>
          <Link href="board/post">
            <Button>글쓰기</Button>
          </Link>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Search />
          <Dropdown />
        </div>
        {error ? (
          <p className="font-bold text-center mt-10">게시글이 없습니다.</p>
        ) : (
          <div className="mt-6 flex flex-col gap-6">
            {articles.map((article) => {
              return (
                <Link href={`board/${article.id}`} key={article.id}>
                  <ListCommunity
                    key={article.id}
                    title={article.title}
                    createdAt={article.createdAt}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default BoardPage;
