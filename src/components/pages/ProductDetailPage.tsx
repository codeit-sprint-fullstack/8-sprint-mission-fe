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
import { useAuth } from '@/providers/AuthProvider';
import { Product } from '@/types';

interface ProductDetailPageProps {
  productId: string;
}

const ProductDetailPage = ({ productId }: ProductDetailPageProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isLoggedIn = !!user;
  const currentUserId = user?.id;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const productData = await getProduct(productId);
        setProduct(productData);
      } catch (err) {
        setError((err as Error).message);
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
    const result = await toggleProductFavorite(productId);
    setProduct((prev) =>
      prev
        ? {
            ...prev,
            isFavorite: result.isFavorite,
            favoriteCount: result.favoriteCount,
          }
        : null,
    );
    return { isLiked: result.isFavorite, favoriteCount: result.favoriteCount };
  };

  const handleEdit = () => {
    router.push(`/items/edit/${productId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      alert('상품이 삭제되었습니다.');
      router.push('/items');
    } catch {
      alert('상품 삭제 중 오류가 발생했습니다.');
    }
    setIsDeleteModalOpen(false);
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

  const isOwner = currentUserId && currentUserId === product.owner?.id;
  const images = product.images || [];
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="pt-8 pb-16 flex flex-col justify-center">
      <section className="flex flex-row gap-6">
        <div className="relative w-[486px] h-[486px] rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200 flex-shrink-0 group">
          {images.length > 0 ? (
            <>
              <Image
                src={images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="486px"
                priority
              />
              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    aria-label="이전 이미지"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    aria-label="다음 이미지"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-white w-6'
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                        aria-label={`이미지 ${index + 1}로 이동`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              이미지 없음
            </div>
          )}
        </div>

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

            <div>
              <h2 className="text-base font-semibold mb-3">상품태그</h2>
              {product.tags && product.tags.length > 0 && (
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

            <div className="mt-8">
              <h2 className="text-base font-semibold mb-3">상품 소개</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm lg:text-[15px]">
                {product.description}
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 flex">
            <div className="w-full flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ring-1 ring-gray-300/60">
                <Image src="/images/icon/ic_profile.svg" alt="프로필" width={28} height={28} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium leading-none">
                  {product.ownerNickname || product.owner?.nickname}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="border-l border-[var(--gray-200)] pl-4">
              <FavoriteButton
                isLiked={product.isFavorite || false}
                count={product.favoriteCount}
                disabled={!isLoggedIn}
                onToggle={handleFavoriteToggle}
              />
            </div>
          </div>
        </div>
      </section>

      <ProductCommentSection productId={productId} />

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
