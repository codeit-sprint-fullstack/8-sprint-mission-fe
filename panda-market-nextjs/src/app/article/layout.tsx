import { ReactNode } from "react";

interface ArticleLayoutProps {
  children: ReactNode;
}

export default function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <main className="px-4 md:px-[30px] pt-[30px] w-full mx-auto max-w-[1260px] pb-[200px]">
      {children}
    </main>
  );
}
