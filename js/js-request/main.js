import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

// Article function
const dataAL = await getArticleList();
console.log(dataAL);

const dataA = await getArticle();
console.log(dataA);

const dataCA = await createArticle();
console.log(dataCA);

const dataPA = await patchArticle();
console.log(dataPA);

const dataDA = await deleteArticle();
console.log(dataDA);

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