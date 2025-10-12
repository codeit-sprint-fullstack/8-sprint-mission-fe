import z from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, { message: "상품명을 입력해주세요." })
    .max(100, { message: "상품명은 100자 이내로 입력해주세요." }),
  description: z
    .string()
    .min(1, { message: "상품 설명을 입력해주세요." })
    .max(1000, { message: "상품 설명은 1000자 이내로 입력해주세요." }),
  price: z
    .number()
    .min(0, { message: "가격은 0원 이상이어야 합니다." })
    .max(999999999, { message: "가격은 999,999,999원 이하여야 합니다." }),
  tags: z
    .array(z.string())
    .min(1, { message: "태그를 최소 1개 이상 입력해주세요." })
    .max(10, { message: "태그는 최대 10개까지 입력할 수 있습니다." }),
  images: z
    .array(z.string())
    .max(3, { message: "이미지는 최대 3개까지 업로드할 수 있습니다." }),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const productUpdateSchema = productSchema.partial();

export type ProductUpdateSchema = z.infer<typeof productUpdateSchema>;
