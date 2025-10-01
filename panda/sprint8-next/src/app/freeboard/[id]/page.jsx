"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPostById, deletePost as deletePostApi } from "@/lib/posts";
import {
  getCommentsByPostId,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "@/lib/comments";

export default function FreeboardDetailPage() {
  const { id } = useParams();
  const postId = useMemo(() => (Array.isArray(id) ? id[0] : id), [id]);
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState("");

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState("");

  const [newComment, setNewComment] = useState("");
  const canSubmitComment = newComment.trim().length > 0;
  const [adding, setAdding] = useState(false);

  const [editingMap, setEditingMap] = useState({});
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  function normalizeComment(obj, fallback = {}) {
    const c = obj?.data ?? obj?.comment ?? obj ?? null;
    if (!c || typeof c !== "object") return null;
    return {
      id: c.id ?? fallback.id,
      content: c.content ?? fallback.content ?? "",
      createdAt: c.createdAt ?? fallback.createdAt ?? new Date().toISOString(),
      author: c.author ?? fallback.author ?? undefined,
    };
  }

  async function refreshComments() {
    setCommentsLoading(true);
    setCommentsError("");
    try {
      const c = await getCommentsByPostId(postId);
      setComments(Array.isArray(c) ? c : []);
    } catch {
      setCommentsError("댓글을 불러오지 못했습니다.");
    } finally {
      setCommentsLoading(false);
    }
  }

  useEffect(() => {
    if (!postId) return;
    let alive = true;

    async function load() {
      setPostLoading(true);
      setCommentsLoading(true);
      setPostError("");
      setCommentsError("");

      try {
        const [p, c] = await Promise.all([
          getPostById(postId),
          getCommentsByPostId(postId),
        ]);
        if (!alive) return;
        setPost(p ?? null);
        setComments(Array.isArray(c) ? c : []);
      } catch {
        if (!alive) return;
        setPostError("게시글을 불러오지 못했습니다.");
        setCommentsError("댓글을 불러오지 못했습니다.");
      } finally {
        if (!alive) return;
        setPostLoading(false);
        setCommentsLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [postId]);

  function timeAgo(iso) {
    if (!iso) return "";
    const diff = Math.max(0, Date.now() - new Date(iso).getTime());
    const s = Math.floor(diff / 1000);
    if (s < 60) return `${s}초 전`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}분 전`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}시간 전`;
    const d = Math.floor(h / 24);
    return `${d}일 전`;
  }

  async function handleDeletePost() {
    if (!postId) return;
    const ok = window.confirm("이 게시글을 삭제할까요?");
    if (!ok) return;
    try {
      await deletePostApi(postId);
      router.replace("/freeboard");
    } catch {
      alert("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  async function handleAddComment(e) {
    e?.preventDefault?.();
    if (!canSubmitComment || !postId || adding) return;

    const content = newComment.trim();
    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      content,
      createdAt: new Date().toISOString(),
      author: post?.author ? { nickname: post.author.nickname } : undefined,
    };

    setComments((cur) => [optimistic, ...cur]);
    setNewComment("");
    setAdding(true);

    try {
      const savedRaw = await createCommentApi(postId, { content });
      const saved = normalizeComment(savedRaw, optimistic);

      if (saved?.id) {
        setComments((cur) => cur.map((c) => (c.id === tempId ? saved : c)));
      } else {
        await refreshComments();
      }
    } catch {
      setComments((cur) => cur.filter((c) => c.id !== tempId));
      setNewComment(content);
      alert("댓글 등록에 실패했습니다.");
    } finally {
      setAdding(false);
    }
  }

  function startEditComment(commentId, initialContent = "") {
    setEditingMap((m) => ({ ...m, [commentId]: initialContent }));
  }
  function cancelEditComment(commentId) {
    setEditingMap((m) => {
      const next = { ...m };
      delete next[commentId];
      return next;
    });
  }
  async function saveEditComment(commentId) {
    const nextContent = (editingMap[commentId] ?? "").trim();
    if (!nextContent) {
      alert("내용을 입력해주세요.");
      return;
    }
    setUpdatingId(commentId);

    const prev = comments;
    const next = comments.map((c) =>
      c.id === commentId ? { ...c, content: nextContent } : c
    );
    setComments(next);

    try {
      const savedRaw = await updateCommentApi(postId, commentId, { content: nextContent });
      const saved = normalizeComment(savedRaw, next.find((x) => x.id === commentId));
      if (!saved?.id) {
        await refreshComments();
      }
      cancelEditComment(commentId);
    } catch {
      setComments(prev);
      alert("댓글 수정에 실패했습니다.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDeleteComment(commentId) {
    const ok = window.confirm("이 댓글을 삭제할까요?");
    if (!ok) return;

    setDeletingId(commentId);

    const prev = comments;
    setComments((cur) => cur.filter((c) => c.id !== commentId));

    try {
      await deleteCommentApi(postId, commentId);
    } catch {
      setComments(prev);
      alert("댓글 삭제에 실패했습니다.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main>
      <section className="mt-[34px]">
        <div className="mx-auto w-[1168px] flex items-start">
          <h1
            className="text-[#1F2937] text-[20px] font-bold leading-[32px] w-[1168px] max-w-[1168px] mr-2"
            style={{ wordBreak: "keep-all" }}
          >
            {post?.title ?? ""}
          </h1>

          <details className="relative ml-[8px]">
            <summary
              className="list-none cursor-pointer text-[#9CA3AF] leading-[0]"
              aria-label="게시글 메뉴 열기"
            >
              <img src="/images/ic-kebab.svg" alt="" className="w-[24px] h-[24px] align-middle" />
            </summary>

            <div className="absolute right-0 mt-2 border border-[#D1D5DB] bg-white rounded-[8px] shadow-sm overflow-hidden min-w-[139px]">
              <button
                type="button"
                onClick={() => router.push(`/freeboard/${postId}/edit`)}
                className="block w-[139px] h-[46px] flex items-center justify-center text-center text-[#6B7280] text-[16px] font-normal hover:bg-gray-50 rounded-t-[8px]"
              >
                수정하기
              </button>
              <button
                type="button"
                onClick={handleDeletePost}
                className="block w-[139px] h-[46px] flex items-center justify-center text-center text-[#6B7280] text-[16px] font-normal hover:bg-gray-50 rounded-b-[8px]"
              >
                삭제하기
              </button>
            </div>
          </details>
        </div>

        <div className="mx-auto w-[1168px] mt-4">
          <div className="flex items-center h-[40px]" style={{ width: "fit-content", minWidth: 0 }}>
            <img src="/images/ic-user.svg" alt="" className="w-6 h-6" />
            <span className="ml-4 text-[16px] font-normal text-[#6B7280]">
              {post?.author?.nickname ?? "사용자"}
            </span>
            <time className="ml-2 text-[16px] font-normal text-[#6B7280]">
              {post?.createdAt ? new Date(post.createdAt).toLocaleDateString("ko-KR") : ""}
            </time>
            <span className="ml-8 inline-block w-px h-[16px] bg-[#D1D5DB]" aria-hidden="true" />
            <div className="ml-8 flex items-center gap-2">
              <img src="/images/ic-heart.svg" alt="좋아요" className="w-5 h-5" />
              <span className="text-[16px] font-normal text-[#6B7280]">
                {post?.likeCount ?? post?.likesCount ?? 0}
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto w-[1200px] mt-4 h-0 border-t border-[#E5E7EB]" />

        <div className="mx-auto w-[1200px] mt-6">
          <p className="text-[#1F2937] text-[18px] font-normal leading-[26px]">{post?.title ?? ""}</p>
        </div>

        <div className="mx-auto w-[1200px] mt-8 mb-[40px]">
          <div className="text-[#111827] text-[16px] font-semibold">댓글달기</div>
          <form onSubmit={handleAddComment} className="mt-[9px] flex flex-col items-end">
            <textarea
              placeholder="댓글을 입력해주세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-[1200px] h-[104px] rounded-[12px] bg-[#F3F4F6] px-6 py-4 text-[16px] font-normal text-[#111827] placeholder:text-[#9CA3AF] placeholder:text-[16px] placeholder:font-normal outline-none resize-none"
            />
            <button
              type="submit"
              disabled={!canSubmitComment || adding}
              className="mt-4 self-end h-[42px] min-w-[74px] px-[23px] py-[12px] rounded-[12px] text-[#F3F4F6] text-[16px] font-semibold bg-[#3692ff] disabled:bg-[#9CA3AF] disabled:cursor-not-allowed"
            >
              등록
            </button>
          </form>
        </div>

        <div className="mx-auto w/[1200px] w-[1200px] mt-[40px]">
          {commentsLoading && <div className="text-sm text-[#9CA3AF] py-4">댓글을 불러오는 중…</div>}
          {!commentsLoading && commentsError && (
            <div className="text-sm text-red-500 py-4">{commentsError}</div>
          )}
          {!commentsLoading && !commentsError && comments.length === 0 && (
            <div className="text-sm text-[#9CA3AF] py-4">아직 댓글이 없습니다.</div>
          )}

          {!commentsLoading && !commentsError && comments.length > 0 && (
            <ul>
              {comments.map((c) => {
                const isEditing = editingMap[c.id] !== undefined;
                return (
                  <li key={c.id} className="w-[1200px] min-h-[100px] pb-4 border-b border-[#E5E7EB]">
                    <div className="flex items-start">
                      <div className="w-[1172px]">
                        {isEditing ? (
                          <textarea
                            value={editingMap[c.id]}
                            onChange={(e) =>
                              setEditingMap((m) => ({ ...m, [c.id]: e.target.value }))
                            }
                            className="w-full h-[56px] rounded-[8px] bg-white px-3 py-2 text-[14px] font-normal text-[#1F2937] outline-none resize-none leading-[24px]"
                          />
                        ) : (
                          <p className="m-0 text-[#1F2937] text-[14px] font-normal leading-[24px]">
                            {c.content}
                          </p>
                        )}
                      </div>

                      <details className="relative ml-[4px]">
                        <summary
                          className="list-none cursor-pointer text-[#9CA3AF] leading-[0]"
                          aria-label="댓글 메뉴 열기"
                        >
                          <img src="/images/ic-kebab.svg" alt="" className="w-[24px] h-[24px] align-middle" />
                        </summary>

                        <div className="absolute right-0 mt-2 border border-[#D1D5DB] bg-white rounded-[8px] shadow-sm overflow-hidden min-w-[139px]">
                          {isEditing ? (
                            <button
                              type="button"
                              onClick={() => saveEditComment(c.id)}
                              disabled={updatingId === c.id}
                              className="block w-[139px] h-[46px] flex items-center justify-center text-center text-[#6B7280] text-[16px] font-normal hover:bg-gray-50 rounded-t-[8px]"
                            >
                              저장하기
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => startEditComment(c.id, c.content)}
                              className="block w-[139px] h-[46px] flex items-center justify-center text-center text-[#6B7280] text-[16px] font-normal hover:bg-gray-50 rounded-t-[8px]"
                            >
                              수정하기
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              isEditing ? cancelEditComment(c.id) : handleDeleteComment(c.id)
                            }
                            disabled={deletingId === c.id}
                            className="block w-[139px] h-[46px] flex items-center justify-center text-center text-[#6B7280] text-[16px] font-normal hover:bg-gray-50 rounded-b-[8px]"
                          >
                            {isEditing ? "취소하기" : "삭제하기"}
                          </button>
                        </div>
                      </details>
                    </div>

                    <div className="mt-6 flex items-start">
                      <img src="/images/ic-user.svg" alt="" className="w-[32px] h-[32px]" />
                      <div className="ml-2 flex flex-col">
                        <span className="text-[#4B5563] text-[12px] font-normal">
                          {c.author?.nickname ?? "사용자"}
                        </span>
                        <time className="mt-1 text-[#9CA3AF] text-[12px] font-normal">
                          {timeAgo(c.createdAt)}
                        </time>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="mt-[64px] mx-[840px]">
          <button
            type="button"
            onClick={() => router.push("/freeboard")}
            className="
              w-[240px] h-[48px]
              rounded-[40px] bg-[#3692ff]
              flex items-center justify-center
              px-[64px] py-[12px] gap-2
              text-[#F3F4F6] text-[18px] font-semibold
              whitespace-nowrap
            "
          >
            <span>목록으로 돌아가기</span>
            <img
              src="/images/ic-back.svg"
              alt=""
              className="w-5 h-5"
            />
          </button>
        </div>

        <div className="h-[193px]" />
      </section>
    </main>
  );
}
