'use client';
import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { getProducts, getBestProducts } from '@/lib/productApi';
import { Product, ProductParams } from '@/types';

interface ProductContextValue {
  products: Product[];
  bestProducts: Product[];
  loading: boolean;
  error: Error | null;
  getProducts: (params?: ProductParams) => Promise<Product[] | undefined>;
  getBestProducts: () => Promise<Product[] | undefined>;
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bestProducts, setBestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async (params: ProductParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts(params);
      setProducts(data || []);
      return data;
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error('상품 목록 로드 실패:', error);
      throw error;
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
      const error = err as Error;
      setError(error);
      console.error('베스트 상품 로드 실패:', error);
      throw error;
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
