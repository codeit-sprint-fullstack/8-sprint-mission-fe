'use client';

import { useState } from 'react';
import ArticleProvider from '@/providers/ArticleProvider';
import CommentProvider from '@/providers/CommentProvider';
import AuthProvider from '@/providers/AuthProvider';
import { ProductProvider } from '@/providers/ProductProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Providers({ children }) {
  // 한 번만 생성하여 리렌더 시 동일 인스턴스 재사용
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProductProvider>
          <ArticleProvider>
            <CommentProvider>{children}</CommentProvider>
          </ArticleProvider>
        </ProductProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
