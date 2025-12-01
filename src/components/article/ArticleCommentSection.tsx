'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import DropdownMenu from '@/components/DropdownMenu';
import { useCommentSection } from '@/hooks/useCommentSection';

interface CommentSectionProps {
  articleId: string;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const {
    user,
    isLoggedIn,
    comments,
    commentInput,
    setCommentInput,
    commentMenuOpenId,
    setCommentMenuOpenId,
    editingId,
    editingText,
    setEditingText,
    commentLoading,
    commentError,
    formatCreatedAt,
    handleSubmitComment,
    handleStartEdit,
    handleCancelEdit,
    handleUpdateComment,
  } = useCommentSection(articleId, 'article');

  return (
    <div>
      {/* 댓글 입력 */}
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-3" style={{ color: 'var(--gray-900)' }}>
          댓글쓰기
        </h2>
        {isLoggedIn ? (
          <>
            <form onSubmit={handleSubmitComment} className="flex gap-2 items-start">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="댓글을 입력하세요."
                className="flex-1 min-h-24 p-3 rounded-lg border text-sm"
                style={{
                  borderColor: 'var(--gray-200)',
                  backgroundColor: '#F7F7F9',
                  color: 'var(--gray-800)',
                }}
              />
              <Button
                type="submit"
                appearance="primary"
                className="min-w-[72px]"
                disabled={commentLoading || !commentInput.trim()}
              >
                등록
              </Button>
            </form>
            {commentError && (
              <p className="text-error mt-2 text-sm">댓글을 처리하는 중 오류가 발생했습니다.</p>
            )}
          </>
        ) : (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">댓글을 작성하려면 로그인이 필요합니다.</p>
          </div>
        )}
      </section>

      {/* 댓글 목록 */}
      <section className="mb-12">
        {commentLoading && comments.length === 0 ? (
          <div className="text-sm" style={{ color: 'var(--gray-500)' }}>
            댓글을 불러오는 중…
          </div>
        ) : comments.length === 0 ? (
          <div
            className="flex flex-col items-center gap-2 py-8 text-sm"
            style={{ color: 'var(--gray-500)' }}
          >
            <div className="rounded-full bg-gray-100 px-3 py-1">아직 댓글이 없어요</div>
            <div>지금 첫 댓글을 달아보세요!</div>
          </div>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li
                key={c.id}
                className="flex flex-col gap-5 p-4 rounded-lg border"
                style={{ borderColor: 'var(--gray-100)', backgroundColor: '#fcfcfc' }}
              >
                <div className="flex justify-between relative">
                  {editingId === c.id ? (
                    <div className="flex gap-2 items-start w-full">
                      <textarea
                        className="flex-1 min-h-20 p-2 rounded border text-sm"
                        style={{
                          borderColor: 'var(--gray-200)',
                          backgroundColor: '#FFFFFF',
                          color: 'var(--gray-800)',
                        }}
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        placeholder="댓글을 수정하세요."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleUpdateComment(String(c.id));
                          }
                        }}
                      />
                      <div className="flex flex-col gap-2">
                        <Button
                          type="button"
                          appearance="primary"
                          onClick={() => handleUpdateComment(String(c.id))}
                          disabled={commentLoading || !editingText.trim()}
                        >
                          수정
                        </Button>
                        <Button type="button" appearance="secondary" onClick={handleCancelEdit}>
                          취소
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm" style={{ color: 'var(--gray-800)' }}>
                      {c.content}
                    </p>
                  )}

                  {user && c.writer?.id === user.id ? (
                    <div className="relative">
                      <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={commentMenuOpenId === c.id}
                        onClick={() =>
                          setCommentMenuOpenId((prev) => (prev === c.id ? null : c.id))
                        }
                        className="p-1 rounded hover:bg-gray-50"
                      >
                        <Image
                          src="/images/icon/ic_kebab.svg"
                          alt="더보기"
                          width={20}
                          height={20}
                        />
                      </button>
                      <DropdownMenu
                        open={commentMenuOpenId === c.id}
                        onClose={() => setCommentMenuOpenId(null)}
                        type="comment"
                        commentId={c.id}
                        onEdit={() => handleStartEdit(c)}
                        onDeleted={() => {}}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center gap-5">
                  <Image src="/images/icon/ic_profile.svg" alt="작성자" width={40} height={40} />
                  <div className="flex flex-col mb-1">
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>
                      {c.writer?.nickname || '익명'}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--gray-400)' }}>
                      {formatCreatedAt(c.createdAt)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
