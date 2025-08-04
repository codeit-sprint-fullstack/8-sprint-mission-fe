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
const articleList = getArticleList({
  articlePage,
  articlePageSize,
  articleKeyword,
})
  .then((data) => console.log("articleList: ", data))
  .catch((err) => console.log(err));

const getArticleId = 1;
const articleData = getArticle(getArticleId)
  .then((data) => console.log("articleData: ", data))
  .catch((err) => console.log(err));

const createArticleBody = {
  title: "title",
  content: "content",
  image: "image",
};
const createdArticle = createArticle(createArticleBody)
  .then((data) => console.log("created: ", data))
  .catch((err) => console.log(err));

const patchArticleId = 1;
const patchArticleBody = {
  title: "title",
  content: "content",
  image: "image",
};
const updatedArticle = patchArticle(patchArticleId, patchArticleBody)
  .then((data) => console.log("updated: ", data))
  .catch((err) => console.log(err));

const deleteArticleId = 1;
const deletedArticle = deleteArticle(deleteArticleId)
  .then((data) => console.log("deleted: ", data))
  .catch((err) => console.log(err));

// Product

try {
  const page = 1;
  const pageSize = 10;
  const keyword = "recent";

  const productList = await getProductList({
    page,
    pageSize,
    keyword,
  });

  console.log("productList: ", productList);
} catch (err) {
  console.log(err);
}

try {
  const id = 1;
  const product = await getProduct(id);

  console.log("product: ", product);
} catch (err) {
  console.log(err);
}

try {
  const productData = {
    name: "name",
    description: "description",
    price: "price",
    tags: "tags",
    images: "images",
  };
  const created = await createProduct(productData);

  console.log("created: ", created);
} catch (err) {
  console.log(err);
}

try {
  const id = 1;
  const productData = {
    name: "name",
    description: "description",
    price: "price",
    tags: "tags",
    images: "images",
  };
  const updated = await patchProduct(id, productData);

  console.log("updated: ", updated);
} catch (err) {
  console.log(err);
}

try {
  const id = 1;
  const deleted = await deleteProduct(id);

  console.log("deleted: ", deleted);
} catch (err) {
  console.log(err);
}
