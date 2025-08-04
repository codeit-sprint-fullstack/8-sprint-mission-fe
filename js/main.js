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
  .catch((err) => console.log(err));

const getArticleId = 1;
const getArticleData = getArticle(getArticleId)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const createArticleBody = {
  title: "title",
  content: "content",
  image: "image",
};
const createArticleData = createArticle(createArticleBody)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const patchArticleId = 1;
const patchArticleBody = {
  title: "title",
  content: "content",
  image: "image",
};
const patchArticleData = patchArticle(patchArticleId, patchArticleBody)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const deleteArticleId = 1;
const deleteArticleData = deleteArticle(deleteArticleId)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
