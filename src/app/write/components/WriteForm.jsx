"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    createPostAPI,
    updatePostAPI,
    getPostDetailsAPI,
} from "../../posts/components/api";
import WriteField from "./WriteField";

export default function WriteForm() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    // 수정인지 작성인지 확인
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (!id) {
            setLoading(false);
            return;
        }
        getPostDetailsAPI(id)
            .then((data) => {
                setTitle(data.title || "");
                setContent(data.content || "");
            })
            .finally(() => setLoading(false));
    }, []);

    const isEditing = useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        return Boolean(params.get("id"));
    }, []);

    const isFormValid = title.trim() !== "" && content.trim() !== "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid || isLoading) return;
        setIsLoading(true);
        try {
            if (isEditing) {
                const id = new URLSearchParams(window.location.search).get(
                    "id"
                );
                const updated = await updatePostAPI(id, { title, content });
                router.push(`/posts/${updated.id}`);
            } else {
                const created = await createPostAPI({ title, content });
                router.push(`/posts/${created.id}`);
            }
        } catch (err) {
            console.error(err);
            alert("오류가 발생했습니다. 다시 시도해주세요.");
            setIsLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-8 pb-4">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {isEditing ? "게시글 수정" : "게시글 쓰기"}
                        </h1>
                        <button
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            className="px-6 py-2 rounded-lg font-semibold text-white transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-300 bg-[#3692ff] hover:bg-[#2a81e8]"
                        >
                            {isLoading
                                ? "처리 중..."
                                : isEditing
                                ? "수정"
                                : "등록"}
                        </button>
                    </div>

                    <WriteField
                        id="title"
                        label="제목"
                        required
                        value={title}
                        onChange={setTitle}
                        placeholder="제목을 입력해주세요."
                    />

                    <WriteField
                        id="content"
                        label="내용"
                        required
                        value={content}
                        onChange={setContent}
                        placeholder="내용을 입력해주세요."
                        textarea
                    />
                </form>
            </div>
        </div>
    );
}
