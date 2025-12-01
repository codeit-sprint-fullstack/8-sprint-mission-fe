import { api } from './apiClient';
import {
  Article,
  ArticlesResponse,
  CreateArticleData,
  UpdateArticleData,
  ArticleParams,
  ArticleFavoriteResponse,
} from '@/types';
import {
  articleSchema,
  articlesResponseSchema,
  articleFavoriteResponseSchema,
} from '@/schemas';

/**
 * 게시글 목록 조회
 */
export const getArticles = async (params: ArticleParams = {}): Promise<ArticlesResponse> => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.orderBy) searchParams.append('orderBy', params.orderBy);
  if (params.search) searchParams.append('search', params.search);
  const response = await api.get(`/articles?${searchParams.toString()}`);
  return articlesResponseSchema.parse(response);
};

/**
 * 베스트 게시글 조회 (좋아요 많은 순)
 */
export const getBestArticles = async (): Promise<ArticlesResponse> => {
  const response = await api.get('/articles?limit=3&orderBy=favorite');
  return articlesResponseSchema.parse(response);
};

/**
 * 게시글 상세 조회
 */
export const getArticleById = async (articleId: string | number): Promise<Article> => {
  const response = await api.get(`/articles/${articleId}`);
  return articleSchema.parse(response);
};

/**
 * 게시글 등록
 */
export const createArticle = async (articleData: CreateArticleData): Promise<Article> => {
  const response = await api.post('/articles', articleData, { auth: true });
  return articleSchema.parse(response);
};

/**
 * 게시글 검색
 */
export const searchArticles = async (
  searchTerm: string,
  additionalParams: ArticleParams = {},
): Promise<ArticlesResponse> => {
  return getArticles({
    search: searchTerm,
    ...additionalParams,
  });
};

/**
 * 게시글 목록 조회 (정렬 옵션 포함)
 */
export const getArticlesSorted = async (
  sortBy: 'recent' | 'favorite' = 'recent',
  additionalParams: ArticleParams = {},
): Promise<ArticlesResponse> => {
  return getArticles({
    orderBy: sortBy,
    ...additionalParams,
  });
};

/**
 * 게시글 수정
 */
export const updateArticle = async (
  articleId: string | number,
  articleData: UpdateArticleData,
): Promise<Article> => {
  const response = await api.patch(`/articles/${articleId}`, articleData, { auth: true });
  return articleSchema.parse(response);
};

/**
 * 게시글 삭제
 */
export const deleteArticle = async (articleId: string | number): Promise<void> => {
  await api.delete(`/articles/${articleId}`, { auth: true });
};

/**
 * 게시글 좋아요 토글
 */
export const toggleArticleFavorite = async (
  articleId: string | number,
): Promise<ArticleFavoriteResponse> => {
  const response = await api.post(
    `/articles/${articleId}/favorite`,
    {},
    { auth: true },
  );
  return articleFavoriteResponseSchema.parse(response);
};
