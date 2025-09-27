"use client";

import ArticleProvider from "@/providers/ArticleProvider";
import CommentProvider from "@/providers/CommentProvider";

export default function Providers({ children }) {
  return (
    <ArticleProvider>
      <CommentProvider>
        {children}
      </CommentProvider>
    </ArticleProvider>
  );
}
