"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostForm({
  // 작성 페이지 수정 페이지에 따른 POST, PATCH  구분
  mode = "create", // "create" | "edit"
  postId = null, // 수정 모드에서 필요
  initialTitle = "", // 수정 모드에서 서버 값 주입
  initialContent = "", // 수정 모드에서 서버 값 주입
}) {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const isEdit = mode === "edit" || Boolean(postId);
  // 수정 모드에서 초기값 주입(클라이언트 전환 시 보정)
  useEffect(() => {
    if (mode === "edit") {
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [mode, initialTitle, initialContent]);

  const isValid = useMemo(
    () => title.trim().length > 0 && content.trim().length > 0,
    [title, content]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      if (mode === "create") {
        const res = await fetch(`${BASE_URL}/articles`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            content: content.trim(),
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const id = data?.id ?? data?._id;
        router.push(`/board/${id}`);
      } else {
        const res = await fetch(`${BASE_URL}/articles/${postId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            content: content.trim(),
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        router.push(`/board/${postId}`);
      }
    } catch (err) {
      console.error(err);
      setError("요청 처리 중 문제가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">
          {isEdit ? "게시글 수정" : "게시글 쓰기"}
        </h1>
        <button
          type="submit"
          disabled={!isValid || submitting}
          className={`w-[8.125rem] h-[2.625rem] rounded-[12px] px-4 text-white transition-colors
            ${
              !isValid || submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {isEdit
            ? submitting
              ? "수정 중..."
              : "수정"
            : submitting
            ? "등록 중..."
            : "등록"}
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">*제목</label>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-[12px] bg-[#F3F4F6] border-none focus:outline-none focus:ring-0 px-4 py-3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">*내용</label>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full rounded-[12px] bg-[#F3F4F6] border-none focus:outline-none focus:ring-0 px-4 py-3 resize-y"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
