export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  favoriteCount: number;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  image: string[];
  likeCount: number;
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
