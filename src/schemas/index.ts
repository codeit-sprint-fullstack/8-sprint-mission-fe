import { z } from 'zod';

// ================== User Schemas ==================

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  nickname: z.string().min(1).max(50).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const updateUserSchema = z.object({
  nickname: z.string().min(1).max(50).optional(),
});

// ================== Auth Schemas ==================

export const signInSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 형식을 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export const signUpSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 형식을 입력해주세요.' }),
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }).max(50),
  password: z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
  passwordConfirmation: z.string().optional(),
}).refine(
  (data: { passwordConfirmation?: string; password: string }) => 
    !data.passwordConfirmation || data.password === data.passwordConfirmation, 
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  }
);

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

// ================== Auth Response Schemas ==================

export const signInResponseSchema = z.object({
  message: z.string().optional(),
  user: userSchema,
  refreshToken: z.string(),
});

export const signUpResponseSchema = z.object({
  message: z.string().optional(),
  user: userSchema.optional(),
});

export const refreshTokenResponseSchema = z.object({
  message: z.string().optional(),
  user: userSchema,
});

// ================== Product Schemas ==================

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().positive(),
  favoriteCount: z.number().int().nonnegative(),
  images: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
  ownerNickname: z.string().optional(),
  owner: userSchema.optional(),
  isFavorite: z.boolean().optional(),
  isLiked: z.boolean().optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(1, { message: '상품명을 입력해주세요.' }).max(50),
  description: z.string().max(500).optional(),
  price: z.number().positive({ message: '가격은 0보다 커야 합니다.' }),
  tags: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().max(500).optional(),
  price: z.number().positive().optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

export const productQuerySchema = z.object({
  page: z.number().int().positive().optional().default(1),
  pageSize: z.number().int().positive().optional().default(10),
  orderBy: z.enum(['recent', 'favorite', 'price']).optional().default('recent'),
  keyword: z.string().optional(),
  sort: z.enum(['recent', 'favorite', 'price']).optional(),
  limit: z.number().int().positive().optional(),
});

// ================== Product Response Schemas ==================

export const productsResponseSchema = z.object({
  products: z.array(productSchema).optional(),
  list: z.array(productSchema).optional(),
  totalCount: z.number().int().nonnegative().optional(),
});

export const productFavoriteResponseSchema = z.object({
  isLiked: z.boolean().optional(),
  favoriteCount: z.number().int().nonnegative(),
  message: z.string().optional(),
});

// ================== Article Schemas ==================

export const articleSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  image: z.string().optional(),
  favoriteCount: z.number().int().nonnegative(),
  viewCount: z.number().int().nonnegative().optional().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
  writer: userSchema,
  isFavorite: z.boolean().optional(),
  likes: z.number().int().nonnegative().optional(),
  isLiked: z.boolean().optional(),
});

export const createArticleSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }).max(100),
  content: z.string().min(1, { message: '내용을 입력해주세요.' }).max(2000),
  image: z.string().optional(),
});

export const updateArticleSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  content: z.string().min(1).max(2000).optional(),
  image: z.string().optional(),
});

export const articleQuerySchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().optional().default(10),
  sort: z.enum(['recent', 'favorite']).optional().default('recent'),
  search: z.string().optional().default(''),
});

// ================== Article Response Schemas ==================

export const articlesResponseSchema = z.object({
  articles: z.array(articleSchema).optional(),
  list: z.array(articleSchema).optional(),
  total: z.number().int().nonnegative().optional(),
  totalCount: z.number().int().nonnegative().optional(),
});

export const articleFavoriteResponseSchema = z.object({
  isLiked: z.boolean(),
  favoriteCount: z.number().int().nonnegative(),
  message: z.string().optional(),
});

// ================== Comment Schemas ==================

export const commentSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  writer: userSchema,
  user: userSchema.optional(),
  productId: z.string().uuid().nullable().optional(),
  articleId: z.string().uuid().nullable().optional(),
});

export const createCommentSchema = z.object({
  content: z.string().min(1, { message: '댓글 내용을 입력해주세요.' }).max(1000),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1, { message: '댓글 내용을 입력해주세요.' }).max(1000),
});

export const commentQuerySchema = z.object({
  limit: z.number().int().positive().optional().default(10),
  cursor: z.string().uuid().optional(),
});

// ================== Comment Response Schemas ==================

export const commentsResponseSchema = z.object({
  comments: z.array(commentSchema).optional(),
  list: z.array(commentSchema).optional(),
  totalCount: z.number().int().nonnegative().optional(),
});

// ================== Type Inference ==================

// User types
export type User = z.infer<typeof userSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;

// Auth types
export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
export type RefreshTokenData = z.infer<typeof refreshTokenSchema>;
export type SignInResponse = z.infer<typeof signInResponseSchema>;
export type SignUpResponse = z.infer<typeof signUpResponseSchema>;
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;

// Product types
export type Product = z.infer<typeof productSchema>;
export type CreateProductData = z.infer<typeof createProductSchema>;
export type UpdateProductData = z.infer<typeof updateProductSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
export type ProductFavoriteResponse = z.infer<typeof productFavoriteResponseSchema>;

// Article types
export type Article = z.infer<typeof articleSchema>;
export type CreateArticleData = z.infer<typeof createArticleSchema>;
export type UpdateArticleData = z.infer<typeof updateArticleSchema>;
export type ArticleQuery = z.infer<typeof articleQuerySchema>;
export type ArticlesResponse = z.infer<typeof articlesResponseSchema>;
export type ArticleFavoriteResponse = z.infer<typeof articleFavoriteResponseSchema>;

// Comment types
export type Comment = z.infer<typeof commentSchema>;
export type CreateCommentData = z.infer<typeof createCommentSchema>;
export type UpdateCommentData = z.infer<typeof updateCommentSchema>;
export type CommentQuery = z.infer<typeof commentQuerySchema>;
export type CommentsResponse = z.infer<typeof commentsResponseSchema>;
