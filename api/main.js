import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

// Function Article
const getArticleListTest = async () => {
  const article = await getArticleList();
  console.log(article);
};

const getArticleTest = async () => {
  const article = await getArticle();
  console.log(article);
};

const createArticleTest = async () => {
  const article = await createArticle();
  console.log(article);
};

const patchArticleTest = async () => {
  const article = await patchArticle();
  console.log(article);
};

const deleteArticleTest = async () => {
  const article = await deleteArticle();
  console.log(article);
};

// Function Product
const getProductListTest = async () => {
  const product = await getProductList();
  console.log(product);
};

const getProductTest = async () => {
  const product = await getProduct();
  console.log(product);
};

const createProductTest = async () => {
  const product = await createProduct();
  console.log(product);
};

const patchProductTest = async () => {
  const product = await patchProduct();
  console.log(product);
};

const deleteProductTest = async () => {
  const product = await deleteProduct();
  console.log(product);
};
