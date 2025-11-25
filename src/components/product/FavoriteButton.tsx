'use client';
import React, { useEffect, useState } from 'react';

interface FavoriteButtonProps {
  isLiked: boolean;
  count: number;
  disabled?: boolean;
  onToggle?: (nextFavorite: boolean) => Promise<{ isLiked: boolean; favoriteCount: number } | void>;
  className?: string;
}

const FavoriteButton = ({
  isLiked,
  count,
  disabled,
  onToggle,
  className = '',
}: FavoriteButtonProps) => {
  const [optimisticFavorite, setOptimisticFavorite] = useState(isLiked);
  const [optimisticCount, setOptimisticCount] = useState(count);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setOptimisticFavorite(isLiked);
  }, [isLiked]);

  useEffect(() => {
    setOptimisticCount(count);
  }, [count]);

  const handleClick = async () => {
    if (disabled || pending) return;
    const nextFavorite = !optimisticFavorite;
    setPending(true);
    setOptimisticFavorite(nextFavorite);
    setOptimisticCount((c) => c + (nextFavorite ? 1 : -1));
    try {
      const updated = await onToggle?.(nextFavorite);
      if (updated && typeof updated.isLiked === 'boolean') {
        setOptimisticFavorite(updated.isLiked);
      }
      if (updated && typeof updated.favoriteCount === 'number') {
        setOptimisticCount(updated.favoriteCount);
      }
    } catch {
      setOptimisticFavorite(!nextFavorite);
      setOptimisticCount((c) => c - (nextFavorite ? 1 : -1));
      alert('좋아요 처리 중 오류가 발생했습니다.');
    } finally {
      setPending(false);
    }
  };

  const active = optimisticFavorite;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || pending}
      className={`group shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 border ${
        active
          ? 'bg-red-50 border-red-200 text-red-600'
          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
      } disabled:opacity-50 disabled:cursor-not-allowed ${pending ? 'cursor-wait' : ''} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={active ? '#dc2626' : 'none'}
        stroke={active ? '#dc2626' : 'currentColor'}
        strokeWidth="1.8"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      <span className="tabular-nums">{optimisticCount}</span>
    </button>
  );
};

export default FavoriteButton;
