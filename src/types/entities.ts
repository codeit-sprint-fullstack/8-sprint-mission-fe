export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  favoriteCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductInput {
  title: string;
  price: number;
  description: string;
  tags: string[];
  images: string[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  image: string[];
  likeCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticleInput {
  title: string;
  content: string;
  images: string[];
}

export interface UseLimitParams {
  page?: number;
  limit?: number;
  search?: string;
  order?: string;
}

export interface UseCursorParams {
  cursor?: string;
  limit?: number;
  search?: string;
  order?: string;
}

export interface UseResult {
  items: Product[];
  loading: boolean;
  error: string | null;
  loadItems: (params?: UseLimitParams) => Promise<void>;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  nickname?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  id: string;
  type: "product";
  productId: string;
  userId: string;
}

export interface Like {
  id: string;
  type: "article";
  articleId: string;
  userId: string;
}
