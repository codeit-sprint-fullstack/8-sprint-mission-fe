import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

// Article function
getArticleList().then((data) => console.log(data))
                  .catch((error) => alert('ArticleList Error'));
getArticle().then((data) => console.log(data))
              .catch((error) => alert('Article Error'));
createArticle().then((data) => console.log(data))
                .catch((error) => alert('CreateArticle Error'));
patchArticle().then((data) => console.log(data))
                .catch((error) => alert('PatchArticle Error'));
deleteArticle().then((data) => console.log(data))
                .catch((error) => alert('DeleteArticle Error'));

// Product function
getProductList();
getProduct();
createProduct();
patchProduct();
deleteProduct();