import { customFetch, customAuthFetch } from './fetchClient';
import { ProductRequest, ProductResponse, ProductType } from '@/constants/productConstants';

//상품 목록 조회
export async function getProductList(
  page: number = 1,
  pagesize: number = 10,
  orderBy: string = 'recent',
  keyword: string = ''
) {
  const result = await customFetch.get<ProductResponse[]>(
    `/products?page=${page}&pageSize=${pagesize}&orderBy=${orderBy}&keyword=${keyword}`
  );
  return result; //(코드잇 api 사용시 result.list 경로 사용, 이하 동일)
}

//상품 상세 조회
export async function getProduct(id: string) {
  const result = await customFetch.get<ProductResponse>(`/products/${id}`);
  return result;
}

//상품 등록
export async function createProduct(data: ProductRequest) {
  const result = await customAuthFetch.post<ProductRequest, ProductResponse>(`/products`, data);
  return result;
}

//상품 이미지 업로드
export async function uploadImages(formData: FormData, productId: string) {
  const result = await customAuthFetch.post<FormData, ProductResponse>(
    `/products/${productId}/uploads`,
    formData
  );
  return result;
}

//상품 수정
export async function patchProduct(id: string, data: Partial<ProductRequest>) {
  const result = await customAuthFetch.patch<Partial<ProductRequest>, ProductResponse>(
    `/products/${id}`,
    data
  );
  return result;
}

//상품 삭제
export async function deleteProduct(id: string) {
  const result = await customAuthFetch.delete<never>(`/products/${id}`);
  return result;
}

//좋아요
export async function addFavorite(id: string) {
  const result = await customAuthFetch.patch(`/products/${id}/favorite`);
  return result;
}
