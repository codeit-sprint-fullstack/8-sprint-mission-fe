import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

// Article function
const resArticle = await fetch('https://panda-market-api-crud.vercel.app/docs/#/Article');


// Product function
const resProduct = await fetch('https://panda-market-api-crud.vercel.app/docs/#/Product');