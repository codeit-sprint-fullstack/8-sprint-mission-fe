// Product 관련 타입 정의
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

export interface ItemTagProps {
  tags: string | Array<string> | null;
  removable?: boolean;
  onRemove?: (tag: string) => void;
}

export interface ProductDetail extends Product {
  nickname: string;
  isFavorite?: string;
}

export interface ProductCardProps {
  product: Product;
  type?: "normal" | "best";
}

export interface BestProductSectionProps {
  bestProducts?: Product[];
  loading?: boolean;
  error?: string | null;
}

export interface ProductFormInitialData {
  images?: string[];
  title?: string;
  description?: string;
  price?: string;
  tags?: string[];
}

export interface SubmitPayload {
  title: string;
  description: string;
  price: number;
  tags?: string[];
  images?: string[];
}

export interface ProductFormProps {
  initialData?: ProductFormInitialData;
  onSubmit: (data: SubmitPayload) => void | Promise<void>;
  mode?: "create" | "edit";
}

// 게시글 관련 타입 정의
export interface Article {
  id: string;
  title: string;
  content: string;
  image: string[];
  nickname?: string;
  likeCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticleInput {
  title: string;
  content: string;
  images?: string[];
}

export interface ArticleCardProps extends Article {
  nickname?: string;
}

export interface ArticleDetail extends ArticleCardProps {
  content: string;
  isLiked?: string;
}

export interface BestArticleProps {
  article: ArticleCardProps;
}

export interface ArticleProps {
  article: ArticleCardProps;
}

export interface ArticleFormProps {
  initialData?: {
    title?: string;
    content?: string;
  };
  onSubmit: (data: { title: string; content: string }) => void;
  mode?: "create" | "edit";
}

export interface BestArticleSectionProps {
  bestArticles?: ArticleCardProps[];
  loading?: boolean;
  error?: string | null;
}

// 페이지네이션 및 데이터 패칭 관련 타입 정의
export interface UseLimitParams {
  page?: number;
  limit?: number;
  search?: string;
  order?: "newest" | "oldest" | "like";
}

export interface UseCursorParams {
  cursor?: string;
  limit?: number;
  search?: string;
  order?: "newest" | "oldest" | "like";
}

export interface UseResult {
  items: Product[];
  loading: boolean;
  error: string | null;
  loadItems: (params?: UseLimitParams) => Promise<void>;
}

// 댓글 관련 타입 정의
export interface CommentItem {
  id: string;
  content: string;
  userId?: string;
  nickname?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CommentProps {
  comment: CommentItem;
  onDelete: (id: string) => void;
  onUpdate: (updated: CommentItem) => void;
}

export interface CommentFormProps {
  title: string;
  placeholder: string;
  onSubmit: (comment: string) => Promise<void> | void;
}

// 좋아요 및 찜 관련 타입 정의
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
