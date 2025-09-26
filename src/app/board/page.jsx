import React from "react";
import Board from "./_components/Board";

const BoardPage = async () => {
  // TODO: 최초 데이터 패칭 -> Board에 데이터 전달
  const res = await fetch("http://localhost:4000/posts");
  const posts = await res.json();
  return (
    <div>
      <Board posts={posts} />
    </div>
  );
};

export default BoardPage;
