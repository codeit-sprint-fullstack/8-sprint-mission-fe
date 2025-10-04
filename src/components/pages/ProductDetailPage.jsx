'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import ConfirmModal from '@/components/ConfirmModal';
import ProductCommentSection from '@/components/product/ProductCommentSection';
import { getProduct, deleteProduct, toggleProductFavorite } from '@/lib/productApi';
import FavoriteButton from '@/components/product/FavoriteButton';
import { getProductComments, createProductComment } from '@/lib/productCommentApi';
import { useAuth } from '@/providers/AuthProvider';

const ProductDetailPage = ({ productId }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isLoggedIn = !!user;
  const currentUserId = user?.id;

  // 가격 포맷팅 함수
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const [productData, commentsData] = await Promise.all([
          getProduct(productId),
          getProductComments(productId, { limit: 50 }),
        ]);

        setProduct(productData);
        setComments(commentsData.list || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const handleFavoriteToggle = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }
    const updated = await toggleProductFavorite(productId, product.isFavorite);
    setProduct((prev) => ({ ...prev, ...updated }));
    return updated;
  };

  const handleEdit = () => {
    router.push(`/items/edit/${productId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      alert('상품이 삭제되었습니다.');
      router.push('/items');
    } catch (err) {
      alert('상품 삭제 중 오류가 발생했습니다.');
    }
    setIsDeleteModalOpen(false);
  };

  const handleCommentSubmit = async (content) => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const newComment = await createProductComment(productId, { content });
      setComments([newComment, ...comments]);
    } catch (err) {
      alert('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  const handleCommentUpdate = (updatedComment) => {
    setComments(
      comments.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment)),
    );
  };

  const handleCommentDelete = (deletedCommentId) => {
    setComments(comments.filter((comment) => comment.id !== deletedCommentId));
  };

  const LoadingOrError = () => (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center py-16 bg-white">
        {loading && <p className="text-gray-500">상품 정보를 불러오는 중...</p>}
        {!loading && error && (
          <>
            <p className="text-red-500 font-medium">상품을 불러오는 중 오류가 발생했습니다.</p>
            <p className="text-gray-500 text-sm mt-2">{error}</p>
          </>
        )}
        {!loading && !error && <p className="text-gray-500">상품을 찾을 수 없습니다.</p>}
      </div>
    </div>
  );

  if (loading || error || !product) return <LoadingOrError />;

  const isOwner = currentUserId && currentUserId === product.ownerId;

  console.log('product', product);
  return (
    <div className="pt-8 pb-16 flex flex-col justify-center">
      <section className="flex flex-row gap-6">
        {/* 이미지 영역 */}
        <div className="relative w-[486px] aspect-square rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200">
          {product.images?.length ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              이미지 없음
            </div>
          )}
        </div>

        {/* 정보 영역 */}
        <div className="flex flex-col justify-between w-full max-w-[690px] min-h-full">
          {isOwner && isLoggedIn && (
            <div className="mt-6 flex gap-3">
              <Button onClick={handleEdit} appearance="secondary" className="flex-1 h-10 text-sm">
                수정하기
              </Button>
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                appearance="secondary"
                className="flex-1 h-10 text-sm bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
              >
                삭제하기
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-6">
            <div className="flex-1 min-w-0 border-b border-[var(--gray-200)] pb-4">
              <h1 className="text-2xl font-bold break-words">{product.name}</h1>
              <p className="text-3xl font-semibold mt-4">
                {formatPrice(product.price)}
                <span className="ml-1 text-xl font-medium">원</span>
              </p>
            </div>

            {/* 태그 */}
            <div>
              <h2 className="text-base font-semibold mb-3">상품태그</h2>
              {product.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-base font-medium tracking-wide"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 설명 */}
            <div className="mt-8">
              <h2 className="text-base font-semibold mb-3">상품 소개</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm lg:text-[15px]">
                {product.description}
              </p>
            </div>
          </div>

          {/* 판매자 */}
          <div className="mt-10 pt-6 flex">
            <div className="w-full flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ring-1 ring-gray-300/60">
                <Image src="/images/icon/ic_profile.svg" alt="프로필" width={28} height={28} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium leading-none">{product.ownerNickname}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* 좋아요 */}
            <div className="border-l border-[var(--gray-200)] pl-4">
              <FavoriteButton
                isFavorite={product.isFavorite}
                count={product.favoriteCount}
                disabled={!isLoggedIn}
                onToggle={async () => handleFavoriteToggle()}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 댓글 */}
      <ProductCommentSection
        comments={comments}
        onCommentSubmit={handleCommentSubmit}
        onCommentUpdate={handleCommentUpdate}
        onCommentDelete={handleCommentDelete}
        isLoggedIn={isLoggedIn}
        currentUserId={currentUserId}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="상품 삭제"
        message="정말로 이 상품을 삭제하시겠습니까? 삭제된 상품은 복구할 수 없습니다."
      />

      <Button as={Link} href="/items" className="mt-8 mx-auto !rounded-4xl" appearance="primary">
        목록으로 돌아가기
        <Image
          src="/images/icon/ic_return.svg"
          alt="돌아가기"
          width={16}
          height={16}
          className="ml-2"
        />
      </Button>
    </div>
  );
};

export default ProductDetailPage;
