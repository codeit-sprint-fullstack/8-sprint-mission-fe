"use client";

import {
  BestArticle,
  articlesApi,
  Article,
  ArticleFilters,
} from "@/lib/api/articles/fetchers";
import { ArticleSchema } from "@/lib/schema/article";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

/**
 * 베스트 게시글 조회
 * @returns BestArticle[]
 */
const useGetBestArticles = (): UseQueryResult<BestArticle[]> => {
  return useQuery({
    queryKey: ["bestArticles"],
    queryFn: articlesApi.getBestArticles,
  });
};

/**
 * 게시글 조회
 * @param params ArticleFilters
 * @returns Article
 */
const useGetArticles = (params: ArticleFilters): UseQueryResult<Article> => {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => articlesApi.getArticles(params),
  });
};

/**
 * 게시글 생성
 * @returns ArticleSchema
 */
const useCreateArticle = (): UseMutationResult<
  Article,
  Error,
  ArticleSchema
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (article: ArticleSchema) => articlesApi.createArticle(article),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useArticlesQuery = {
  useGetBestArticles,
  useGetArticles,
  useCreateArticle,
};
