"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  getProduct,
  getComments,
  toggleFavorite,
  createComment,
  deleteProduct,
  patchProduct, // reserved for edit UI
  deleteComment,
  patchComment,
  getMe,
} from "@/lib/api";
import ConfirmModal from "@/components/ConfirmModal";
import Modal from "@/components/Modal";

export default function ItemDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = useMemo(() => params?.itemId, [params]);
  const qc = useQueryClient();

  // guard
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (!token) router.replace("/login");
  }, [router]);

  // product detail
  const { data: product, isLoading: loadingProduct, isError: errorProduct } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });

  // current user
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
    enabled: typeof window !== "undefined" && !!localStorage.getItem("accessToken"),
    staleTime: 60_000,
  });

  // comments (infinite)
  const {
    data: commentPages,
    isLoading: loadingComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", productId],
    queryFn: ({ pageParam }) => getComments(productId, { limit: 10, cursor: pageParam }),
    getNextPageParam: (last) => last?.nextCursor ?? null,
    enabled: !!productId,
  });
  const comments = commentPages?.pages.flatMap((p) => p.list) ?? [];

  // favorite
  const favMut = useMutation({
    mutationFn: () => toggleFavorite(productId, product?.isFavorite),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["product", productId] });
    },
  });

  // create comment
  const [commentInput, setCommentInput] = useState("");
  const createCommentMut = useMutation({
    mutationFn: () => createComment(productId, commentInput.trim()),
    onSuccess: () => {
      setCommentInput("");
      qc.invalidateQueries({ queryKey: ["comments", productId] });
    },
    onError: () => setFail({ open: true, msg: "댓글 등록에 실패했어요." }),
  });

  // edit/delete comment
  const [editingMap, setEditingMap] = useState({});
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const patchCommentMut = useMutation({
    mutationFn: ({ id, content }) => patchComment(id, content),
    onSuccess: () => {
      setUpdatingId(null);
      setEditingMap((m) => {
        const n = { ...m };
        if (updatingId != null) delete n[updatingId];
        return n;
      });
      qc.invalidateQueries({ queryKey: ["comments", productId] });
    },
    onError: () => {
      setUpdatingId(null);
      setFail({ open: true, msg: "댓글 수정에 실패했어요." });
    },
  });

  // product delete
  const [confirm, setConfirm] = useState(false);
  const delMut = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      setConfirm(false);
      router.replace("/items");
    },
    onError: () => setFail({ open: true, msg: "삭제에 실패했어요." }),
  });

  // dropdown, modal
  const [ddOpen, setDdOpen] = useState(false);
  const [fail, setFail] = useState({ open: false, msg: "" });

  const isOwner = me?.id && product?.ownerId && me.id === product.ownerId;

  // time ago
  const timeAgo = (iso) => {
    try {
      const d = new Date(iso);
      const diff = (Date.now() - d.getTime()) / 1000;
      if (diff < 60) return "방금 전";
      const m = Math.floor(diff / 60);
      if (m < 60) return `${m}분 전`;
      const h = Math.floor(m / 60);
      if (h < 24) return `${h}시간 전`;
      const day = Math.floor(h / 24);
      if (day < 7) return `${day}일 전`;
      return d.toISOString().slice(0, 10).replaceAll("-", ".");
    } catch {
      return "";
    }
  };

  const startEditComment = (id, content) => {
    setEditingMap((m) => ({ ...m, [id]: content }));
  };

  const saveEditComment = (id) => {
    const content = (editingMap[id] ?? "").trim();
    if (!content) return;
    setUpdatingId(id);
    patchCommentMut.mutate({ id, content });
  };

  const cancelEditComment = (id) => {
    setEditingMap((m) => {
      const n = { ...m };
      delete n[id];
      return n;
    });
  };

  const handleDeleteComment = async (id) => {
    setDeletingId(id);
    try {
      await deleteComment(id);
      qc.invalidateQueries({ queryKey: ["comments", productId] });
    } catch {
      setFail({ open: true, msg: "댓글 삭제에 실패했어요." });
    } finally {
      setDeletingId(null);
    }
  };

  if (loadingProduct) {
    return <main className="mt-6 mx-auto px-[360px]">로딩 중…</main>;
  }
  if (errorProduct || !product) {
    return (
      <main className="mt-6 mx-auto px-[360px]">
        <p className="text-red-600">상품 정보를 불러오지 못했습니다.</p>
        <div className="px-[840px] mt-6 mb-[277px]">
          <button
            onClick={() => router.replace("/items")}
            className="rounded-md bg-gray-900 text-white px-4 py-2"
          >
            목록으로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="mt-6 mx-auto px-[360px]">
        {/* 상단: 이미지(좌) + 상세(우) */}
        <section className="flex flex-col md:flex-row gap-6">
          {/* 좌: 이미지 */}
          <div className="md:w-1/2">
            {product?.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-auto rounded-[8px] object-cover"
              />
            ) : (
              <div className="w-full aspect-[4/3] rounded-[8px] bg-gray-100" />
            )}
          </div>

          {/* 우: 텍스트/액션 */}
          <div className="md:w-1/2">
            {/* 제목/가격/케밥 */}
            <div className="flex items-start">
              <div>
                <h1 className="text-[28px] font-bold leading-tight">{product.name}</h1>
                <p className="mt-2 text-[24px] font-semibold leading-tight">
                  {Number(product.price).toLocaleString()}원
                </p>
              </div>

              <div className="ml-auto relative">
                {isOwner && (
                  <button
                    aria-label="더보기"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-50"
                    onClick={() => setDdOpen((v) => !v)}
                  >
                    <img src="/images/ic-kebab.svg" alt="" className="h-6 w-6" />
                  </button>
                )}
                {isOwner && ddOpen && (
                  <div className="absolute right-0 mt-2 w-[144px] rounded-[8px] border border-[#E5E7EB] bg-white shadow py-2 z-[10]">
                    <button
                      className="block w-full px-4 py-2 text-left text-[14px] leading-[18px] hover:bg-[#F3F4F6]"
                      onClick={() => {
                        setDdOpen(false);
                        setFail({ open: true, msg: "수정 UI는 이후 단계에서 제공됩니다." });
                      }}
                    >
                      수정하기
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left text-[14px] leading-[18px] text-red-600 hover:bg-[#FEE2E2]"
                      onClick={() => {
                        setDdOpen(false);
                        setConfirm(true);
                      }}
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 가격 아래 16px: 행 전체 구분선(케밥 끝까지) */}
            <div className="mt-4 h-px w-full bg-[#E5E7EB]" />

            {/* 상품 소개 */}
            <div className="mt-6">
              <h3 className="text-[16px] font-semibold text-[#1F2937]">상품 소개</h3>
              <p className="mt-4 whitespace-pre-line text-[#4B5563]">
                {product?.description || "상품 설명이 없습니다."}
              </p>
            </div>

            {/* 태그 */}
            <div className="mt-6">
              <h3 className="text-[16px] font-semibold text-[#1F2937]">상품 태그</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {(product?.tags ?? []).length ? (
                  product.tags.map((t, i) => (
                    <span
                      key={`${t}-${i}`}
                      className="inline-flex h-8 items-center rounded-full bg-[#F3F4F6] px-3 text-[14px] text-[#6B7280]"
                    >
                      #{t}
                    </span>
                  ))
                ) : (
                  <span className="text-[#9CA3AF] text-[14px]">태그가 없습니다.</span>
                )}
              </div>
            </div>

            {/* 업로더 정보 + 좋아요 */}
            <div className="mt-[62px] flex items-center">
              {/* 업로더 */}
              <div className="flex items-center gap-3">
                <img
                  src={product?.ownerImage || "/images/ic-profile.svg"}
                  alt=""
                  className="h-9 w-9 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-[14px] text-[#4B5563]">
                    {product?.ownerNickname || "판매자"}
                  </span>
                  <time className="mt-1 text-[#9CA3AF] text-[14px] font-normal">
                    {product?.createdAt
                      ? new Date(product.createdAt).toISOString().slice(0, 10).replaceAll("-", ".")
                      : ""}
                  </time>
                </div>
              </div>

              {/* 자동여백 → 세로 구분선 */}
              <div className="ml-auto h-6 w-px bg-[#E5E7EB]" />

              {/* 좋아요 버튼 (구분선에서 24px) */}
              <button
                onClick={() => favMut.mutate()}
                disabled={favMut.isPending}
                title={product?.isFavorite ? "좋아요 취소" : "좋아요"}
                className="ml-6 inline-flex items-center gap-1 h-[40px] rounded-[35px] border border-gray-300 px-[12px] py-[4px] text-[14px] leading-[20px] bg-white"
              >
                <img src="/images/ic-heart.svg" alt="" className="w-4 h-4" />
                <span>{Number(product?.favoriteCount ?? 0).toLocaleString()}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 상단 블록 아래 40px 구분선 */}
        <div className="mt-10 h-px bg-[#E5E7EB]" />

        {/* 문의하기 */}
        <section className="mt-10">
          <h2 className="text-[18px] font-semibold">문의하기</h2>

          <div className="mt-[9px]">
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              className="w-[1200px] h-[104px] rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] text-[16px] font-normal leading-[24px] text-[#9CA3AF] outline-none resize-none"
            />
          </div>

          <div className="mt-4 w-[1200px] flex justify-end">
            <button
              onClick={() => commentInput.trim() && createCommentMut.mutate()}
              disabled={createCommentMut.isPending || !commentInput.trim()}
              className={`h-[42px] rounded-[8px] px-[16px] text-[14px] font-semibold leading-[18px] text-white ${
                commentInput.trim() ? "bg-[#3692ff]" : "bg-[#111827] opacity-50"
              }`}
            >
              등록
            </button>
          </div>

          {/* 버튼 아래 바로 구분선 */}
          <div className="h-px bg-[#E5E7EB]" />
        </section>

        {/* 댓글 리스트 (자유게시판 스타일) */}
        <section className="mt-6 mb-10">
          <ul>
            {comments.map((c) => {
              const isEditing = editingMap[c.id] !== undefined;
              return (
                <li
                  key={c.id}
                  className="w-[1200px] min-h-[100px] pb-4 border-b border-[#E5E7EB]"
                >
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
                        <img
                          src="/images/ic-kebab.svg"
                          alt=""
                          className="w-[24px] h-[24px] align-middle"
                        />
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
                        {c?.writer?.nickname ?? "사용자"}
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

          {hasNextPage && (
            <div className="mt-3">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="h-[40px] rounded-[8px] border border-[#E5E7EB] px-4 text-[14px]"
              >
                {isFetchingNextPage ? "불러오는 중…" : "더 보기"}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* 하단 돌아가기 버튼 (자유게시판 스타일/경로 /items) */}
      <div className="mt-[64px] mx-[840px] mb-[277px]">
        <button
          type="button"
          onClick={() => router.push("/items")}
          className="w-[240px] h-[48px] rounded-[40px] bg-[#3692ff] flex items-center justify-center px-[64px] py-[12px] gap-2 text-[#F3F4F6] text-[18px] font-semibold whitespace-nowrap"
        >
          <span>목록으로 돌아가기</span>
          <img src="/images/ic-back.svg" alt="" className="w-5 h-5" />
        </button>
      </div>

      <ConfirmModal
        open={confirm}
        title="삭제 확인"
        message="정말 이 상품을 삭제하시겠어요?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={() => delMut.mutate()}
        onCancel={() => setConfirm(false)}
      />
      <Modal
        open={fail.open}
        message={fail.msg}
        onClose={() => setFail({ open: false, msg: "" })}
      />
    </>
  );
}
