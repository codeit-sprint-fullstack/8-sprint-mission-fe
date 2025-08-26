import axios from "axios";

const BASE_URL = "https://panda-market-api.vercel.app";

export async function getProduct({
  page = "",
  pageSize = "",
  orderBy = "",
  keyword = "",
}) {
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: {
        page,
        pageSize,
        orderBy,
        keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error("데이터를 불러오는데 실패했습니다");
  }
}
