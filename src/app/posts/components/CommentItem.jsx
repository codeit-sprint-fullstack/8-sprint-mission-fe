"use client";

import { useState } from "react";
import Image from "next/image";

export default function CommentItem({ comment, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleUpdate = () => {
        if (editedContent.trim() === "") {
            alert("댓글 내용을 입력해주세요.");
            return;
        }
        onUpdate(comment.id, { content: editedContent });
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            onDelete(comment.id);
        }
    };

    return (
        <div className="py-4 border-b border-gray-200 last:border-b-0">
            {isEditing ? (
                <div>
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    <div className="flex justify-end mt-2 space-x-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded-md"
                        >
                            취소
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md"
                        >
                            저장
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-semibold">
                            {comment.author}
                        </p>
                        <p className="mt-1 text-gray-800">{comment.content}</p>
                        <p className="mt-1 text-xs text-gray-500">
                            {comment.createdAt}
                        </p>
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-1 text-gray-500 rounded-full hover:bg-gray-100"
                        >
                            <Image
                                src="/img_ellipsis_icon.svg"
                                alt="메뉴"
                                width={20}
                                height={20}
                            />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 z-10 w-32 mt-1 bg-white border rounded-md shadow-lg">
                                <button
                                    onClick={() => {
                                        setIsEditing(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                >
                                    수정하기
                                </button>
                                <button
                                    onClick={() => {
                                        handleDelete();
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                >
                                    삭제하기
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
