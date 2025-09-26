import { useDeviceType } from "./useDeviceType";

export const useBestArticlesPageSize = () => {
  const deviceType = useDeviceType();
  let bestArticlesPageSize = 3;

  switch (deviceType) {
    case "desktop":
      bestArticlesPageSize = 3;
      break;
    case "tablet":
      bestArticlesPageSize = 2;
      break;
    case "mobile":
      bestArticlesPageSize = 1;
      break;
  }

  return bestArticlesPageSize;
};
