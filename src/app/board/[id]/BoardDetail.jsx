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
    <div>
      <div className="flex justify-between">
        <div>{data.title}</div>
        <ActionDropdown onModify={handleModify} onDelete={handleDelete} />
      </div>
      <div className="flex items-center gap-8">
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
            <div>{data.author}</div>
            <div>{data.createdAt}</div>
          </div>
        </div>
        <div className="w-px h-6 bg-gray-200"></div>
        <div>{data.likes}</div>
      </div>
      <hr className="border-t border-gray-200" />
      <div>{data.content}</div>
    </div>
  );
};

export default BoardDetail;
