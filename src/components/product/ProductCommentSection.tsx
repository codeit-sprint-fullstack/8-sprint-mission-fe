'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import DropdownMenu from '@/components/DropdownMenu';
import { useCommentSection } from '@/hooks/useCommentSection';

interface ProductCommentSectionProps {
  productId: number;
}

const ProductCommentSection = ({ productId }: ProductCommentSectionProps) => {
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
    isSubmitting,
    formatCreatedAt,
    handleSubmitComment,
    handleStartEdit,
    handleCancelEdit,
    handleUpdateComment,
  } = useCommentSection(productId, 'product');

  return (
    <div className="bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">문의하기</h3>

      {/* 댓글 작성 폼 */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="mb-4">
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              className="w-full px-6 py-4 rounded-lg resize-none bg-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              appearance="primary"
              disabled={!commentInput.trim() || isSubmitting}
              className="px-6 py-2"
            >
              {isSubmitting ? '등록 중...' : '댓글 등록'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">댓글을 작성하려면 로그인이 필요합니다.</p>
        </div>
      )}

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <Image
              src="/images/Img_inquiry_empty.png"
              alt="댓글 아이콘"
              width={174}
              height={137}
              className="mx-auto mb-4"
            />
            <p className="text-gray-500">아직 문의가 없어요</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Image src="/images/icon/ic_profile.svg" alt="프로필" width={16} height={16} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {comment.writer.nickname || '익명'}
                    </p>
                    <p className="text-xs text-gray-500">{formatCreatedAt(comment.createdAt)}</p>
                  </div>
                </div>

                {/* 메뉴 버튼 (작성자만) */}
                {user && comment.writer?.id === user.id ? (
                  <div className="relative">
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={commentMenuOpenId === comment.id}
                      onClick={() =>
                        setCommentMenuOpenId((prev) => (prev === comment.id ? null : comment.id))
                      }
                      className="p-1 rounded hover:bg-gray-50"
                    >
                      <Image src="/images/icon/ic_kebab.svg" alt="더보기" width={20} height={20} />
                    </button>
                    <DropdownMenu
                      open={commentMenuOpenId === comment.id}
                      onClose={() => setCommentMenuOpenId(null)}
                      type="comment"
                      commentId={comment.id}
                      onEdit={() => handleStartEdit(comment)}
                      onDeleted={() => {}}
                    />
                  </div>
                ) : null}
              </div>

              {/* 댓글 내용 */}
              {editingId === comment.id ? (
                <div className="ml-11">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="w-full p-3 rounded-lg resize-none bg-[var('--gray-100')] ring-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      onClick={() => handleUpdateComment(comment.id)}
                      appearance="primary"
                      className="px-4 py-1 text-sm"
                      disabled={!editingText.trim()}
                    >
                      수정
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      appearance="secondary"
                      className="px-4 py-1 text-sm"
                    >
                      취소
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="ml-11">
                  <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCommentSection;
