"use client";

import React, { useState } from "react";
import Image from "next/image";
import KebabMenu from "../Kebab/KebabMenu";
import { updateComment } from "@/api/comments";
import type { CommentItem, CommentProps } from "@/types/entities";

const Comment = ({ comment, onDelete, onUpdate }: CommentProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(comment.content);

  const handleSave = async () => {
    try {
      const updated = await updateComment(comment.id, {
        content: editedContent,
      });
      const enrichedComment: CommentItem = {
        ...updated,
        nickname: comment.nickname || "테스트유저",
      };

      onUpdate(enrichedComment);
      setIsEditing(false);
    } catch (err) {
      console.error("댓글 수정 실패:", err);
    }
  };

  const isFormValid = editedContent.trim() !== "";

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  const getDisplayedTime = () => {
    if (comment.updatedAt) return getTimeAgo(comment.updatedAt);
    return getTimeAgo(comment.createdAt);
  };

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={editedContent}
            placeholder="댓글을 수정해주세요."
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-[104px] px-4 py-2 rounded rounded-xl bg-gray-100 focus:outline-none text-gray-900"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSave}
              className={`px-4 py-2 text-white rounded whitespace-nowrap cursor-pointer ${
                isFormValid
                  ? "bg-[#3692FF] cursor-pointer hover:underline"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              저장
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 rounded whitespace-nowrap cursor-pointer"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="relative mb-3">
          <div className="flex flex-col font-normal">
            <p className="mb-6 text-sm text-gray-800 leading-6">
              {comment.content}
            </p>
            <div className="flex items-start gap-2">
              <Image
                src="/ic_profile.svg"
                alt="Profile"
                width={32}
                height={32}
                className="cursor-pointer"
              />
              <div className="flex flex-col items-start gap-1 text-xs leading-[18px]">
                <p className="text-gray-600">{comment.nickname}</p>
                <p className="text-gray-400">{getDisplayedTime()}</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0">
            <KebabMenu
              type="comment"
              id={comment.id}
              onDelete={onDelete}
              onEdit={() => setIsEditing(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
