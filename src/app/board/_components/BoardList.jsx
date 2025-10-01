"use client";

import React, { useEffect, useRef, useState } from "react";
import BoardItem from "./BoardItem";
import Button from "@/app/components/Button";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const sortParams =
        sort === "latest" ? "_sort=-createdAt" : "_sort=-likes";

      try {
        const res = await fetch(`${API_BASE_URL}/posts?${sortParams}`);

        if (!res.ok) throw new Error(`get failed: ${res.statusText}`);

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [sort]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">게시글</h1>
        <Link href="/board/new">
          <Button>글쓰기</Button>
        </Link>
      </div>
      <div className="flex gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색할 상품을 입력해주세요"
          className="grow bg-gray-100 rounded-lg px-4 py-3"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-10 border-1 rounded-lg border-gray-300"
        >
          <option value="latest">최신 순</option>
          <option value="likes">좋아요 순</option>
        </select>
      </div>
      {filteredPosts.map((post) => (
        <BoardItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BoardList;
