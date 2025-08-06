import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from '/assets/js/ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from '/assets/js/ProductService.js';

// **Article API 테스트**
getArticleList(1, 5, '테스트')
  .then(data => console.log('Article 리스트:', data))
  .catch(err => console.error(err.message));

createArticle('새 글 제목', '새 글 내용', 'https://placehold.co/200')
  .then(article => {
    console.log('생성된 Article:', article);

    // 생성된 글 수정
    return patchArticle(article.id, { title: '수정된 제목' });
  })
  .then(updated => {
    console.log('수정된 Article:', updated);

    // 수정된 글 삭제
    return deleteArticle(updated.id);
  })
  .then(() => console.log('Article 삭제 완료'))
  .catch(err => console.error(err.message));

// **Product API 테스트**
(async () => {
  try {
    const products = await getProductList(1, 5, '노트북');
    console.log('Product 리스트:', products);

    const newProduct = await createProduct('노트북', '고성능 노트북', 1500000, ['전자제품', '노트북'], ['https://placehold.co/200']);
    console.log('생성된 Product:', newProduct);

    const updatedProduct = await patchProduct(newProduct.id, { price: 1400000 });
    console.log('수정된 Product:', updatedProduct);

    await deleteProduct(updatedProduct.id);
    console.log('Product 삭제 완료');
  } catch (err) {
    console.error(err.message);
  }
})();
