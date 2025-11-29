// Product 관련 타입 정의
export interface ProductCard {
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
  tags: string | number | Array<string | number> | null;
  removable?: boolean;
  onRemove?: (tag: string) => void;
}

export interface ProductDetail {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  favoriteCount: number;
  createdAt?: string;
  updatedAt?: string;
  nickname: string;
  isFavorite?: string;
}

export interface ProductCard {
  id: string;
  title: string;
  price: number;
  favoriteCount: number;
}

export interface ProductListControllerProps {
  controls?: {
    orderBy?: boolean;
  };
  products: ProductCard[];
  setSortedProducts: (items: ProductCard[]) => void;
}

export interface ProductCardProps {
  product: ProductCard;
  type?: "normal" | "best";
}

export interface BestProductSectionProps {
  bestProducts?: ProductCard[];
  loading?: boolean;
  error?: string | null;
}

// 게시글 관련 타입 정의
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

export interface ArticleCard {
  id: string;
  title: string;
  nickname: string;
  likeCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticleDetail extends ArticleCard {
  content: string;
  isLiked?: string;
}

export interface BestArticleProps {
  article: ArticleCard;
}

export interface ArticleProps {
  article: ArticleCard;
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
  bestArticles?: ArticleCard[];
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
  items: ProductCard[];
  loading: boolean;
  error: string | null;
  loadItems: (params?: UseLimitParams) => Promise<void>;
}

// 댓글 관련 타입 정의
export interface Comment {
  id: string;
  content: string;
  userId: string;
  nickname?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentItem {
  id: string;
  content: string;
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
