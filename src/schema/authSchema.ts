import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '이메일 형식에 맞지 않습니다.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '이메일을 입력해주세요.' })
      .email({ message: '이메일 형식에 맞지 않습니다.' }),
    nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
    password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
    confirmPassword: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
