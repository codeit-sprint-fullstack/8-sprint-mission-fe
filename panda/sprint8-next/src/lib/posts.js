const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000").replace(/\/$/, "");
const ARTICLES = `${API_BASE}/api/articles`;
const COMMENTS = `${API_BASE}/api/comments`;

const DEFAULT_IMAGE_URL = "/images/default-post.png";
const decorate = (post) => ({
  imageUrl: DEFAULT_IMAGE_URL,
  nickname: post.nickname ?? "user_0000",
  likes: typeof post.likes === "number" ? post.likes : 0,
  ...post,
});

async function json(url, init) {
  const res = await fetch(url, { cache: "no-store", headers: { "Content-Type": "application/json" }, ...init });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}


export async function getPosts({ page = 1, limit = 10, sort = "latest", keyword = "" } = {}) {
  const url = new URL(ARTICLES);
  const offset = (page - 1) * limit;
  url.searchParams.set("offset", String(offset));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("sort", sort === "latest" ? "recent" : "asc");
  if (keyword) url.searchParams.set("q", keyword);

  const data = await json(url.toString());
  const items = data?.items ?? [];
  return { ...data, items: items.map(decorate) };
}


export async function getBestPosts() {
  const url = new URL(ARTICLES);
  url.searchParams.set("offset", "0");
  url.searchParams.set("limit", "3");
  url.searchParams.set("sort", "recent");
  const data = await json(url.toString());
  const items = data?.items ?? [];
  return items.map(decorate);
}


export const getPost = (id) => json(`${ARTICLES}/${id}`).then(decorate);
export const getPostById = getPost;
export const createPost = (payload) => json(ARTICLES, { method: "POST", body: JSON.stringify(payload) });
export const updatePost = (id, payload) => json(`${ARTICLES}/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
export const deletePost = (id) => json(`${ARTICLES}/${id}`, { method: "DELETE" });

export const listComments = (postId, limit = 10) =>
  json(`${ARTICLES}/${postId}/comments?limit=${limit}`).then((d) => d?.items ?? []);
export const createComment = (postId, payload) =>
  json(`${ARTICLES}/${postId}/comments`, { method: "POST", body: JSON.stringify(payload) });
export const updateComment = (commentId, payload) =>
  json(`${COMMENTS}/${commentId}`, { method: "PATCH", body: JSON.stringify(payload) });
export const deleteComment = (commentId) => json(`${COMMENTS}/${commentId}`, { method: "DELETE" });
