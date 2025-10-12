"use client";

import { useTransition } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function DeleteButton({ id }) {
  const [pending, startTransition] = useTransition();

  async function onDelete() {
    if (!confirm("게시글을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${API_BASE}/articles/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("삭제 실패");
      window.location.href = "/board";
    } catch (e) {
      alert("삭제 중 오류가 발생했습니다.");
      console.error(e);
    }
  }

  return (
    <button
      onClick={() => startTransition(onDelete)}
      className="inline-flex h-9 items-center rounded-md bg-gray-800 px-3 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "삭제 중..." : "삭제하기"}
    </button>
  );
}
