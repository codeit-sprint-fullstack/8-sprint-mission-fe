import { useEffect, useState } from 'react';

const getSize = () => {
  const width = window.innerWidth;
  if (width < 744) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
};

const useResponsive = () => {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    const handleResize = () => setSize(getSize());
    
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { size };
};

export default useResponsive;
