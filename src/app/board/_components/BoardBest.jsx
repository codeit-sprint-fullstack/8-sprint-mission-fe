import React from "react";
import BestItem from "./BestItem";

const BoardBest = async () => {
  const res = await fetch(
    "http://localhost:4000/posts?_sort=likes&_order=asc&_limit=3"
  );
  const posts = await res.json();
  return (
    <div className="flex flex-1 gap-4">
      {posts.map((post) => (
        <BestItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BoardBest;
