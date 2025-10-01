"use client";

import React, { useEffect, useState } from "react";
import Item from "./_components/Item";
import Button from "../Button";
import Image from "next/image";
import Link from "next/link";

const Comments = ({ id }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/comments?postId=${id}&_sort=-createdAt`
      );

      if (!res.ok) throw new Error("get failed: ", res.statusText);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const postComment = async () => {
    try {
      const res = await fetch(`http://localhost:4000/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: id,
          author: "Mia",
          profile: "/profile-default.svg",
          content: text,
          createdAt: new Date(),
        }),
      });

      if (!res.ok) throw new Error("post failed: ", res.statusText);
    } catch (err) {
      console.error(err);
    }
  };

  const patchComment = async (commentId, modifiedText) => {
    try {
      const res = await fetch(`http://localhost:4000/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: modifiedText,
        }),
      });

      if (!res.ok) throw new Error("patch failed: ", res.statusText);

      setComments((prevComments) =>
        prevComments.map((prevComment) =>
          prevComment.id === commentId
            ? { ...prevComment, content: modifiedText }
            : prevComment
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await fetch(`http://localhost:4000/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("delete failed: ", res.statusText);

      setComments((prevComments) =>
        prevComments.filter((prevComment) => prevComment.id !== commentId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <form className="flex flex-col">
        <label className="text-base font-semibold">댓글달기</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="댓글을 입력해주세요."
          className="bg-gray-100 resize-none p-4 rounded-lg mt-2 mb-5"
        />
        <div className="flex justify-end">
          <Button disabled={!text.trim()} onClick={postComment}>
            등록
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-6 mt-7 mb-16">
        {comments.length !== 0 ? (
          comments.map((comment) => (
            <Item
              key={comment.id}
              data={comment}
              onModify={patchComment}
              onDelete={deleteComment}
            />
          ))
        ) : (
          <Image
            src="/reply-empty.svg"
            alt="There is no reply yet"
            width={151}
            height={208}
          />
        )}
      </div>
      <Link
        href="/board"
        className="mx-auto w-fit flex gap-2 px-9 py-3 bg-blue-400 text-white rounded-full"
      >
        목록으로 돌아가기
        <Image
          src="/icons/ic_back.svg"
          alt="back to board page"
          width={24}
          height={24}
        />
      </Link>
    </div>
  );
};

export default Comments;
