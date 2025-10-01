"use client";

import ActionDropdown from "@/components/ActionDropdown";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BoardDetail = ({ data }) => {
  const router = useRouter();
  const handleModify = () => {
    router.push(
      `/board/new?id=${data.id}&title=${encodeURIComponent(
        data.title
      )}&content=${encodeURIComponent(
        data.content
      )}&author=${encodeURIComponent(data.author)}`
    );
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:4000/posts/${data.id}`, {
        method: "DELETE",
        // header 필요해? // 오답노트: 나중에 인가시에 필요
      });

      if (!res.ok) {
        alert("게시글 삭제에 실패했습니다.");
        console.error(res.statusText);
      }

      alert("삭제가 완료되었습니다.");
      router.push("/board");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="pt-2">
      <div className="flex justify-between">
        <div className="text-xl font-bold">{data.title}</div>
        <ActionDropdown onModify={handleModify} onDelete={handleDelete} />
      </div>
      <div className="flex items-center gap-8 my-4">
        <div className="flex items-center gap-4">
          <div>
            <Image
              src={data.profile}
              alt="writer image"
              width={40}
              height={40}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-lg text-gray-600">{data.author}</div>
            <div className="text-sm text-gray-500">
              {data.createdAt.split("T")[0].replace(/-/g, ". ")}
            </div>
          </div>
        </div>
        <div className="w-px h-6 bg-gray-200"></div>
        <div className="flex items-center gap-1 border  border-gray-300 rounded-full pl-2 pr-3 py-1 text-gray-500">
          <Image
            src="/icons/heart-inactive.svg"
            alt="Mark this post"
            width={24}
            height={24}
          />
          {data.likes}
        </div>
      </div>
      <hr className="border-t border-gray-200" />
      <div className="mt-6 mb-8 text-lg">{data.content}</div>
    </div>
  );
};

export default BoardDetail;
