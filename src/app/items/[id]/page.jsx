"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ItemDetail from "@/components/Items/ItemDetail";
import CommentForm from "@/components/Comment/CommentForm";
import Comment from "@/components/Comment/Comment";
import NoneComment from "@/components/Comment/NoneComment";
import GoBackButton from "@/components/Button/GoBackButton";
import { fetchItemComments, addItemComment } from "@/api/comments.js";

const ItemDetailPage = () => {
  const { id } = useParams();
  const [commentList, setCommentList] = useState([]);

  // 댓글 목록 조회 API
  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await fetchItemComments(id);
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
      const newComment = await addItemComment(id, {
        content: comment,
      });

      const enrichedComment = {
        ...newComment,
        user_name: newComment.user_name || "테스트유저",
        createdAt: newComment.createdAt || new Date().toISOString(),
      };

      setCommentList((prev) => [enrichedComment, ...prev]);
    } catch (err) {
      console.error("상품 상세 페이지 댓글 등록 ERROR:", err);
    }
  };

  return (
    <div>
      <Header />

      <main>
        <ItemDetail />

        <CommentForm
          title="문의하기"
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
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

        <GoBackButton href="/items" />
      </main>

      <Footer />
    </div>
  );
};

export default ItemDetailPage;
