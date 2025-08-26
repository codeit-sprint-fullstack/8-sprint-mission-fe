export function validateProductResponse(response, resMessage) {
  if (!response) throw new Error(resMessage);

  const data = response.data.products;
  data.forEach((item) => {
    if (typeof item.name !== 'string') throw new Error('name은 문자여야 합니다.');
    if (typeof item.price !== 'number') throw new Error('price는 숫자여야 합니다.');
    if (typeof item.createdAt !== 'string')
      throw new Error('createdAt은 문자(ISO 8601)여야 합니다.');
  });
}

export function validatePostProductResponse(response, resMessage) {
  if (!response) throw new Error(resMessage);

  if (response.status === 200 || response.status === 201) {
    return response.data;
  }

  throw new Error('상품 등록에 실패했습니다.');
}
