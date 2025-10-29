import { cookieFetch } from "@/api/fetchClient";

const likeServiceBase = {
  async add(url) {
    try {
      return await cookieFetch(url, { method: "POST" });
    } catch (error) {
      console.error("좋아요 추가 오류:", error);
      throw error;
    }
  },

  async remove(url) {
    try {
      return await cookieFetch(url, { method: "DELETE" });
    } catch (error) {
      console.error("좋아요 취소 오류:", error);
      throw error;
    }
  },
};

export const useLikeService = (type) => {
  if (type === "product") {
    return {
      add: (id) => likeServiceBase.add(`/products/${id}/favorite`),
      remove: (id) => likeServiceBase.remove(`/products/${id}/favorite`),
      keyName: "favorite",
    };
  }

  if (type === "article") {
    return {
      add: (id) => likeServiceBase.add(`/articles/${id}/like`),
      remove: (id) => likeServiceBase.remove(`/articles/${id}/like`),
      keyName: "like",
    };
  }

  throw new Error(`지원하지 않는 타입입니다: ${type}`);
};
