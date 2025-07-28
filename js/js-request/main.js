import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

// Article function
getArticleList().then((data) => console.log(data))
                  .catch((error) => console.error('ArticleList Error'));
getArticle().then((data) => console.log(data))
              .catch((error) => console.error('Article Error'));
createArticle().then((data) => console.log(data))
                .catch((error) => console.error('CreateArticle Error'));
patchArticle().then((data) => console.log(data))
                .catch((error) => console.error('PatchArticle Error'));
deleteArticle().then((data) => console.log(data))
                .catch((error) => console.error('DeleteArticle Error'));

// Product function
(async () => {
  try {
    const product = await getProductList();
    console.log(product);
  } catch(error) {
    alert('ProductList 실패');
  }

  try {
    const product = await getProduct();
    console.log(product);
  } catch(error) {
    alert('Product 실패');
  }

  try {
    const product = await createProduct();
    console.log(product);
  } catch(error) {
    alert('createProduct 실패');
  }

  try {
    const product = await patchProduct();
    console.log(product);
  } catch(error) {
    alert('patchProduct 실패');
  }

  try {
    const product = await deleteProduct();
    console.log(product);
  } catch(error) {
    alert('deleteProduct');
  }
})