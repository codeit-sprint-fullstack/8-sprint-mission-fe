const URL = `${process.env.NEXT_PUBLIC_CODEIT_URL}/products`;

// products list get
export const fetchProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
}) => {
  const response = await fetch(
    `${URL}?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`
  );
  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오는데 실패했습니다.");
  }
  return await response.json();
};

// product get
export const fetchProduct = async ({ id }) => {
  const response = await fetch(`${URL}/${id}`);
  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오는데 실패했습니다.");
  }
  return await response.json();
};
