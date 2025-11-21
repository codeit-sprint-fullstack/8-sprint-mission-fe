export interface Article {
  id: string;
  title: string;
  content: string;
  likeCount: number;
  createdAt: string;
}

export interface ArticleComment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
