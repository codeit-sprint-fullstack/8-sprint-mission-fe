"use client";
import { deleteComment } from "@/api/fetchComment";
import KebabMenu from "@/app/(components)/atoms/KebabMenu";
import ProfileIcon from "@/app/(components)/atoms/ProfileIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const CommentList = ({ content, name, date, id, postId }) => {
  const queryClient = useQueryClient();
  const {
    mutate: mutateDeleteComment,
    isPending: isDelete,
    error: deleteErr,
  } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.error("댓글 삭제 중 오류 발생: ", error);
      alert("댓글을 삭제하는데 실패했습니다.");
    },
  });

  const handleDelete = () => {
    mutateDeleteComment({ id, postId });

    alert("댓글 삭제완료");
  };

  // 몇시간 전인지 계산
  const timeAgo = (isoString) => {
    const now = new Date();
    const past = new Date(isoString);
    const diff = (now - past) / 1000; // 초 단위 차이

    if (diff < 60) {
      return `${Math.floor(diff)}초 전`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)}분 전`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)}시간 전`;
    } else if (diff < 2592000) {
      return `${Math.floor(diff / 86400)}일 전`;
    } else if (diff < 31536000) {
      return `${Math.floor(diff / 2592000)}달 전`;
    } else {
      return `${Math.floor(diff / 31536000)}년 전`;
    }
  };

  return (
    <div className="w-full bg-gray-50 border-b border-gray-200 p-3 mb-6">
      <div className="w-full flex items-center justify-between mb-6">
        <p className="text-sm text-gray-800">{content}</p>
        <KebabMenu handleDelete={handleDelete} />
      </div>
      <div className="flex gap-2">
        <ProfileIcon size="32" />
        <div className="flex flex-col gap-1 text-xs">
          <span className="text-gray-600">{name}</span>
          <span className="text-gray-400">{timeAgo(date)}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
