import { useEffect, useState } from 'react';

export default function useResponsive() {
  const queryDesktop = '(min-width: 1200px)';
  const queryTablet = '(min-width: 768px) and (max-width: 1199px)';
  const queryMobile = '(max-width: 767px)';

  const calculateBreakpoint = () => {
    if (window.matchMedia(queryDesktop).matches) return 'desktop';
    if (window.matchMedia(queryTablet).matches) return 'tablet';
    return 'mobile';
  };

  const [breakpoint, setBreakpoint] = useState(calculateBreakpoint());

  useEffect(() => {
    const handler = () => setBreakpoint(calculateBreakpoint());

    window.addEventListener('resize', handler);
    window.addEventListener('orientationchange', handler);

    return () => {
      window.removeEventListener('resize',handler);
      window.removeEventListener('orientationchange', handler);
    };
  }, []);

  return breakpoint;
}