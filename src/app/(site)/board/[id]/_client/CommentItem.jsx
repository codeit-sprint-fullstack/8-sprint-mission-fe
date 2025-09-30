"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

/** 상대시간 표기 */
function reltime(isoOrDate) {
  if (!isoOrDate) return "방금";
  const t = new Date(isoOrDate).getTime();
  const diff = (Date.now() - (isNaN(t) ? Date.now() : t)) / 1000;
  if (diff < 60) return "방금";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

function KebabMenu({ onEdit, onDelete, disabled }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        aria-label="댓글 메뉴"
        aria-haspopup="menu"
        aria-expanded={open}
        className="h-8 w-8 grid place-items-center rounded hover:bg-gray-100"
        onClick={() => setOpen((v) => !v)}
      >
        <Image src="/ic_kebab.png" alt="" width={20} height={20} />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-32 rounded-md border border-gray-200 bg-white py-1 shadow-sm">
          <button
            className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
            onClick={() => {
              setOpen(false);
              onEdit?.();
            }}
          >
            수정하기
          </button>
          <button
            className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
            onClick={() => {
              setOpen(false);
              onDelete?.();
            }}
            disabled={disabled}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

export default function CommentItem({ articleId, comment }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.content ?? "");
  const [err, setErr] = useState("");
  const [isPending, startTransition] = useTransition();

  async function onSave() {
    setErr("");
    try {
      const res = await fetch(
        `${API_BASE}/articles/${articleId}/comments/${comment.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text.trim() }),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "댓글 수정 실패");
      }
      setEditing(false);
      startTransition(() => router.refresh());
    } catch (e) {
      setErr(e.message);
    }
  }

  async function onDelete() {
    if (!confirm("이 댓글을 삭제할까요?")) return;
    setErr("");
    try {
      const res = await fetch(
        `${API_BASE}/articles/${articleId}/comments/${comment.id}`,
        { method: "DELETE" }
      );
      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "댓글 삭제 실패");
      }
      startTransition(() => router.refresh());
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <article className="relative  py-4 border-b border-gray-200 bg-white ">
      {!editing ? (
        <div className="mb-6 ">
          <p className="flex-1 min-w-0 whitespace-pre-wrap break-words text-[15px] leading-7 text-gray-800 pr-10">
            {comment.content}
          </p>
          <div className="absolute top-2 right-2">
            <KebabMenu
              onEdit={() => setEditing(true)}
              onDelete={onDelete}
              disabled={isPending}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full resize-y rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#3692FF]"
          />
          <div className="flex gap-2">
            <button
              className="rounded px-2 py-1 text-xs text-white bg-[#3692FF] disabled:opacity-50"
              onClick={onSave}
              disabled={isPending || text.trim().length === 0}
            >
              저장
            </button>
            <button
              className="rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
              onClick={() => {
                setText(comment.content ?? "");
                setEditing(false);
              }}
              disabled={isPending}
            >
              취소
            </button>
          </div>
        </div>
      )}

      {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
      <header className="mb-2 flex items-center gap-2 text-sm text-gray-600">
        <Image
          src="/defalut_avata.png"
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 rounded-full object-cover"
        />
        <span className="font-medium">{comment.author}</span>
        <span aria-hidden>·</span>
        <time dateTime={comment.createdAt || undefined}>
          {reltime(comment.createdAt)}
        </time>
      </header>
    </article>
  );
}
