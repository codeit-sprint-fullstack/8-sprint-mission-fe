export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  ownerId: number;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductList {
  list: Product[];
  totalCount: number;
}

export interface ProductFilters {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "favorite";
  keyword?: string;
}

const CODEIT_API_URL = process.env.NEXT_PUBLIC_CODEIT_API_URL;

/**
 * 상품 목록 가져오기
 * @param params ProductFilters 검색 조건
 * @returns ProductList
 */
const getProducts = async (
  params: ProductFilters = {}
): Promise<ProductList> => {
  try {
    const { page, pageSize, orderBy, keyword } = params;

    const searchParams = new URLSearchParams({
      page: page?.toString() || "1",
      pageSize: pageSize?.toString() || "10",
      orderBy: orderBy || "recent",
    });

    if (keyword) {
      searchParams.set("keyword", keyword);
    }

    const response = await fetch(`${CODEIT_API_URL}/products?${searchParams}`);
    if (!response.ok) {
      throw new Error("상품 조회 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 상품 상세 조회
 * @param id 상품 ID
 * @returns Product
 */
const getProductDetail = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${CODEIT_API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("상품 상세 조회 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const itemsApi = {
  getProducts,
  getProductDetail,
};
