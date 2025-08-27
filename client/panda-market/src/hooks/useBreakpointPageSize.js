// src/hooks/useBreakpointPageSize.js
import { useEffect, useState } from 'react';

function getBp() {
  if (window.matchMedia('(min-width: 1280px)').matches) return 'desktop';
  if (window.matchMedia('(min-width: 768px)').matches) return 'tablet';
  return 'mobile';
}

export function usePageSize(kind = 'all') {
  const [bp, setBp] = useState(() => (typeof window !== 'undefined' ? getBp() : 'desktop'));

  useEffect(() => {
    const onResize = () => setBp(getBp());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // 열 수 규칙
  const columns =
    kind === 'best'
      ? (bp === 'desktop' ? 4 : bp === 'tablet' ? 2 : 1)
      : (bp === 'desktop' ? 5 : bp === 'tablet' ? 3 : 2
