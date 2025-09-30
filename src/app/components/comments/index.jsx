"use client";

import React, { useEffect, useState } from "react";
import Item from "./_components/Item";
import Button from "../Button";
import Image from "next/image";

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

  const deleteComment = () => {};

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <form className="flex flex-col">
        <label>댓글달기</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="댓글을 입력해주세요."
          className="bg-gray-100 resize-none p-4 rounded-lg mt-2 mb-4"
        />
        <div className="flex justify-end">
          <Button disabled={!text.trim()} onClick={postComment}>
            등록
          </Button>
        </div>
      </form>
      {comments.length !== 0 ? (
        comments.map((comment) => <Item key={comment.id} data={comment} />)
      ) : (
        <Image
          src="/reply-empty.svg"
          alt="There is no reply yet"
          width={151}
          height={208}
        />
      )}
    </div>
  );
};

export default Comments;
