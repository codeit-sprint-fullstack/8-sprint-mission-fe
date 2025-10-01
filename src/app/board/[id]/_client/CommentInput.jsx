"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function CommentInput({ articleId }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [err, setErr] = useState("");
  const [isPending, startTransition] = useTransition();

  const disabled = content.trim().length === 0 || isPending;

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    const text = content.trim();

    if (!text) return;

    try {
      console.log("POST", `${API_BASE}/articles/${articleId}/comments`, {
        content: text,
      });

      const res = await fetch(`${API_BASE}/articles/${articleId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      if (!res.ok) {
        let serverMsg = "";
        try {
          const data = await res.json();
          serverMsg = data?.message || "";
        } catch {}
        const msg = serverMsg || `댓글 등록 실패 (HTTP ${res.status}). `;
        console.error(msg);
        setErr(msg);
        return;
      }

      setContent("");
      startTransition(() => router.refresh());
    } catch (e) {
      const msg = e?.message || "네트워크 오류로 댓글 등록에 실패했습니다.";
      console.error(e);
      setErr(msg);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요"
        rows={3}
        className="flex-1 resize-y bg-gray-100 rounded-md border-none  p-2 focus:outline-none focus:ring-2 focus:ring-[#3692FF]"
        aria-label="댓글 입력"
      />
      <button
        type="submit"
        disabled={disabled}
        className={`h-[42px] self-end rounded-md px-4 text-white ${
          disabled ? "bg-gray-300 cursor-not-allowed" : "bg-[#3692FF]"
        }`}
      >
        {isPending ? "등록 중..." : "등록"}
      </button>
      {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
    </form>
  );
}
