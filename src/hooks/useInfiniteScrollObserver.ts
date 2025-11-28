import { useEffect, useRef } from 'react';

interface UseInfiniteScrollObserverOptions {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScrollObserver = ({
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: UseInfiniteScrollObserverOptions) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        onLoadMore();
      }
    });

    const element = targetRef.current;
    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  return { targetRef };
};
