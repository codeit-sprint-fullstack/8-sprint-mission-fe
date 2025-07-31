import article from './ArticleService.js'; //브라우저에서는 './'을 안붙여주면 경로를 인식을 못한다고 합니다.
import product from './ProductService.js';

const ArticleBtn = document.getElementById('article-btn');   
const ProductBtn = document.getElementById('product-btn');  
const Content = document.getElementById('article');

ArticleBtn.addEventListener('click', printArticleResult);
ProductBtn.addEventListener('click', printProductResult);

async function printArticleResult(e){
    //기사 목록이 정상 작동하는 지 확인하는 버튼입니다.
    //testRequest.html에서 결과를 볼수 있습니다.


    Content.textContent = await article.getArticleList(1,3);
    //Content.textContent = await article.getArticle(1);
    //Content.textContent = await article.createArticle();
    //Content.textContent = await article.patchArticle(2090);
    //Content.textContent = await article.deleteArticle(2108);
}

async function printProductResult(e){
    //상품 목록이 정상 작동하는 지 확인하는 버튼입니다.
    //testRequest.html에서 결과를 볼수 있습니다.

    Content.textContent = await product.getProductList(2,3);
    //Content.textContent = await product.getProduct(1);
    //Content.textContent = await product.createProduct();
    //Content.textContent = await product.patchProduct(2090);
    //Content.textContent = await product.deleteProduct(2108);
}
