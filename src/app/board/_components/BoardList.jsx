"use client";

import React, { useEffect, useRef, useState } from "react";
import BoardItem from "./BoardItem";
import Button from "@/app/components/Button";
import Link from "next/link";

const BoardList = () => {
  const [renderPosts, setRenderPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    const fetchData = async () => {
      const sortParams =
        sort === "latest"
          ? "_sort=createdAt&_order=desc"
          : "_sort=likes&_order=desc";
      const searchParams = search ? `&q=${search}` : "";

      try {
        const res = await fetch(
          `http://localhost:4000/posts?${sortParams}${searchParams}`
        );

        if (!res.ok) {
          throw new Error("response error: ", res.statusText);
        }

        const data = await res.json();
        setRenderPosts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [search, sort]);

  return (
    <div>
      <div className="flex justify-between">
        <h1>게시글</h1>
        <Link href="/board/new">
          <Button>글쓰기</Button>
        </Link>
      </div>
      <div className="flex gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색할 상품을 입력해주세요"
          className="grow bg-gray-100 rounded-lg p-2"
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
      {renderPosts.map((post) => (
        <BoardItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BoardList;
