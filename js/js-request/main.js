import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

// Article function
const resArticle = await fetch('https://panda-market-api-crud.vercel.app/docs/#/Article');


// Product function

try {
  const data = await getProductList();
  console.log(data);
} catch(e) {
  console.log('오류 발생');
}

try {
  const data = await getProduct();
  console.log(data);
} catch(e) {
  console.log('오류 발생');
}

try {
  const data = await createProduct();
  console.log(data);
} catch(e) {
  console.log('오류 발생');
}

try {
  const data = await patchProduct();
  console.log(data);
} catch(e) {
  console.log('오류 발생');
}

try {
  const data = await deleteProduct();
  console.log(data);
} catch(e) {
  console.log('오류 발생');
}