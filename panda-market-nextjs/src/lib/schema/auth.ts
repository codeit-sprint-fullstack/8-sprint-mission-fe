import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 형식으로 입력해주세요." }),
  password: z
    .string()
    .min(1, { message: "비밀번호를 입력해주세요." })
    .min(8, { message: "비밀번호는 8자 이상 입력해주세요." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
