import Image from "next/image";
import Link from "next/link";
import React from "react";

const BoardItem = ({ post }) => {
  return (
    <Link href={`/board/${post.id}`} className="flex flex-col">
      <div className="flex justify-between">
        <div className="text-xl">{post.title}</div>
        <Image
          src={post.thumbnail}
          width={72}
          height={72}
          alt="go to DetailPage"
          className="border border-gray-200 rounded-md"
        />
      </div>
      <div className="flex justify-between mt-4 mb-6">
        <div className="flex items-center gap-2">
          <Image
            src="/profile-default.svg"
            width={24}
            height={24}
            alt="click likes"
          />
          <div>{post.author}</div>
          <div>{post.createdAt.split("T")[0].replace(/-/g, ".")}</div>
        </div>
        <div className="flex gap-1">
          <Image
            src="/icons/heart-inactive.svg"
            width={24}
            height={24}
            alt="click likes"
          />
          <div>{post.likes}</div>
        </div>
      </div>
      <hr className="border-t border-gray-200" />
    </Link>
  );
};

export default BoardItem;
