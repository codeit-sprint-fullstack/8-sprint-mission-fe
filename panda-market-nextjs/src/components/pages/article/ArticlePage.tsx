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
import { useArticlesQuery } from "@/lib/api/articles/queries";
import useArticles from "@/hooks/useArticles";
import dayjs from "dayjs";
import Link from "next/link";
import { useBestArticlesPageSize } from "@/hooks/useBestArticlesPageSize";
import Text from "@/components/atoms/Text";

const ARTICLE_PAGE_SIZE = 4; // 게시글 수

export default function ArticlePage() {
  const {
    data: bestArticles,
    isLoading: isBestLoading,
    isError: isBestError,
  } = useArticlesQuery.useGetBestArticles();

  const {
    currentPage,
    articles,
    isLoading,
    isError,
    inputValue,
    handleSearchEvent,
    handleSearchKeyDownEvent,
    handleOrderByEvent,
    handlePageChange,
  } = useArticles(ARTICLE_PAGE_SIZE);

  // 베스트 게시글 페이지 사이즈
  const bestArticlesPageSize: number = useBestArticlesPageSize();
  const bestArticlesList = bestArticles?.slice(0, bestArticlesPageSize) || [];

  // 게시글 리스트
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
        <Text styleName="text-xl-bold" className="mb-6" as="h1">
          베스트 게시글
        </Text>

        {/* 베스트 게시글 리스트 */}
        <div className="flex gap-6">
          {bestArticlesList?.map((article) => (
            <BestCard
              key={article.id}
              id={article.id}
              title={article.title}
              image="/article/note-book-img.png"
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
          <Text styleName="text-xl-bold" as="h1">
            게시글
          </Text>
          <Button variant="default" asChild>
            <Link href="/article/create">글쓰기</Link>
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
              image="/article/note-book-img.png"
              avatarImage="/article/avatar-img.svg"
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
    </>
  );
}
