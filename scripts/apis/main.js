import article_service from "./ArticleService.js";
import product_service from "./ProductService.js";

/* ArticleService 메소드 작동 테스트 코드 */
console.log("=====ArticleService=====")
console.log("---1. getArticleList()---");
const article_list_data = {
    page: 1, 
    pagesize: 10,
    keyword: "",
};
const article_response_1 = await article_service.getArticleList(article_list_data)
console.log(article_response_1)

console.log("---2. getArticle()---");
const article_response_2 = await article_service.getArticle();
console.log(article_response_2)

console.log("---3. createArticle()---");
const article_data = {
    "image": "https://example.com/...",
    "content": "게시글 내용입니다.",
    "title": "게시글 제목입니다."
}
const article_response_3 = await article_service.createArticle(article_data);
console.log(article_response_3)

console.log("---4. patchArticle()---");
const article_id_patch = article_response_3.id;
const patch_data = {
    image: "https://example.com/...",
    content: "Null",
    title: "Null"
}
const article_response_4 = await article_service.patchArticle(article_id_patch, patch_data);
console.log(article_response_4);

console.log("---5. deleteArticle()---");
const article_id_delete = article_response_3.id;
const article_response_5 = await article_service.deleteArticle(article_id_delete)
console.log(article_response_5);

/* ProductService 메소드 작동 테스트 코드 */
console.log("=====ProductService=====")
console.log("---1. getProductList()---");
const product_list_data = {
    page: 1, 
    pagesize: 10,
    keyword: "",
};
const product_response_1 = await product_service.getProductList(product_list_data);
console.log(product_response_1)

console.log("---2. getProduct()---");
const product_response_2 = await product_service.getProduct();
console.log(product_response_2)

console.log("---3. createProduct()---");
const product_data = {
    images: ["https://example.com/..."],
    tags: ["전자제품"],
    price: 0,
    description: "string",
    name:"상품이름"
}
const product_response_3 = await product_service.createProduct(product_data);
console.log(product_response_3)

console.log("---4. patchProduct()---");
const product_id_patch = product_response_3.id;
const product_patch_data = {
    images: ["https://example.com/..."],
    tags: ["Null"],
    price: 0,
    description: "Null",
    name:"Null"
}
const product_response_4 = await product_service.patchProduct(product_id_patch, product_patch_data);
console.log(product_response_4);

console.log("---5. deleteProduct()---");
const product_id_delete = product_response_3.id;
const product_response_5 = await product_service.deleteProduct(product_id_delete)
console.log(product_response_5);