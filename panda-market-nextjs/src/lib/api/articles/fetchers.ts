import { ArticleSchema } from "@/lib/schema/article";
import { fetchWithAuth } from "../auth/fetchers";

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  likeCount: number;
  createdAt: string;
}

export interface ArticleList {
  articles: Article[];
  totalCount: number;
}

export interface ArticleFilters {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 베스트 게시글 3개 가져오기
 * @returns ArticleList
 */
const getBestArticles = async (): Promise<ArticleList> => {
  try {
    const response = await fetch(`${API_URL}/articles?isBest=true`);
    if (!response.ok) {
      throw new Error("베스트 게시글 조회 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게시글 목록 가져오기
 * @param params ArticleFilters 검색 조건
 * @returns ArticleList
 */
const getArticles = async (
  params: ArticleFilters = {}
): Promise<ArticleList> => {
  try {
    const { page, pageSize, orderBy, keyword } = params;

    const searchParams = new URLSearchParams({
      page: page?.toString() || "1",
      pageSize: pageSize?.toString() || "4",
      orderBy: orderBy || "recent",
      keyword: keyword || "",
    });

    if (keyword) {
      searchParams.set("keyword", keyword);
    }

    const response = await fetch(`${API_URL}/articles?${searchParams}`);
    if (!response.ok) {
      throw new Error("게시글 조회 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게시글 상세 조회
 * @param id 게시글 ID
 * @returns Article
 */
const getArticleDetail = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/articles/${id}`);
    if (!response.ok) {
      throw new Error("게시글 상세 조회 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게시글 생성하기
 * @param article ArticleSchema 게시글 데이터
 * @returns Article
 */
const createArticle = async (article: ArticleSchema) => {
  try {
    const response = await fetchWithAuth(`${API_URL}/articles`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(article),
    });
    if (!response || !response.ok) {
      throw new Error("게시글 생성 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게시글 수정하기
 * @param id 게시글 ID
 * @param article
 * @returns response status 200
 */
const updateArticle = async (id: string, article: ArticleSchema) => {
  try {
    const response = await fetchWithAuth(`${API_URL}/articles/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(article),
    });
    if (!response || !response.ok) {
      throw new Error("게시글 수정 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게시글 삭제하기
 * @param id 게시글 ID
 * @returns response status 204
 */
const deleteArticle = async (id: string) => {
  try {
    const response = await fetchWithAuth(`${API_URL}/articles/${id}`, {
      method: "DELETE",
    });
    if (!response || !response.ok) {
      throw new Error("게시글 삭제 실패");
    }
    return response.status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const articlesApi = {
  getBestArticles,
  getArticles,
  getArticleDetail,
  createArticle,
  updateArticle,
  deleteArticle,
};
