import React from 'react';
import Button from '@/components/Button';
import SearchAndSort from '@/components/SearchAndSort';
import ProductItem from '@/components/product/ProductItem';
import { useRouter } from 'next/navigation';

export default function ProductListSection({ items, searchTerm, setSearchTerm, sortBy, setSortBy }) {
  const router = useRouter();
  const handleProductClick = (id) => {
    router.push(`/items/${id}`);
  };

  const handleRegisterClick = () => {
    router.push('/items/edit');
  };

  return (
    <section className="bg-white py-12 border-t" style={{ borderColor: 'var(--gray-200)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--gray-900)' }}>
            판매 중인 상품
          </h2>
          <Button appearance="primary" className="text-sm" onClick={handleRegisterClick}>
            상품 등록하기
          </Button>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {items.map((item) => (
            <div key={item.id} onClick={() => handleProductClick(item.id)} style={{ cursor: 'pointer' }}>
              <ProductItem product={item} />
            </div>
          ))}
        </div>

        {items.length === 0 && (
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
              {searchTerm ? '검색 결과가 없습니다.' : '등록된 상품이 없습니다.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
