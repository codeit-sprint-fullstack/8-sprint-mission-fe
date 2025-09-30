"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [initialTitle, setInitialTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const res = await fetch(`${API_BASE}/articles/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // API 스키마에 맞게 필드 매핑
        const title = data?.title ?? data?.name ?? "";
        const content = data?.content ?? data?.body ?? "";

        if (alive) {
          setInitialTitle(title);
          setInitialContent(content);
        }
      } catch (e) {
        if (alive) setErr(e?.message || "게시글을 불러오지 못했습니다.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) return <div className="px-[22.5rem] py-8">불러오는 중…</div>;
  if (err) return <div className="px-[22.5rem] py-8 text-red-600">{err}</div>;

  return (
    <div className="px-[22.5rem] py-8">
      <PostForm
        mode="edit"
        postId={id}
        initialTitle={initialTitle}
        initialContent={initialContent}
      />
    </div>
  );
}
