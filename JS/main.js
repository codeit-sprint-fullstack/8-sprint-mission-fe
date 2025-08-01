// main.js - 만든 API 함수들을 테스트하는 파일

// ArticleService에서 함수들 가져오기 (.then/.catch 방식)
import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

// ProductService에서 함수들 가져오기 (async/await 방식)
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

console.log("=== API 테스트 시작 ===");

// Article API 테스트 부분
console.log("\n Article API 테스트");

// 1. 게시글 목록 가져오기
console.log("\n1. getArticleList 테스트:");
getArticleList(1, 5, "")
  .then((data) => console.log("게시글 목록 조회 성공:", data))
  .catch((error) => console.log("게시글 목록 조회 실패:", error.message));

// 2. 특정 게시글 하나 가져오기
console.log("\n2. getArticle 테스트:");
getArticle(2138)
  .then((data) => console.log("게시글 상세 조회 성공:", data))
  .catch((error) => console.log("게시글 상세 조회 실패:", error.message));

// 3. 새 게시글 만들기
console.log("\n3. createArticle 테스트:");
createArticle(
  "테스트 제목",
  "테스트 내용입니다",
  "https://example.com/test.jpg"
)
  .then((data) => console.log("게시글 생성 성공:", data))
  .catch((error) => console.log("게시글 생성 실패:", error.message));

// 4. 게시글 수정하기
console.log("\n4. patchArticle 테스트:");
patchArticle(
  2138,
  "수정된 제목",
  "수정된 내용입니다",
  "https://example.com/updated.jpg"
)
  .then((data) => console.log("게시글 수정 성공:", data))
  .catch((error) => console.log("게시글 수정 실패:", error.message));

// 5. 게시글 삭제 (실제로는 안함)
console.log("\n5. deleteArticle 테스트: 실제 삭제는 스킵");

// Product API 테스트 부분
console.log("\n Product API 테스트");

// async 함수로 Product 테스트들 실행
async function runProductTests() {
  try {
    // 1. 상품 목록 가져오기
    console.log("\n1. getProductList 테스트:");
    const productList = await getProductList(1, 5, "");
    console.log("상품 목록 조회 성공:", productList);

    // 2. 특정 상품 하나 가져오기
    console.log("\n2. getProduct 테스트:");
    const product = await getProduct(1543);
    console.log("상품 상세 조회 성공:", product);

    // 3. 새 상품 만들기
    console.log("\n3. createProduct 테스트:");
    const newProduct = await createProduct(
      "테스트 상품",
      "테스트 상품 설명입니다",
      10000,
      ["전자제품", "테스트"],
      ["https://example.com/product.jpg"]
    );
    console.log("상품 생성 성공:", newProduct);

    // 4. 상품 수정하기
    console.log("\n4. patchProduct 테스트:");
    const updatedProduct = await patchProduct(
      1543,
      "수정된 상품명",
      "수정된 상품 설명입니다",
      15000,
      ["전자제품", "수정됨"],
      ["https://example.com/updated-product.jpg"]
    );
    console.log("상품 수정 성공:", updatedProduct);

    // 5. 상품 삭제 (실제로는 안함)
    console.log("\n5. deleteProduct 테스트: 실제 삭제는 스킵");
  } catch (error) {
    console.log("Product API 테스트에서 에러 발생:", error.message);
  }
}

// Product 테스트 함수 실행
runProductTests();

console.log("\n=== 테스트 끝 ===");
