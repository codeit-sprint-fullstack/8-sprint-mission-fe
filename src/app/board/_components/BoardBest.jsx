import React from "react";
import BestItem from "./BestItem";
import { API_BASE_URL } from "@/lib/api";

const BoardBest = async () => {
  const res = await fetch(
    `${API_BASE_URL}/posts?_sort=likes&_order=asc&_limit=3`
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
