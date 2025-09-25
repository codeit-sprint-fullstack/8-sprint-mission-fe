"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchComments, addComment, updateComment } from "@/api/comments.js";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BoardId from "@/components/Board/BoardId";
import Comment from "@/components/Comment/Comment";
import NoneComment from "@/components/Comment/NoneComment";

const freeboardIdPage = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  // 댓글 목록 조회 API
  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await fetchComments(id);
        setCommentList(data);
      } catch (err) {
        console.error(err);
      }
    };
    getComments();
  }, [id]);

  const isFormValid = comment.trim() !== "";

  // 댓글 등록 API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const newComment = await addComment(id, {
        content: comment,
      });

      const enrichedComment = {
        ...newComment,
        user_name: newComment.user_name || "테스트유저",
        createdAt: newComment.createdAt || new Date().toISOString(),
      };

      setCommentList((prev) => [enrichedComment, ...prev]);
      setComment("");
    } catch (err) {
      console.error("댓글 등록 ERROR:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-[1200px]">
        <BoardId />

        <form className="flex flex-col items-end gap-4 mb-10">
          <div className="flex flex-col justify-center items-start self-stretch">
            <h1 className="text-base font-semibold text-[#111827] leading-[26px] mb-[9px]">
              댓글 달기
            </h1>
            <textarea
              value={comment}
              placeholder="댓글을 입력해주세요."
              onChange={(e) => setComment(e.target.value)}
              className="items-start w-full h-[104px] px-6 py-4 rounded-xl bg-gray-100 focus:border-gray-400 focus:outline-none placeholder-[#9CA3AF] text-black"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`flex justify-center items-center bg-[#9CA3AF] rounded-lg w-[88px] h-12 px-[23px] py-3 text-base text-[#F3F4F6] whitespace-nowrap ${
              isFormValid
                ? "bg-[#3692FF] cursor-pointer hover:underline"
                : "bg-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            등록
          </button>
        </form>

        {commentList.length === 0 ? (
          <NoneComment />
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {(commentList ?? []).slice(0, 4).map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onDelete={(id) =>
                  setCommentList((prev) =>
                    prev.filter((comment) => comment.id !== id)
                  )
                }
                //onDelete prop drilling(freeboardIdPage → Comment → KebabMenu). 추후 수정
                onUpdate={(updatedComment) =>
                  setCommentList((prev) =>
                    prev.map((c) =>
                      c.id === updatedComment.id ? updatedComment : c
                    )
                  )
                }
                //onUpdate prop drilling(freeboardIdPage → Comment → KebabMenu). 추후 수정
              />
            ))}
          </div>
        )}

        <Link
          href="/freeboard"
          className="flex justify-center items-center mt-16"
        >
          <div className="flex justify-center items-center w-60 h-12 px-16 py-3 gap-2 bg-[#3692FF] rounded-[40px]">
            <p className="text-lg font-semibold text-[#F3F4F6] leading-none text-nowrap">
              목록으로 돌아가기
            </p>
            <Image
              src="/ic_back.svg"
              alt="Back Arrow"
              width={24}
              height={24}
              className="self-center"
            />
          </div>
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default freeboardIdPage;
