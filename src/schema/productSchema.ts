import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().max(10, { message: '10자 이내로 입력해주세요' }),
  description: z.string().min(10, { message: '10자 이상 입력해주세요' }),
  price: z.number().min(1, { message: '숫자로 입력해주세요' }),
  tags: z.array(z.string().max(5, { message: '5글자 이내로 입력해주세요' })),
});

export type ProductSchema = z.infer<typeof productSchema>;
