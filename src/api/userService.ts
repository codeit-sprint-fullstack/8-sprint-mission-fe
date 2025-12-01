import { User } from "@/types/auth";
import { Product, Article, Favorite, Like } from "@/types/entities";
import { defaultFetch } from "@/api/fetchClient";
// 인증 없이 테스트 하려고 defaultFetch로 변경함.
// 추후 다시 cookieFetch로 변경

const formDataFetch = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const defaultOptions: RequestInit = {
    credentials: "include",
    cache: "no-store",
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  try {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return (await response.json()) as T;
    }

    return { status: response.status, ok: response.ok } as T;
  } catch (error) {
    console.error("formDataFetch JSON 오류:", error);
    throw new Error("Unexpected response type");
  }
};

export const userService = {
  getMe: (): Promise<User> => defaultFetch("/users/me"),

  updateMe: (formData: FormData): Promise<User> =>
    formDataFetch<User>("/users/me", {
      method: "PATCH",
      body: formData,
    }),

  updatePassword: (
    formData: FormData
  ): Promise<{ success: boolean; message?: string }> =>
    formDataFetch<{ success: boolean; message?: string }>(
      "/users/me/password",
      {
        method: "PATCH",
        body: formData,
      }
    ),

  getMyProducts: (): Promise<Product[]> =>
    defaultFetch<Product[]>("/users/me/products"),

  getMyArticles: (): Promise<Article[]> =>
    defaultFetch<Article[]>("/users/me/articles"),

  getMyFavorites: (): Promise<Favorite[]> =>
    defaultFetch<Favorite[]>("/users/me/favorites"),

  getMyLikes: (): Promise<Like[]> => defaultFetch<Like[]>("/users/me/likes"),
};
