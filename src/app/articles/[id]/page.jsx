"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchComments, addComment } from "@/api/comments.js";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ArticleDatail from "@/components/Board/ArticleDetail";
import CommentForm from "@/components/Comment/CommentForm";
import Comment from "@/components/Comment/Comment";
import NoneComment from "@/components/Comment/NoneComment";
import GoBackButton from "@/components/Button/GoBackButton";

const freeboardIdPage = () => {
  const { id } = useParams();
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

  // 댓글 등록 API
  const handleAddComment = async (comment) => {
    try {
      const newComment = await addComment(id, {
        content: comment,
      });

      const enrichedComment = {
        ...newComment,
        nickname: newComment.nickname || "테스트유저",
        createdAt: newComment.createdAt || new Date().toISOString(),
      };

      setCommentList((prev) => [enrichedComment, ...prev]);
    } catch (err) {
      console.error("게시글 페이지 댓글 등록 ERROR:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        <ArticleDatail />

        <CommentForm
          title="댓글 달기"
          placeholder="댓글을 입력해주세요."
          onSubmit={handleAddComment}
        />

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

        <GoBackButton href="/articles" />
      </main>

      <Footer />
    </div>
  );
};

export default freeboardIdPage;
