import { useEffect, useState } from 'react';
import { getBestProducts } from '../../api/productsApi';

export function useBestProducts(bestProductPageSize, windowWidth) {
  const [bestProductsList, setBestProductsList] = useState([]); // 베스트 상품 리스트
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * 베스트 상품 리스트 조회
     */
    const getBestProductsList = async () => {
      try {
        setIsLoading(true);
        const response = await getBestProducts(bestProductPageSize);
        const sortedList = response.list.sort((a, b) => b.favoriteCount - a.favoriteCount);
        setBestProductsList(sortedList);
      } catch (error) {
        console.error(error);
        setError(error);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    getBestProductsList();
  }, [windowWidth, bestProductPageSize]);

  return { bestProductsList, bestProductsLoading: isLoading, bestProductsError: error };
}
