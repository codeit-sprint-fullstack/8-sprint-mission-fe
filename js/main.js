import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService";
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService";

const page = 1;
const pageSize = 10;
const keyword = "recent";
const getArticleListData = getArticleList({ page, pageSize, keyword })
  .then((data) => console.log(data))
  .catch((err) => console.log("데이터를 불러오는데 실패했습니다."));

const id = 1;
const getArticleData = getArticle(id)
  .then((data) => console.log(data))
  .catch((err) => console.log("데이터를 불러오는데 실패했습니다."));
