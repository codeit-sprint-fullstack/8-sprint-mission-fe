import React from "react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/articles`;

// articles list get
export const fetchArticles = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오는데 실패했습니다.");
  }
  return await response.json();
};

// article get
export const fetchArticle = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오는데 실패했습니다.");
  }
  return await response.json();
};

// article post
export const addArticle = async (article) => {
  const newArticle = {
    title: article.title,
    content: article.content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newArticle),
  });

  if (!response.ok) {
    throw new Error("게시글을 추가하는데 실패했습니다.");
  }
};

// article patch
export const patchArticle = async ({ id, article }) => {
  const newArticle = {
    title: article.title,
    content: article.content,
    updatedAt: new Date().toISOString(),
  };

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newArticle),
  });

  if (!response.ok) {
    throw new Error("게시글을 추가하는데 실패했습니다.");
  }
};

// article delete
export const deleteArticle = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("게시글을 삭제하는데 실패했습니다.");
  }

  return true;
};
