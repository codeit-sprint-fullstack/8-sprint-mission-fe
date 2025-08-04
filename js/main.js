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

const getId = 1;
const getArticleData = getArticle(getId)
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

const patchId = 1;
const patchArticleBody = {
  title: "title",
  content: "content",
  image: "image",
};
const patchArticleData = patchArticle(patchId, patchArticleBody)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
