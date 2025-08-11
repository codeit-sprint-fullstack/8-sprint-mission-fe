import { useState, useEffect } from 'react';

export default function useResponsivePageSize({ defaultSize = 4, breakpoints = [] }) {
  const [pageSize, setPageSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const breakpoint = breakpoints.find(b => width <= b.max);
      return breakpoint ? breakpoint.size : defaultSize;
    }
    return defaultSize;
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const breakpoint = breakpoints.find(b => width <= b.max);
      setPageSize(breakpoint ? breakpoint.size : defaultSize);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints, defaultSize]);

  return pageSize;
}
