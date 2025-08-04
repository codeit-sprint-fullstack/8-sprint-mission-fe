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

// Article

const articlePage = 1;
const articlePageSize = 10;
const articleOrderBy = "recent";
const articleList = getArticleList({
  page: articlePage,
  pageSize: articlePageSize,
  orderBy: articleOrderBy,
})
  .then((data) => console.log("getArticleList: ", data))
  .catch((err) => console.log("getArticleList: ", err));

const createArticleBody = {
  title: "title",
  content: "content",
  image: "https://example.com/...",
};
const createdArticle = createArticle(createArticleBody)
  .then((data) => console.log("createArticle: ", data))
  .catch((err) => console.log("createArticle: ", err));

const getArticleId = 3100;
const articleData = getArticle(getArticleId)
  .then((data) => console.log("getArticle: ", data))
  .catch((err) => console.log("getArticle: ", err));

const patchArticleId = 3101;
const patchArticleBody = {
  title: "updated title",
  content: "updated content",
  image: "https://example.com/...",
};
const updatedArticle = patchArticle(patchArticleId, patchArticleBody)
  .then((data) => console.log("patchArticle: ", data))
  .catch((err) => console.log("patchArticle: ", err));

let deleteArticleId = 3103;
if (deleteArticleId) {
  const deletedArticle = deleteArticle(deleteArticleId)
    .then((data) => console.log("deleteArticle: ", data))
    .catch((err) => console.log("deleteArticle: ", err));
} else {
  console.log("deleteId 없음");
}

// Product

try {
  const page = 1;
  const pageSize = 10;
  const orderBy = "recent";

  const productList = await getProductList({
    page,
    pageSize,
    orderBy,
  });

  console.log("getProductList: ", productList);
} catch (err) {
  console.log("getProductList: ", err);
}

try {
  const productData = {
    name: "상품 이름",
    description: "string",
    price: 0,
    tags: ["전자제품"],
    images: ["https://example.com/..."],
  };
  const created = await createProduct(productData);

  console.log("createProduct: ", created);
} catch (err) {
  console.log("createProduct: ", err);
}

try {
  const getProductId = 1570;
  const product = await getProduct(getProductId);

  console.log("getProduct: ", product);
} catch (err) {
  console.log("getProduct: ", err);
}

try {
  const patchProductId = 1571;
  const productData = {
    name: "수정한 상품 이름",
    description: "updated string",
    price: 9999,
    tags: ["전자제품"],
    images: ["https://example.com/..."],
  };
  const updated = await patchProduct(patchProductId, productData);

  console.log("patchProduct: ", updated);
} catch (err) {
  console.log("patchProduct: ", err);
}

try {
  let deleteProductId = 1614;
  if (deleteArticleId) {
    const deleted = await deleteProduct(deleteProductId);

    console.log("deleteProduct: ", deleted);
  } else console.log("deleteProductId 없음");
} catch (err) {
  console.log("deleteProduct: ", err);
}
