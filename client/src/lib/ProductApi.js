import axios from "axios";

const BASE_URL = "https://product-api-wbmj.onrender.com";

export const getProductApi = async ({
  page = "",
  limit = "",
  sort = "",
  search = "",
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: {
        page,
        limit,
        sort,
        search,
      },
    });
    return response.data;
  } catch (e) {
    console.log("에러 발생", e.message);
  }
};

export const createProductApi = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, productData);
    return response.data;
  } catch (e) {
    throw new Error("상품 등록 에러", e.message);
  }
};
