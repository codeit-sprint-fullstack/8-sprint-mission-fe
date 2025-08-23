import { useEffect, useState } from 'react';

export default function useResponsive() {
  const queryDesktop = '(min-width: 1200px)';
  const queryTablet = '(min-width: 768px) and (max-width: 1199px)';
  const queryMobile = '(max-width: 767px)';


  const calculateBreakpoint = () => {
=======
  const getBP = () => {

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

  const [breakpoint, setBreakpoint] = useState(getBP());

  useEffect(() => {
    const handler = () => setBreakpoint(getBP());
    const m1 = window.matchMedia(queryDesktop);
    const m2 = window.matchMedia(queryTablet);
    const m3 = window.matchMedia(queryMobile);

    m1.addEventListener('change', handler);
    m2.addEventListener('change', handler);
    m3.addEventListener('change', handler);
    window.addEventListener('orientationchange', handler);

    return () => {
      m1.removeEventListener('change', handler);
      m2.removeEventListener('change', handler);
      m3.removeEventListener('change', handler);

      window.removeEventListener('orientationchange', handler);
    };
  }, []);

  return breakpoint;
}