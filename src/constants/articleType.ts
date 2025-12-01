export interface ArticleRequest {
  title: string;
  content: string;
  userName: string;
}

export interface ArticleResponse {
  id: string;
  title: string;
  content: string;
  favoriteCount: number;
  userId: string | null;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}
