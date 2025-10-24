import { defaultFetch } from "@/lib/fetchClient";
// 인증 없이 테스트 하려고 defaultFetch로 변경함.
// 추후 다시 cookieFetch로 변경

const formDataFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const defaultOptions = {
    credentials: "include",
    cache: "no-store",
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (error) {
    console.error("formDataFetch JSON 오류:", error);
    return { status: response.status, ok: response.ok };
  }
};

export const userService = {
  getMe: () => defaultFetch("/users/me"),

  updateMe: (formData) =>
    formDataFetch("/users/me", {
      method: "PATCH",
      body: formData,
    }),

  updatePassword: (formData) =>
    formDataFetch("/users/me/password", {
      method: "PATCH",
      body: formData,
    }),

  getMyProducts: () => defaultFetch("/users/me/products"),

  getMyFavorites: () => defaultFetch("/users/me/favorites"),
};
