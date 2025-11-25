import { api } from './apiClient';
import {
  Article,
  ArticlesResponse,
  CreateArticleData,
  UpdateArticleData,
  ArticleParams,
  ArticleFavoriteResponse,
} from '@/types';

/**
 * 게시글 목록 조회
 */
export const getArticles = async (params: ArticleParams = {}): Promise<ArticlesResponse> => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.sort) searchParams.append('sort', params.sort);
  if (params.search) searchParams.append('search', params.search);
  return api.get(`/articles?${searchParams.toString()}`) as Promise<ArticlesResponse>;
};

/**
 * 베스트 게시글 조회 (좋아요 많은 순)
 */
export const getBestArticles = async (): Promise<ArticlesResponse> =>
  api.get('/articles?limit=3&sort=favorite') as Promise<ArticlesResponse>;

/**
 * 게시글 상세 조회
 */
export const getArticleById = async (articleId: number): Promise<Article> =>
  api.get(`/articles/${articleId}`) as Promise<Article>;

/**
 * 게시글 등록
 */
export const createArticle = async (articleData: CreateArticleData): Promise<Article> =>
  api.post('/articles', articleData, { auth: true }) as Promise<Article>;

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
    sort: sortBy,
    ...additionalParams,
  });
};

/**
 * 게시글 수정
 */
export const updateArticle = async (
  articleId: number,
  articleData: UpdateArticleData,
): Promise<Article> =>
  api.patch(`/articles/${articleId}`, articleData, { auth: true }) as Promise<Article>;

/**
 * 게시글 삭제
 */
export const deleteArticle = async (articleId: number): Promise<void> => {
  await api.delete(`/articles/${articleId}`, { auth: true });
};

/**
 * 게시글 좋아요 토글
 */
export const toggleArticleFavorite = async (
  articleId: number,
): Promise<ArticleFavoriteResponse> => {
  return api.post(
    `/articles/${articleId}/favorite`,
    {},
    { auth: true },
  ) as Promise<ArticleFavoriteResponse>;
};
