import React from "react";
import BoardDetail from "./BoardDetail";
import Comments from "@/app/components/comments";
import { API_BASE_URL } from "@/lib/api";
import { notFound } from "next/navigation";

const BoardDetailPage = async ({ params }) => {
  const { id } = await params;
  let post;
  try {
    const res = await fetch(`${API_BASE_URL}/posts/${id}`);

    if (!res.ok) notFound();

    post = await res.json();
  } catch (err) {
    console.err("fetch failed: ", err);
    return <>게시물 로드 중 문제가 발생했습니다.</>;
  }
  return (
    <div>
      <BoardDetail data={post} />
      <Comments id={id} />
    </div>
  );
};

export default BoardDetailPage;
