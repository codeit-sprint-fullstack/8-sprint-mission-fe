import { getArticleList, getArticle } from './ArticleService.js';
import { getProductList, getProduct } from './ProductService.js';

getArticleList().then(data => {
  console.log('✅ 게시글 목록:', data);
  const firstId = data.list[0]?.id;
  if (firstId) {
    getArticle(firstId).then(article => {
      console.log(`✅ 게시글 ${firstId}번:`, article);
    });
  }
});

getProductList().then(data => {
  console.log('✅ 상품 목록:', data);
  const firstId = data.list[0]?.id;
  if (firstId) {
    getProduct(firstId).then(product => {
      console.log(`✅ 상품 ${firstId}번:`, product);
    });
  }
});