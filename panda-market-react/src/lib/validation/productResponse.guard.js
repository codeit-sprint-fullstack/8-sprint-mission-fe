export function validateProductResponse(response, resMessage) {
  if (!response) throw new Error(resMessage);

  const data = response.data.list;
  data.forEach((item) => {
    if (typeof item.id !== 'number') throw new Error('id는 숫자여야 합니다.');
    if (typeof item.name !== 'string') throw new Error('name은 문자여야 합니다.');
    if (typeof item.price !== 'number') throw new Error('price는 숫자여야 합니다.');
    if (!Array.isArray(item.images)) throw new Error('imageUrl은 배열이여야 합니다.');
    if (typeof item.description !== 'string') throw new Error('description은 문자여야 합니다.');
    if (typeof item.createdAt !== 'string')
      throw new Error('createdAt은 문자(ISO 8601)여야 합니다.');
    if (typeof item.updatedAt !== 'string')
      throw new Error('updatedAt은 문자(ISO 8601)여야 합니다.');
  });
}
