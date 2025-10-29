'use client';
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { getProducts, getBestProducts } from '@/lib/productApi';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts(params);
      setProducts(data || []);
      return data;
    } catch (err) {
      setError(err);
      console.error('상품 목록 로드 실패:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBestProducts = useCallback(async () => {
    try {
      setError(null);
      const data = await getBestProducts();
      setBestProducts(data || []);
      return data;
    } catch (err) {
      setError(err);
      console.error('베스트 상품 로드 실패:', err);
      throw err;
    }
  }, []);

  const value = useMemo(
    () => ({
      products,
      bestProducts,
      loading,
      error,
      getProducts: fetchProducts,
      getBestProducts: fetchBestProducts,
    }),
    [products, bestProducts, loading, error, fetchProducts, fetchBestProducts],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
