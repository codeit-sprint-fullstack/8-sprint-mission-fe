import { api } from './apiClient';
import { Product, ProductParams } from '@/types';

/**
 * 상품 목록 조회
 */
export const getProducts = async (params: ProductParams = {}): Promise<Product[]> => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.pageSize) searchParams.append('pageSize', params.pageSize.toString());
  if (params.orderBy) searchParams.append('orderBy', params.orderBy);
  if (params.keyword) searchParams.append('keyword', params.keyword);

  const response = (await api.get(`/products?${searchParams.toString()}`)) as {
    list?: Product[];
    products?: Product[];
  };
  return response?.list || response?.products || [];
};

/**
 * 베스트 상품 조회 (좋아요 많은 순)
 */
export const getBestProducts = async (): Promise<Product[]> => {
  const response = (await api.get('/products?orderBy=favorite&pageSize=4')) as {
    list?: Product[];
    products?: Product[];
  };
  return response?.list || response?.products || [];
};

/**
 * 상품 단건 조회
 */
export const getProduct = async (productId: number): Promise<Product> =>
  api.get(`/products/${productId}`) as Promise<Product>;

/**
 * 상품 등록
 */
export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  tags?: string[];
  images?: string[];
}): Promise<Product> => {
  return api.post('/products', productData, { auth: true }) as Promise<Product>;
};

/**
 * 상품 수정
 */
export const updateProduct = async (
  productId: number,
  productData: {
    name?: string;
    description?: string;
    price?: number;
    tags?: string[];
    images?: string[];
  },
): Promise<Product> => {
  return api.patch(`/products/${productId}`, productData, { auth: true }) as Promise<Product>;
};

/**
 * 상품 삭제
 */
export const deleteProduct = async (productId: number): Promise<void> => {
  await api.delete(`/products/${productId}`, { auth: true });
};

/**
 * 상품 좋아요 토글
 */
export const toggleProductFavorite = async (
  productId: number,
): Promise<{ isFavorite: boolean; favoriteCount: number }> => {
  return api.post(`/products/${productId}/favorite`, {}, { auth: true }) as Promise<{
    isFavorite: boolean;
    favoriteCount: number;
  }>;
};
