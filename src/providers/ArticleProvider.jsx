"use client";

import * as articleService from "@/lib/articleApi";
import { createContext, useContext, useState } from "react";

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
});

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticleProvider");
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
  const toList = (response) => {
    return response?.articles || [];
  };

  const handleError = (error, message) => {
    console.error(message, error);
    setError(error.message || message);
    setLoading(false);
  };

  const getArticles = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
  const response = await articleService.getArticles(params);
  setArticles(toList(response));
  return response;
    } catch (error) {
      handleError(error, "게시글 목록을 가져오는데 실패했습니다");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getBestArticles = async () => {
    try {
      setLoading(true);
      setError(null);
  const response = await articleService.getBestArticles();
  setBestArticles(toList(response));
  return response;
    } catch (error) {
      handleError(error, "베스트 게시글을 가져오는데 실패했습니다");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getArticleById = async (articleId) => {
    try {
      setLoading(true);
      setError(null);
  const response = await articleService.getArticleById(articleId);
  setCurrentArticle(response);
      return response;
    } catch (error) {
      handleError(error, "게시글을 가져오는데 실패했습니다");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (articleData) => {
    try {
      setLoading(true);
      setError(null);
  const response = await articleService.createArticle(articleData);
  // 새 게시글이 생성되면 목록을 다시 가져오거나 추가
  setArticles(prev => [response, ...prev]);
      return response;
    } catch (error) {
      handleError(error, "게시글 등록에 실패했습니다");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async (articleId, articleData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await articleService.updateArticle(articleId, articleData);
      // 수정된 게시글로 업데이트
      setArticles(prev => 
        prev.map(article => 
          article.id === articleId ? response : article
        )
      );
      if (currentArticle?.id === articleId) {
        setCurrentArticle(response);
      }
      return response;
    } catch (error) {
      handleError(error, "게시글 수정에 실패했습니다");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (articleId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await articleService.deleteArticle(articleId);
      // 삭제된 게시글을 목록에서 제거
      setArticles(prev => prev.filter(article => article.id !== articleId));
      if (currentArticle?.id === articleId) {
        setCurrentArticle(null);
      }
      return response;
    } catch (error) {
      handleError(error, "게시글 삭제에 실패했습니다");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const searchArticles = async (searchTerm, additionalParams = {}) => {
    try {
      setLoading(true);
      setError(null);
  const response = await articleService.searchArticles(searchTerm, additionalParams);
  setArticles(toList(response));
  return response;
    } catch (error) {
      handleError(error, "게시글 검색에 실패했습니다");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getArticlesSorted = async (sortBy = 'recent', additionalParams = {}) => {
    try {
      setLoading(true);
      setError(null);
  const response = await articleService.getArticlesSorted(sortBy, additionalParams);
  setArticles(toList(response));
  return response;
    } catch (error) {
      handleError(error, "정렬된 게시글을 가져오는데 실패했습니다");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ArticleContext.Provider 
      value={{
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
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}
