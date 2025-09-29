import React from "react";
import BoardBest from "./BoardBest";
import BoardList from "./BoardList";

const Board = ({ posts }) => {
  return (
    <div>
      <BoardBest posts={posts.slice(0, 3)} />
      <BoardList posts={posts} />
    </div>
  );
};

export default Board;
