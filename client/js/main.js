import { getArticleList, createArticle } from './ArticleService.js';
import { getProductList, createProduct } from './ProductService.js';

// 테스트: 게시글 리스트 가져오기
getArticleList(1, 5, '테스트').then((data) => {
  console.log('게시글 리스트:', data);
});

// 테스트: 게시글 작성
createArticle({
  title: '데미안의 글',
  content: '나는 성장 중입니다.',
  image: 'https://placehold.co/300x200',
}).then((data) => {
  console.log('작성된 게시글:', data);
});
