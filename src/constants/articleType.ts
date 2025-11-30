export interface ArticleRequest {
  title: string;
  content: string;
  userName: string;
  favoriteCount: number;
}

export interface ArticleResponse {
  id: string;
  title: string;
  content: string;
  userName: string;
  favoriteCount: number;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
