'use client';
// 임시페이지 디자인예정
import React, { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductItem from '@/components/product/ProductItem';
import SearchAndSort from '@/components/SearchAndSort';

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    setDebouncedSearchTerm(searchTerm);
    setPage(1); // 검색 시 첫 페이지로 리셋
  }, [searchTerm]);

  // 정렬 변경 시 첫 페이지로 리셋
  useEffect(() => {
    setPage(1);
  }, [sortBy]);

  const { data, isLoading, error } = useProducts({
    page,
    pageSize: 10,
    orderBy: sortBy,
    keyword: debouncedSearchTerm || undefined,
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-red-500">상품을 불러오는 중 오류가 발생했습니다.</p>
          <p className="text-gray-500 text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">상품 목록</h1>
        <p className="text-gray-600">다양한 상품들을 둘러보세요</p>
      </div>

      <SearchAndSort
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        placeholder="검색할 상품을 입력해주세요"
        sortOptions={[
          { value: 'recent', label: '최신순' },
          { value: 'favorite', label: '인기순' },
        ]}
      />

      {isLoading && page === 1 ? (
        <div className="text-center py-12">로딩 중...</div>
      ) : data?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {data.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>

          {/* 더보기 버튼 또는 페이지네이션 정보 */}
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-4">
              총 {data?.length}개 중 {data?.length<10?data?.length:'10'}개 표시
            </div>
            {data.length < data.totalCount && (
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '로딩 중...' : '더보기'}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-24 w-24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m2 2v4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">상품이 없습니다</h3>
          <p className="text-gray-500">
            {debouncedSearchTerm ? '검색 결과가 없습니다.' : '등록된 상품이 없습니다.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
