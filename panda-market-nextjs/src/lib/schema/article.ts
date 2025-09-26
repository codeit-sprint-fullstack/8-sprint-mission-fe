import z from "zod";

export const articleSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목을 입력해주세요." })
    .max(100, { message: "제목은 100자 이내로 입력해주세요." }),
  content: z
    .string()
    .min(2, { message: "2자 이상 입력해주세요." })
    .max(1000, { message: "내용은 1000자 이내로 입력해주세요." }),
});

export type ArticleSchema = z.infer<typeof articleSchema>;
