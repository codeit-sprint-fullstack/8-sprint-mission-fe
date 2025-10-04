import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 형식으로 입력해주세요." }),
  password: z
    .string()
    .min(1, { message: "비밀번호를 입력해주세요." })
    .min(6, { message: "비밀번호는 6자 이상 입력해주세요." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "이메일을 입력해주세요." })
      .email({ message: "올바른 이메일 형식으로 입력해주세요." }),
    nickname: z
      .string()
      .min(1, { message: "닉네임을 입력해주세요." })
      .min(2, { message: "닉네임은 2자 이상 입력해주세요." }),
    password: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요." })
      .min(6, { message: "비밀번호는 6자 이상 입력해주세요." }),
    passwordConfirmation: z
      .string()
      .min(1, { message: "비밀번호 확인을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
