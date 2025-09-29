import Image from "next/image";
import Link from "next/link";
import React from "react";

const BestItem = ({ post }) => {
  const isoString = post.createdAt;
  const date = new Date(isoString);
  const formatted = `${date.getFullYear()}. 
  ${(date.getMonth() + 1).toString().padStart(2, "0")}. 
  ${date.getDate().toString().padStart(2, "0")}`;
  return (
    <Link
      href={`/board/${post.id}`}
      className="rounded-lg bg-gray-200 px-6 pb-3 min-w-80"
    >
      <Image src="/images/badge.svg" alt="" width={102} height={123} />
      <div className="flex justify-between mt-4 mb-10">
        <div>{post.title}</div>
        <Image
          src={post.thumbnail}
          alt="post thumbnail"
          width={72}
          height={72}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div>{post.author}</div>
          <div className="flex gap-1">
            <Image
              src="/icons/heart-inactive.svg"
              alt="Mark this post"
              width={16}
              height={16}
            />
            {post.likes}
          </div>
        </div>
        <div>{formatted}</div>
      </div>
    </Link>
  );
};

export default BestItem;
