import React from "react";
import BestItem from "./BestItem";

const BoardBest = ({ posts }) => {
  console.log(posts);
  return (
    <div className="flex gap-6">
      {posts.map((post) => (
        <BestItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BoardBest;
