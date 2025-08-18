
import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
} from './services/ArticleService.js';

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
} from './services/ProductService.js';

async function runProductExamples() {
  try {
    const p1 = await getProduct(1);
    console.log('Product 1:', p1);
  } catch (err) {
    console.error('[getProduct 실패] ', err.message);
  }
}

runProductExamples();

/* Article API 테스트 */

getArticleList({ page: 1, pageSize: 5, keyword: '테스트' })
  .then(data => console.log('ArticleList:', data))
  .catch(err => console.error('[getArticleList 실패] ', err.message));

getArticle(1)
  .then(data => console.log('Article 1:', data))
  .catch(err => console.error('[getArticle 실패] ', err.message));

createArticle({ title: '새 글', content: '내용입니다', image: 'https://via.placeholder.com/150' })
  .then(data => {
    console.log('Created Article:', data);
    return patchArticle(data.id, { title: '수정된 제목' });
  })
  .then(data => {
    console.log('Patched Article:', data);
    return deleteArticle(data.id);
  })
  .then(() => console.log('Deleted Article'))
  .catch(err => console.error('[Article API 테스트 실패] ', err.message));


/* Product API 테스트 (즉시 실행 함수*/

(async () => {
  try {
    const plist = await getProductList({ page: 1, pageSize: 5, keyword: '검색어' });
    console.log('ProductList:', plist);

    const p1 = await getProduct(1);
    console.log('Product 1:', p1);

    const newP = await createProduct({
      name: '새 상품',
      description: '설명입니다',
      price: 10000,
      tags: ['tag1', 'tag2'],
      images: ['https://via.placeholder.com/100']
    });
    console.log('Created Product:', newP);

    const upd = await patchProduct(newP.id, { price: 15000 });
    console.log('Patched Product:', upd);

    await deleteProduct(upd.id);
    console.log('Deleted Product');
  } catch (err) {
    console.error('[Product API 테스트 실패] ', err.message);
  }
})();
