"use client";

import ArticleCard from "@/components/organisms/ArticleCard";
import BestCard from "@/components/organisms/BestCard";
import BasicPagination from "@/components/molecules/BasicPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useArticles } from "@/lib/api/articles/queries";
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

  const handleSearchEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleSearchKeyDownEvent = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    console.log(e.key);
    if (e.key === "Enter") {
      setKeyword(inputValue);
      setCurrentPage(1);
    }
  };

  const handleOrderByEvent = (value: string) => {
    console.log(value);
    setOrderBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="px-[30px] pt-[30px] w-full mx-auto max-w-[1260px] pb-[200px]">
      <section className="mb-10">
        <h1 className="text-xl font-bold mb-6">베스트 게시글</h1>

        {/* 베스트 게시글 리스트 */}
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

      {/* 게시글 섹션 */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">게시글</h1>
          <Button variant="default" asChild>
            <Link href="/free-board/write">글쓰기</Link>
          </Button>
        </div>

        {/* 검색 및 정렬 컴포넌트 */}
        <div className="flex justify-between items-center mb-6 gap-4">
          <Input
            value={inputValue}
            onChange={handleSearchEvent}
            onKeyDown={handleSearchKeyDownEvent}
            placeholder="검색할 게시글을 입력해주세요"
            className="bg-(--secondary-color-100) border-none rounded-[12px] h-[42px]"
          />
          <Select onValueChange={handleOrderByEvent}>
            <SelectTrigger className="w-[180px] !h-[42px]">
              <SelectValue placeholder="최신순" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">최신순</SelectItem>
              <SelectItem value="like">좋아요순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 게시글 리스트 */}
        <div className="flex flex-col gap-6">
          {articlesList?.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              image="/free-board/note-book-img.png"
              avatarImage="/free-board/avatar-img.svg"
              nickname={article.author}
              createdAt={dayjs(article.createdAt).format("YYYY. MM. DD.")}
              likeCount={article.likes}
            />
          ))}
        </div>

        {/* 페이지네이션 */}
        <BasicPagination
          currentPage={currentPage}
          totalCount={articles?.totalCount || 0}
          pageSize={ARTICLE_PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
