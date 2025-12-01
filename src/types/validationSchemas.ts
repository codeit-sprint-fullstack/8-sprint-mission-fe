import { z } from 'zod';

// 이메일 검증 스키마
const emailSchema = z
  .string()
  .min(1, '이메일을 입력해 주세요')
  .email('올바른 이메일 형식이 아니에요');

// 비밀번호 검증 스키마
const passwordSchema = z
  .string()
  .min(1, '비밀번호를 입력해 주세요')
  .min(8, '비밀번호는 8자 이상이어야 해요');

// 닉네임 검증 스키마
const nicknameSchema = z
  .string()
  .min(1, '닉네임을 입력해 주세요')
  .min(2, '닉네임은 2자 이상이어야 해요');

// 로그인 폼 스키마
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 회원가입 폼 스키마
export const signupSchema = z
  .object({
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    passwordConfirm: z.string().min(1, '비밀번호를 다시 입력해 주세요'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않아요',
    path: ['passwordConfirm'],
  });

// 타입 추론
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
