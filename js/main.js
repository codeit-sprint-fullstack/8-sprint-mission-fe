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

// Article

const articlePage = 1;
const articlePageSize = 10;
const articleKeyword = "recent";
const getArticleListData = getArticleList({
  articlePage,
  articlePageSize,
  articleKeyword,
})
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

// Product

const productPage = 1;
const productPageSize = 10;
const productKeyword = "recent";
const getProductListData = getArticleList({
  productPage,
  productPageSize,
  productKeyword,
})
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const getProductId = 1;
const getProductData = getProduct(getProductId)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const createProductBody = {
  name: "name",
  description: "description",
  price: "price",
  tags: "tags",
  images: "images",
};
const createProductData = createProduct(createProductBody)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const patchProductId = 1;
const patchProductBody = {
  name: "name",
  description: "description",
  price: "price",
  tags: "tags",
  images: "images",
};
const patchProductData = patchProduct(patchProductId, patchProductBody)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const deleteProductId = 1;
const deleteProductData = deleteProduct(deleteProductId)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
