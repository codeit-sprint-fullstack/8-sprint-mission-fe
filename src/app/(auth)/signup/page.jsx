"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// ✅ util에서 가져오기
import { validateEmail, validatePassword } from "@/app/_lib/utils";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailMsg = useMemo(() => validateEmail(email.trim()), [email]);
  const passwordMsg = useMemo(
    () => validatePassword(password.trim()),
    [password]
  );
  const disabled = !!emailMsg || !!passwordMsg;

  const onSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;

    // TODO: 회원가입 API 연동
    alert("회원가입이 성공적으로 처리되었습니다.");
    router.push("/login");
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <section className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl ring-1 ring-coolGray-200">
        <h1 className="mb-6 text-xl font-bold text-secondary-700">회원가입</h1>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-secondary-700"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-coolGray-200 bg-white px-3 py-2 text-[0.95rem] outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
            {!!emailMsg && <p className="text-sm text-red-500">{emailMsg}</p>}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-secondary-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-coolGray-200 bg-white px-3 py-2 text-[0.95rem] outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
            {!!passwordMsg && (
              <p className="text-sm text-red-500">{passwordMsg}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={disabled}
            className={[
              "mt-2 inline-flex h-12 w-full items-center justify-center rounded-md text-base font-semibold transition",
              disabled
                ? "cursor-not-allowed bg-coolGray-200 text-coolGray-400"
                : "bg-brand-blue text-coolGray-100 hover:opacity-90 active:opacity-80",
            ].join(" ")}
          >
            회원가입
          </button>
        </form>
      </section>
    </main>
  );
}
