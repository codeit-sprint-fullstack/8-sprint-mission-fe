"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "@/api/fetchComment";

const CommentInput = ({ postId }) => {
  const [btnAble, setBtnAble] = useState(false);
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();
  const {
    mutate: mutateAddComment,
    isPending,
    error,
  } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.error("댓글 추가 중 오류 발생:", error);
      alert("댓글을 추가하는데 실패했습니다.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    mutateAddComment({ postId, content });
    setContent("");

    alert("댓글 작성완료");
  };

  useEffect(() => {
    if (content !== "") {
      setBtnAble(true);
    }
  }, [content]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="comment" className="mb-2 font-semibold text-gray-900">
        댓글달기
      </label>
      <textarea
        name="comment"
        id="comment"
        placeholder="댓글을 입력해주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-26 py-4 px-6 mb-4 resize-none bg-gray-100 rounded-xl"
      ></textarea>
      <div className="flex justify-end w-full">
        <Button isAble={btnAble} type="submit">
          등록
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
