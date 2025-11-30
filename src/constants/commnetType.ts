export interface CommentRequest {
  content: string;
}

export interface CommentResponce {
  id: string;
  content: string;
  userId: string;
  userName: string;
  productId: string | null;
  articleId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
