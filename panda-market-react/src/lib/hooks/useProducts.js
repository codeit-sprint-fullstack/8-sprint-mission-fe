import { useEffect, useState } from 'react';
import { getProducts } from '../../api/productsApi';

export function useProducts(currentPage, pageSize, keyword, orderBy, windowWidth) {
  const [productsList, setProductsList] = useState([]); // 상품 리스트
  const [pageCount, setPageCount] = useState(0); // 전체 페이징 넘버 수
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * 상품 리스트 조회
     * 페이지 번호, 검색 키워드, 정렬 기준, 화면 가로 사이즈 변경 시 호출
     */
    const getProductsList = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts(currentPage, pageSize, keyword, orderBy);
        setProductsList(response.list);
        setPageCount(response.totalCount);
      } catch (error) {
        console.error(error);
        setError(error);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    getProductsList();
  }, [currentPage, keyword, orderBy, windowWidth, pageSize]);

  return { productsList, pageCount, productsLoading: isLoading, productsError: error };
}
