import React from "react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/article`;

export const fetchArticle = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오는데 실패했습니다.");
  }

  const data = await response.json();
  return data;
};
