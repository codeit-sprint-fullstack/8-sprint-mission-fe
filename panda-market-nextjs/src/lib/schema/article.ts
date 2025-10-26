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
  images: z
    .array(z.string())
    .max(3, { message: "이미지는 최대 3개까지 업로드할 수 있습니다." }),
});

export type ArticleSchema = z.infer<typeof articleSchema>;
