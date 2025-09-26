"use client";

import {
  BestArticle,
  articlesApi,
  Article,
  ArticleFilters,
} from "@/lib/api/articles/fetchers";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

// 개별 훅으로 내보내기
const useGetBestArticles = (): UseQueryResult<BestArticle[]> => {
  return useQuery({
    queryKey: ["bestArticles"],
    queryFn: articlesApi.getBestArticles,
  });
};

const useGetArticles = (params: ArticleFilters): UseQueryResult<Article> => {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => articlesApi.getArticles(params),
  });
};

// 기존 객체 방식도 유지
export const useArticles = {
  useGetBestArticles,
  useGetArticles,
};
