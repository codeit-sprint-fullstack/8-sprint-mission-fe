import { cookieFetch } from "@/api/fetchClient";

type LikeType = "product" | "article";

interface LikeService {
  add: (id: string | number) => Promise<Record<string, unknown>>;
  remove: (id: string | number) => Promise<Record<string, unknown>>;
  keyName: string;
}

const likeServiceBase = {
  async add(url: string): Promise<Record<string, unknown>> {
    try {
      return await cookieFetch(url, { method: "POST" });
    } catch (error) {
      console.error("좋아요 추가 오류:", error);
      throw error;
    }
  },

  async remove(url: string): Promise<Record<string, unknown>> {
    try {
      return await cookieFetch(url, { method: "DELETE" });
    } catch (error) {
      console.error("좋아요 취소 오류:", error);
      throw error;
    }
  },
};

export const useLikeService = (type: LikeType): LikeService => {
  if (type === "product") {
    return {
      add: (id: string | number) =>
        likeServiceBase.add(`/products/${id}/favorite`),
      remove: (id: string | number) =>
        likeServiceBase.remove(`/products/${id}/favorite`),
      keyName: "favorite",
    };
  }

  if (type === "article") {
    return {
      add: (id: string | number) => likeServiceBase.add(`/articles/${id}/like`),
      remove: (id: string | number) =>
        likeServiceBase.remove(`/articles/${id}/like`),
      keyName: "like",
    };
  }

  throw new Error(`지원하지 않는 타입입니다: ${type}`);
};
