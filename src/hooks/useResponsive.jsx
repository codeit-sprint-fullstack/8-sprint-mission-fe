import { useMediaQuery } from 'react-responsive';

const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 743});
  const isTablet = useMediaQuery({ minWidth: 744, maxWidth: 1199 });
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  return { isMobile, isTablet, isDesktop };
};

export default useResponsive;