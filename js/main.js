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

try {
  const productPage = 1;
  const productPageSize = 10;
  const productKeyword = "recent";

  const getProductListData = await getProductList({
    productPage,
    productPageSize,
    productKeyword,
  });

  console.log(getProductListData);
} catch (err) {
  console.log(err);
}

try {
  const getProductId = 1;
  const getProductData = await getProduct(getProductId);

  console.log(getProductData);
} catch (err) {
  console.log(err);
}

try {
  const createProductBody = {
    name: "name",
    description: "description",
    price: "price",
    tags: "tags",
    images: "images",
  };
  const createProductData = await createProduct(createProductBody);

  console.log(createProductData);
} catch (err) {
  console.log(err);
}

try {
  const patchProductId = 1;
  const patchProductBody = {
    name: "name",
    description: "description",
    price: "price",
    tags: "tags",
    images: "images",
  };
  const patchProductData = await patchProduct(patchProductId, patchProductBody);

  console.log(patchProductData);
} catch (err) {
  console.log(err);
}

try {
  const deleteProductId = 1;
  const deleteProductData = await deleteProduct(deleteProductId);

  console.log(deleteProductData);
} catch (err) {
  console.log(err);
}
