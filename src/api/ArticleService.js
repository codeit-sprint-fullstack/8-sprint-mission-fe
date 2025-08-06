import { requestThen, baseURL } from './request.js';

export async function getArticleList({ page, pageSize, keyword } = {}) {
  const url = new URL('articles', baseURL);
  if (page) url.searchParams.append("page", page);
  if (pageSize) url.searchParams.append("pageSize", pageSize);
  if (keyword) url.searchParams.append("keyword", keyword);

  return requestThen(url, { method: "GET" }, "Failed to get articles");
}

export async function getArticle(articleId) {
  if (typeof articleId !== "number" || !Number.isFinite(articleId)) {
    throw new Error("Invalid article ID");
  }

  const url = new URL(`articles/${articleId}`, baseURL);
  
  return requestThen(
    url,
    { method: "GET" },
    "Failed to get article"
  );
}

export async function createArticle({ title, content, image } = {}) {
  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  return requestThen(
    new URL('articles', baseURL),
    {
      method: 'POST',
      body: JSON.stringify({ title, content, image }),
      headers: { "Content-Type": "application/json" },
    },
    "Failed to create article"
  );
}

export async function patchArticle(articleId, { title, content, image } = {}) {
  if (typeof articleId !== "number" || !Number.isFinite(articleId)) {
    throw new Error("Invalid article ID");
  }

  const url = new URL(`articles/${articleId}`, baseURL);

  return requestThen(
    url,
    {
      method: "PATCH",
      body: JSON.stringify({ title, content, image }),
      headers: { "Content-Type": "application/json" },
    },
    "Failed to patch article"
  );
}

export async function deleteArticle(articleId) {
  if (typeof articleId !== "number" || !Number.isFinite(articleId)) {
    throw new Error("Invalid article ID");
  }

  const url = new URL(`articles/${articleId}`, baseURL);

  return requestThen(
    url,
    {
      method: "DELETE",
    },
    "Failed to delete article"
  );
}

