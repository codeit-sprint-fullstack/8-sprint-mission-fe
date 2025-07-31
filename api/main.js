
import articles from './ArticleService.js';
import products from './ProductService.js';
//id 값은 일부러 0을 채움 catch 값이 반환됨

const articleList = await articles.getArticleList({
    page: 1,
    pageSize: 5,
    keyword: ''
});

const article = await articles.getArticle(0);

const articleCreate = await articles.createArticle({
    title: '테스트 아티클',
    content: '이건 테스트용 게시글입니다',
    image: 'https://example.com/...'
});
const articlePatch = await articles.patchArticle(0,{
    title: "테스트 아티클이 아닙니다",
    content: "이건 아마도 테스트용 게시글입니다",
    image: 'https://example.com/...'
})
const articleDelete = await articles.deleteArticle(0);

const productList = await products.getProductList({
    page: 1,
    pageSize: 5,
    keyword: ''
});

const product = await products.getProduct(0)

const productCreate = await products.createProduct({
    name: '테스트 프로덕트 입니다,', 
    description: 'string', 
    price: 1000, 
    tags: [
        "전자제품"
    ],
    images: [
    "https://example.com/..."
    ]
});

const ProductPatch = await products.patchProduct(0, {
    name: '테스트 프로덕트 아닙니다,', 
    description: 'string', 
    price: 5000, 
    tags: [
        "전자제품"
    ],
    images: [
    "https://example.com/..."
    ]
});

const ProductDelete = await products.deleteProduct(0)


console.log(articleList);
console.log(article);
console.log(articleCreate);
console.log(articlePatch);
console.log(articleDelete);


console.log(productList);
console.log(product);
console.log(productCreate);
console.log(ProductPatch);
console.log(ProductDelete);

