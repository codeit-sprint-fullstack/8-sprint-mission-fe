import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

// Article API 테스트
getArticleList(1, 5, "test")
  .then((result) => {
    console.log("게시글 목록 조회:", result);
    return getArticle(1);
  })
  .then((result) => {
    console.log("게시글 상세 조회:", result);
    return createArticle("테스트 제목", "테스트 내용", "test.jpg");
  })
  .then((result) => {
    console.log("게시글 생성:", result);
  })
  .catch((error) => {
    console.log("Article API 에러:", error);
  });

// Product API 테스트
getProductList(1, 5, "")
  .then((result) => {
    console.log("상품 목록 조회:", result);
    return getProduct(1);
  })
  .then((result) => {
    console.log("상품 상세 조회:", result);
    return createProduct(
      "테스트 상품",
      "테스트 설명",
      10000,
      ["태그"],
      ["image.jpg"]
    );
  })
  .then((result) => {
    console.log("상품 생성:", result);
  })
  .catch((error) => {
    console.log("Product API 에러:", error);
  });

console.log("=== 테스트 완료 ===");
