import Image from "next/image";
import Link from "next/link";
import React from "react";

const BoardItem = ({ post }) => {
  return (
    <Link href={`/board/${post.id}`} className="flex flex-col">
      <div className="flex justify-between">
        <div>{post.title}</div>
        <Image
          src={post.thumbnail}
          width={50}
          height={50}
          alt="go to DetailPage"
        />
      </div>
      <div>
        <div className="flex justify-between">
          <div>{post.author}</div>
          <div>{post.createdAt}</div>
        </div>
        <Image
          src="/heart-inactive.svg"
          width={10}
          height={10}
          alt="click likes"
        />
        <div>{post.likes}</div>
      </div>
    </Link>
  );
};

export default BoardItem;
