import React from "react";
import BoardItem from "./BoardItem";
import Button from "@/app/components/Button";
import Link from "next/link";

const BoardList = ({ posts }) => {
  console.log("posts => ", posts);
  return (
    <div>
      <div className="flex justify-between">
        <h1>게시글</h1>
        <Link href='/board/new'>
          <Button>글쓰기</Button>
        </Link>
      </div>
      <div className="flex gap-4">
        <input
          placeholder="검색할 상품을 입력해주세요"
          className="grow bg-gray-100 rounded-lg p-2"
        />
        <select className="px-10 border-1 rounded-lg border-gray-300">
          <option>최신 순</option>
          <option>좋아요 순</option>
        </select>
      </div>
      {posts.map((post) => (
        <BoardItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BoardList;
