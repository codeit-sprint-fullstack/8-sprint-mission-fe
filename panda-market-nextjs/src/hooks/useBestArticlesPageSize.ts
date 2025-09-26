import { useDeviceType } from "./useDeviceType";

export const useBestArticlesPageSize = () => {
  const deviceType = useDeviceType();
  let bestArticlesPageSize = 3;

  switch (deviceType) {
    case "mobile":
      bestArticlesPageSize = 1;
      break;
    case "tablet":
      bestArticlesPageSize = 2;
      break;
    default:
      bestArticlesPageSize = 3;
      break;
  }

  return bestArticlesPageSize;
};
