"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import {
    getPostAndCommentsAPI,
    deletePostAPI,
    createCommentAPI,
    updateCommentAPI,
    deleteCommentAPI,
} from "../components/api";

export default function PostDetailPage() {
    const params = useParams();
    const router = useRouter();
    const postId = params?.id;

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);

    const fetchData = useCallback(async () => {
        if (!postId) return;
        try {
            setIsLoading(true);
            const data = await getPostAndCommentsAPI(postId);
            setPost(data.post);
            setComments(data.comments);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            alert("데이터를 불러오는 데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePostDelete = async () => {
        if (window.confirm("이 게시글을 삭제하시겠습니까?")) {
            try {
                await deletePostAPI(post.id);
                alert("게시글이 삭제되었습니다.");
                router.push("/board");
            } catch (error) {
                console.error("Failed to delete post:", error);
                alert("게시글 삭제에 실패했습니다.");
            }
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() === "") return;
        try {
            const createdComment = await createCommentAPI(post.id, {
                content: newComment,
            });
            setComments((prev) => [...prev, createdComment]);
            setNewComment("");
        } catch (error) {
            console.error("Failed to create comment:", error);
            alert("댓글 등록에 실패했습니다.");
        }
    };

    const handleCommentUpdate = async (commentId, data) => {
        try {
            await updateCommentAPI(commentId, data);
            setComments((prev) =>
                prev.map((c) =>
                    c.id === commentId
                        ? { ...c, ...data, createdAt: "방금 수정됨" }
                        : c
                )
            );
            alert("댓글이 수정되었습니다.");
        } catch (error) {
            console.error("Failed to update comment:", error);
            alert("댓글 수정에 실패했습니다.");
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await deleteCommentAPI(commentId);
            setComments((prev) => prev.filter((c) => c.id !== commentId));
            alert("댓글이 삭제되었습니다.");
        } catch (error) {
            console.error("Failed to delete comment:", error);
            alert("댓글 삭제에 실패했습니다.");
        }
    };

    if (isLoading || !postId) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen font-sans py-12">
            <div className="container mx-auto max-w-3xl bg-white p-8 rounded-lg shadow-sm">
                {/* Header (제목/작성자/메뉴/좋아요) */}
                <div className="border-b pb-4">
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {post.title}
                        </h1>
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsPostMenuOpen(!isPostMenuOpen)
                                }
                                className="p-1 text-gray-500 rounded-full hover:bg-gray-100"
                            >
                                <Image
                                    src="/img_ellipsis_icon.svg"
                                    alt="메뉴"
                                    width={24}
                                    height={24}
                                />
                            </button>
                            {isPostMenuOpen && (
                                <div className="absolute right-0 z-10 w-32 mt-1 bg-white border rounded-md shadow-lg">
                                    <button
                                        onClick={() =>
                                            router.push(`/write?id=${post.id}`)
                                        }
                                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                    >
                                        수정하기
                                    </button>
                                    <button
                                        onClick={handlePostDelete}
                                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                    >
                                        삭제하기
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span className="mx-2">·</span>
                        <span>{post.createdAt}</span>
                    </div>
                    <div className="flex items-center mt-3 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 w-fit">
                        <Image
                            src="/btn_heart_inactive.svg"
                            alt="좋아요"
                            width={20}
                            height={20}
                            className="mr-1.5"
                        />
                        <span>{post.likes}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="py-8 text-base text-gray-800 leading-relaxed">
                    {post.content}
                </div>

                {/* Comments */}
                <h2 className="text-lg font-semibold mb-4">댓글 달기</h2>
                <CommentForm
                    value={newComment}
                    onChange={setNewComment}
                    onSubmit={handleCommentSubmit}
                    disabled={newComment.trim() === ""}
                />
                <CommentList
                    comments={comments}
                    onUpdate={handleCommentUpdate}
                    onDelete={handleCommentDelete}
                />
            </div>
            <div className="text-center mt-8">
                <button
                    onClick={() => router.push("/board")}
                    className="px-8 py-3 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                    목록으로 돌아가기
                </button>
            </div>
        </div>
    );
}
