import { useDeviceType } from "./useDeviceType";

/**
 * 화면 사이즈별 글 갯수 조정
 * @returns 베스트 게시글 페이지 사이즈
 */
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
