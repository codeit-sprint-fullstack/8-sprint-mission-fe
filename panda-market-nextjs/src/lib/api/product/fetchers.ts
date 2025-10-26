import { fetchWithAuth } from "../auth/fetchers";
import { ProductSchema } from "@/lib/schema/product";

export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  tags: Array<{ id: string; name: string }>;
  images: Array<{ image: { url: string } }>;
  ownerId?: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
  user?: {
    id: string;
    nickname: string;
    image: string | null;
  };
}

export interface ProductList {
  products: Product[];
  totalCount: number;
}

export interface ProductFilters {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

    const response = await fetch(`${API_URL}/products?${searchParams}`);
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
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response || !response.ok) {
      throw new Error("상품 상세 조회 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 상품 수정
 * @param id 상품 ID
 * @param product 상품 데이터
 * @returns Product
 */
const updateProduct = async (
  id: string,
  product: ProductSchema
): Promise<Product> => {
  try {
    const response = await fetchWithAuth(`${API_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response?.ok) {
      throw new Error("상품 수정 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 상품 삭제
 * @param id 상품 ID
 * @returns Product
 */
const deleteProduct = async (id: string): Promise<Product> => {
  try {
    const response = await fetchWithAuth(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response?.ok) {
      throw new Error("상품 삭제 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 상품 생성
 * @param product 상품 데이터
 * @returns Product
 */
const createProduct = async (product: ProductSchema): Promise<Product> => {
  try {
    const response = await fetchWithAuth(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response?.ok) {
      throw new Error("상품 생성 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 상품 좋아요 토글
 * @param productId 상품 ID
 * @returns Product
 */
const addFavorite = async (productId: string): Promise<Product> => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetchWithAuth(
      `${API_URL}/products/${productId}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response?.ok) {
      throw new Error("상품 좋아요 추가 실패");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 상품 좋아요 삭제
 * @param id 상품 ID
 * @returns Product
 */
const deleteFavorite = async (productId: string): Promise<Product> => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetchWithAuth(
      `${API_URL}/products/${productId}/like`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response?.ok) {
      throw new Error("상품 좋아요 삭제 실패");
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
  createProduct,
  updateProduct,
  deleteProduct,
  addFavorite,
  deleteFavorite,
};
