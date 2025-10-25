"use client";

import {
  Article,
  articlesApi,
  ArticleList,
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
const useGetBestArticles = (): UseQueryResult<ArticleList> => {
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
const useGetArticles = (
  params: ArticleFilters
): UseQueryResult<ArticleList> => {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => articlesApi.getArticles(params),
  });
};

/**
 * 게시글 상세 조회
 * @param id 게시글 ID
 * @returns Article
 */
const useGetArticleDetail = (id: string): UseQueryResult<Article> => {
  return useQuery({
    queryKey: ["articleDetail", id],
    queryFn: () => articlesApi.getArticleDetail(id),
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

/**
 * 게시글 수정
 * @returns
 */
const useUpdateArticle = (): UseMutationResult<
  Article,
  Error,
  { id: string; article: ArticleSchema }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, article }: { id: string; article: ArticleSchema }) =>
      articlesApi.updateArticle(id, article),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

/**
 * 게시글 삭제
 * @returns
 */
const useDeleteArticle = (): UseMutationResult<
  number,
  Error,
  { id: string }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => articlesApi.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
        exact: false,
      });
    },
  });
};

export const useArticlesQuery = {
  useGetBestArticles,
  useGetArticles,
  useGetArticleDetail,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
};
