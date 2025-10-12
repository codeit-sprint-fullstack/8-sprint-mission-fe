"use client";

import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}