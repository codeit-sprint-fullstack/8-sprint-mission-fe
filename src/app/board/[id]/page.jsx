import React from "react";
import BoardDetail from "./BoardDetail";
import Comments from "@/app/components/comments";

const BoardDetailPage = async ({ params }) => {
  const { id } = await params; 
  const res = await fetch(`http://localhost:4000/posts/${id}`);
  const post = await res.json();
  return (
    <div>
      <BoardDetail data={post} />
      <Comments id={id} />
    </div>
  );
};

export default BoardDetailPage;
