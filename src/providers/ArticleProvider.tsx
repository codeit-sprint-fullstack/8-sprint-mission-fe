'use client';

import * as articleService from '@/lib/articleApi';
import { createContext, useContext, useMemo, useCallback, useState, ReactNode } from 'react';
import {
  Article,
  ArticleParams,
  ArticlesResponse,
  CreateArticleData,
  UpdateArticleData,
  ArticleFavoriteResponse,
} from '@/types';

interface ArticleContextValue {
  articles: Article[];
  bestArticles: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
  getArticles: (params?: ArticleParams) => Promise<ArticlesResponse>;
  getBestArticles: () => Promise<ArticlesResponse>;
  getArticleById: (articleId: string | number) => Promise<Article>;
  createArticle: (articleData: CreateArticleData) => Promise<Article>;
  updateArticle: (articleId: string | number, articleData: UpdateArticleData) => Promise<Article>;
  deleteArticle: (articleId: string | number) => Promise<void>;
  searchArticles: (
    searchTerm: string,
    additionalParams?: ArticleParams,
  ) => Promise<ArticlesResponse>;
  getArticlesSorted: (
    sortBy?: 'recent' | 'favorite',
    additionalParams?: ArticleParams,
  ) => Promise<ArticlesResponse>;
  toggleArticleFavorite: (articleId: string | number) => Promise<ArticleFavoriteResponse>;
}

const ArticleContext = createContext<ArticleContextValue | undefined>(undefined);

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};

interface ArticleProviderProps {
  children: ReactNode;
}

export default function ArticleProvider({ children }: ArticleProviderProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 공통: 목록 응답 정규화
  const toList = useCallback((response: ArticlesResponse) => response?.articles || [], []);

  const handleError = useCallback((err: unknown, message: string) => {
    console.error(message, err);
    setError((err as Error)?.message || message);
    setLoading(false);
  }, []);

  const getArticles = useCallback(
    async (params: ArticleParams = {}) => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleService.getArticles(params);
        setArticles(toList(response));
        return response;
      } catch (error) {
        handleError(error, '게시글 목록을 가져오는데 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [handleError, toList],
  );

  const getBestArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await articleService.getBestArticles();
      setBestArticles(toList(response));
      return response;
    } catch (error) {
      handleError(error, '베스트 게시글을 가져오는데 실패했습니다');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [handleError, toList]);

  const getArticleById = useCallback(
    async (articleId: string | number) => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleService.getArticleById(articleId);
        setCurrentArticle(response);
        return response;
      } catch (error) {
        handleError(error, '게시글을 가져오는데 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const createArticle = useCallback(
    async (articleData: CreateArticleData) => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleService.createArticle(articleData);
        setArticles((prev) => [response, ...prev]);
        return response;
      } catch (error) {
        handleError(error, '게시글 등록에 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const updateArticle = useCallback(
    async (articleId: string | number, articleData: UpdateArticleData) => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleService.updateArticle(articleId, articleData);
        setArticles((prev) =>
          prev.map((article) => (article.id === articleId ? response : article)),
        );
        if (currentArticle?.id === articleId) {
          setCurrentArticle(response);
        }
        return response;
      } catch (error) {
        handleError(error, '게시글 수정에 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [currentArticle?.id, handleError],
  );

  const deleteArticle = useCallback(
    async (articleId: string | number) => {
      try {
        setLoading(true);
        setError(null);
        await articleService.deleteArticle(articleId);
        setArticles((prev) => prev.filter((article) => article.id !== articleId));
        if (currentArticle?.id === articleId) {
          setCurrentArticle(null);
        }
      } catch (error) {
        handleError(error, '게시글 삭제에 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [currentArticle?.id, handleError],
  );

  const searchArticles = useCallback(
    async (searchTerm: string, additionalParams: ArticleParams = {}) => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleService.searchArticles(searchTerm, additionalParams);
        setArticles(toList(response));
        return response;
      } catch (error) {
        handleError(error, '게시글 검색에 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [handleError, toList],
  );

  const getArticlesSorted = useCallback(
    async (sortBy: 'recent' | 'favorite' = 'recent', additionalParams: ArticleParams = {}) => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleService.getArticlesSorted(sortBy, additionalParams);
        setArticles(toList(response));
        return response;
      } catch (error) {
        handleError(error, '정렬된 게시글을 가져오는데 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [handleError, toList],
  );

  const toggleArticleFavorite = useCallback(
    async (articleId: string | number) => {
      try {
        setLoading(true);
        setError(null);
        const result = await articleService.toggleArticleFavorite(articleId);
        if (currentArticle?.id === articleId) {
          setCurrentArticle((prev) =>
            prev
              ? {
                  ...prev,
                  isFavorite: result.isLiked,
                  favoriteCount: result.favoriteCount,
                  likes: result.favoriteCount,
                }
              : null,
          );
        }
        setArticles((prev) =>
          prev.map((article) =>
            article.id === articleId
              ? {
                  ...article,
                  isFavorite: result.isLiked,
                  favoriteCount: result.favoriteCount,
                  likes: result.favoriteCount,
                }
              : article,
          ),
        );
        return result;
      } catch (error) {
        handleError(error, '좋아요 처리에 실패했습니다');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [currentArticle?.id, handleError],
  );

  const value = useMemo(
    () => ({
      articles,
      bestArticles,
      currentArticle,
      loading,
      error,
      getArticles,
      getBestArticles,
      getArticleById,
      createArticle,
      updateArticle,
      deleteArticle,
      searchArticles,
      getArticlesSorted,
      toggleArticleFavorite,
    }),
    [
      articles,
      bestArticles,
      currentArticle,
      loading,
      error,
      getArticles,
      getBestArticles,
      getArticleById,
      createArticle,
      updateArticle,
      deleteArticle,
      searchArticles,
      getArticlesSorted,
      toggleArticleFavorite,
    ],
  );

  return <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>;
}
