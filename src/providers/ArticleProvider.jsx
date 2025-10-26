'use client';

import * as articleService from '@/lib/articleApi';
import { createContext, useContext, useMemo, useCallback, useState } from 'react';

const ArticleContext = createContext({
  articles: [],
  bestArticles: [],
  currentArticle: null,
  loading: false,
  error: null,
  getArticles: () => {},
  getBestArticles: () => {},
  getArticleById: () => {},
  createArticle: () => {},
  updateArticle: () => {},
  deleteArticle: () => {},
  searchArticles: () => {},
  getArticlesSorted: () => {},
  toggleArticleFavorite: () => {},
});

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};

export default function ArticleProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 공통: 목록 응답 정규화
  const toList = useCallback((response) => response?.articles || [], []);

  const handleError = useCallback((err, message) => {
    console.error(message, err);
    setError(err?.message || message);
    setLoading(false);
  }, []);

  const getArticles = useCallback(
    async (params = {}) => {
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
    async (articleId) => {
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
    async (articleData) => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleService.createArticle(articleData);
        // 새 게시글이 생성되면 목록을 다시 가져오거나 추가
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
    async (articleId, articleData) => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleService.updateArticle(articleId, articleData);
        // 수정된 게시글로 업데이트
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
    async (articleId) => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleService.deleteArticle(articleId);
        // 삭제된 게시글을 목록에서 제거
        setArticles((prev) => prev.filter((article) => article.id !== articleId));
        if (currentArticle?.id === articleId) {
          setCurrentArticle(null);
        }
        return response;
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
    async (searchTerm, additionalParams = {}) => {
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
    async (sortBy = 'recent', additionalParams = {}) => {
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
    async (articleId) => {
      try {
        setLoading(true);
        setError(null);
        const result = await articleService.toggleArticleFavorite(articleId);
        // currentArticle 업데이트
        if (currentArticle?.id === articleId) {
          setCurrentArticle((prev) => ({
            ...prev,
            isFavorite: result.isLiked,
            favoriteCount: result.favoriteCount,
            likes: result.favoriteCount, // likes 필드도 업데이트
          }));
        }
        // articles 목록도 업데이트
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
