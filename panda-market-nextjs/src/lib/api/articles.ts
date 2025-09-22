export interface BestArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  createdAt: string;
}

export interface Article {
  articles: BestArticle[];
  totalCount: number;
}

export interface ArticleFilters {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const articlesApi = {
  // 베스트 게시글 3개 가져오기
  getBestArticles: async (): Promise<BestArticle[]> => {
    try {
      const response = await fetch(`${API_URL}/best-articles`);
      if (!response.ok) {
        throw new Error("베스트 게시글 조회 실패");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // 게시글 목록 가져오기
  getArticles: async (params: ArticleFilters = {}): Promise<Article> => {
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
  },

  // getArticle: async (id: string): Promise<Article> => {
  //   try {
  //     const response = await fetch(`${API_URL}/articles/${id}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch article");
  //     }
  //     return response.json();
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // },
};
