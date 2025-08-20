import axios from "axios";

const BASE_URL = "https://product-api-wbmj.onrender.com";

const ProductApi = async ({
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

export default ProductApi;
