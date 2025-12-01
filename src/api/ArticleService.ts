import { ArticleRequest, ArticleResponse } from '@/constants/articleType';
import { customFetch, customAuthFetch } from './fetchClient';

export async function getArticles(
  page: number = 1,
  pagesize: number = 10,
  orderBy: string = 'recent',
  keyword: string = ''
) {
  //검색 파라미터를 쿼리로 넘겼습니다.
  const result = await customFetch.get<ArticleResponse[]>(
    `/articles?page=${page}&pageSize=${pagesize}&orderBy=${orderBy}&keyword=${keyword}`
  );
  return result;
}

export async function getArticle(id: string) {
  const result = await customFetch.get<ArticleResponse>(`/articles/${id}`);
  return result;
}

export async function createArticle(data: ArticleRequest) {
  const result = await customAuthFetch.post<ArticleRequest, ArticleResponse>('/articles', data);
  return result;
}

export async function patchArticle(id: string, data: ArticleRequest) {
  const result = await customAuthFetch.patch<ArticleRequest, ArticleResponse>(
    `/articles/${id}`,
    data
  );
  return result;
}

export async function deleteArticle(id: string) {
  const result = await customAuthFetch.delete<never>(`/articles/${id}`);
  return result;
}
