import React from "react";
import BoardDetail from "./BoardDetail";
import Comments from "@/app/components/comments";
import { API_BASE_URL } from "@/lib/api";

const BoardDetailPage = async ({ params }) => {
  const { id } = await params; 
  const res = await fetch(`${API_BASE_URL}/posts/${id}`);
  const post = await res.json();
  return (
    <div>
      <BoardDetail data={post} />
      <Comments id={id} />
    </div>
  );
};

export default BoardDetailPage;
