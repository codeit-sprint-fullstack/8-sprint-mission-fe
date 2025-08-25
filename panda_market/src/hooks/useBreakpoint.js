// src/hooks/useBreakpoint.js
import { useEffect, useState } from 'react';

export default function useBreakpoint() {
    const query = {
        mobile: '(max-width: 767px)',
        tablet: '(min-width: 768px) and (max-width: 1279px)',
        desktop: '(min-width: 1280px)',
    };

    const getState = () => ({
        isMobile: window.matchMedia(query.mobile).matches,
        isTablet: window.matchMedia(query.tablet).matches,
        isDesktop: window.matchMedia(query.desktop).matches,
    });

    const [bp, setBp] = useState(getState);

    useEffect(() => {
        const m1 = window.matchMedia(query.mobile);
        const m2 = window.matchMedia(query.tablet);
        const m3 = window.matchMedia(query.desktop);
        const onChange = () => setBp(getState());
        m1.addEventListener('change', onChange);
        m2.addEventListener('change', onChange);
        m3.addEventListener('change', onChange);
        return () => {
            m1.removeEventListener('change', onChange);
            m2.removeEventListener('change', onChange);
            m3.removeEventListener('change', onChange);
        };
    }, []);

    const current = bp.isDesktop
        ? 'desktop'
        : bp.isTablet
        ? 'tablet'
        : 'mobile';
    return { ...bp, current };
}
