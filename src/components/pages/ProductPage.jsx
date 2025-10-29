'use client';
import React, { useEffect, useState } from 'react';
import BestProductSection from '@/components/product/BestSection';
import ProductListSection from '@/components/product/ListSection';
import { useProducts } from '@/providers/ProductProvider';

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'favorite'

  const { products, bestProducts, getProducts, getBestProducts } = useProducts();

  // 베스트 상품 최초 로드
  useEffect(() => {
    getBestProducts();
  }, [getBestProducts]);

  useEffect(() => {
    getProducts({ page: 1, limit: 20, sort: sortBy, search: searchTerm }).catch((e) => {
      console.error('상품 목록 로드 실패', e);
    });
  }, [searchTerm, sortBy, getProducts]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-50)' }}>
      <BestProductSection items={bestProducts} />
      <ProductListSection
        items={products}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
}
