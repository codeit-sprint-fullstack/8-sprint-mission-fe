import axios from "axios";

export const api = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

api.interceptors.request.use((config) => {
  const t = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export async function signIn({ email, password }) {
  const { data } = await api.post("/auth/signIn", { email, password });
  return data;
}

export async function signUp({ email, nickname, password, passwordConfirmation }) {
  const { data } = await api.post("/auth/signUp", { email, nickname, password, passwordConfirmation });
  return data;
}

export async function getMe() {
  const { data } = await api.get("/users/me");
  return data;
}

export async function getProducts({ page = 1, pageSize = 12, orderBy = "recent", keyword } = {}) {
  const params = { page, pageSize, orderBy };
  if (keyword) params.keyword = keyword;
  const { data } = await api.get("/products", { params });
  return data;
}

export async function getProduct(productId) {
  const { data } = await api.get(`/products/${productId}`);
  return data;
}

export async function toggleFavorite(productId, isFavorite) {
  if (isFavorite) {
    const { data } = await api.delete(`/products/${productId}/favorite`);
    return data;
  } else {
    const { data } = await api.post(`/products/${productId}/favorite`);
    return data;
  }
}

export async function getComments(productId, { limit = 10, cursor } = {}) {
  const params = { limit };
  if (cursor != null) params.cursor = cursor;
  const { data } = await api.get(`/products/${productId}/comments`, { params });
  return data;
}

export async function createComment(productId, content) {
  const { data } = await api.post(`/products/${productId}/comments`, { content });
  return data;
}

export async function patchProduct(productId, payload) {
  const { data } = await api.patch(`/products/${productId}`, payload);
  return data;
}

export async function deleteProduct(productId) {
  const { data } = await api.delete(`/products/${productId}`);
  return data;
}

export async function deleteComment(commentId) {
  const { data } = await api.delete(`/comments/${commentId}`);
  return data;
}

export async function patchComment(commentId, content) {
  const { data } = await api.patch(`/comments/${commentId}`, { content });
  return data;
}