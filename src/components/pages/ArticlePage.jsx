'use client';
import React, { useEffect, useState } from "react";
import BestSection from "@/components/BestSection";
import PostSection from "@/components/PostSection";
import { useArticles } from "@/providers/ArticleProvider";

export default function ArticlePage() {
  const [searchTerm, setSearchTerm] = useState("");
  // API 스펙에 맞춰 기본값을 'recent'로 설정
  const [sortBy, setSortBy] = useState("recent"); // 'recent' | 'likes'

  const { articles, bestArticles, getArticles, getBestArticles } = useArticles();

  // 베스트 게시글 최초 로드
  useEffect(() => {
    getBestArticles();
  }, []);

  // 목록 로드: 검색/정렬 변경 시 디바운스 호출
  useEffect(() => {
      getArticles({ page: 1, limit: 20, sort: sortBy, search: searchTerm });
  }, [searchTerm, sortBy]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-50)' }}>
      <BestSection items={bestArticles} />
      <PostSection
        items={articles}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
}