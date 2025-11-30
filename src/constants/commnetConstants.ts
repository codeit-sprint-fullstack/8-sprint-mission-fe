export interface CommentResponce {
    id: string;
    content: string;
    userId: string;
    userName: string;
    createdAt: Date;
    updatedAt: Date;
    productId: string | null;
    articleId: string | null;
}