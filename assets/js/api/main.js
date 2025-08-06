import axios from 'axios'
import { productService } from './ProductService.js'
import { articleService } from './ArticleService.js'

export const pandaMarketApi = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app',
  timeout: 5000,
})

// 제품 관련 테스트 함수들
async function testProductService() {
  console.log('===== Product Service 테스트 시작 =====')
  
  // 1. 제품 목록 조회 테스트
  console.log('1. 제품 목록 조회 테스트')
  const productList = await productService.getProductList()
  console.log('제품 목록:', productList)

  // 2. 제품 생성 테스트
  console.log('2. 제품 생성 테스트')
  const createProductBody = {
    name: '풀스택 8기 테스트 상품',
    price: 15000,
    description: '테스트 상품 설명입니다.',
    images: ['https://example.com/...'],
    tags: ['테스트']
  }
  const newProduct = await productService.createProduct(createProductBody)
  console.log('생성된 제품:', newProduct)

  // 3. 특정 제품 조회 테스트
  console.log('3. 특정 제품 조회 테스트')
  const productId = newProduct.id // 방금 생성한 제품의 ID 사용
  const product = await productService.getProduct(productId)
  console.log('조회된 제품:', product)

  // 4. 제품 수정 테스트
  console.log('4. 제품 수정 테스트')
  const patchProductBody = {
    name: '수정된 테스트 상품',
    price: 20000,
    description: '수정된 상품 설명입니다.',
    images: ['https://example.com/...'],
    tags: ['수정됨']
  }
  const updatedProduct = await productService.patchProduct(productId, patchProductBody)
  console.log('수정된 제품:', updatedProduct)

  // 5. 제품 삭제 테스트
  console.log('5. 제품 삭제 테스트')
  const deleteResult = await productService.deleteProduct(productId)
  console.log('삭제 결과:', deleteResult)

  console.log('===== Product Service 테스트 완료 =====')
}

// 게시글 관련 테스트 함수들
async function testArticleService() {
  console.log('===== Article Service 테스트 시작 =====')

  // 1. 게시글 목록 조회 테스트
  console.log('1. 게시글 목록 조회 테스트')
  const articleList = await articleService.getArticleList()
  console.log('게시글 목록:', articleList)

  // 2. 게시글 생성 테스트
  console.log('2. 게시글 생성 테스트')
  const createArticleBody = {
    title: '테스트 게시글 제목입니다.',
    content: '테스트 게시글 내용입니다.',
    image: 'https://example.com/...'
  }
  const newArticle = await articleService.createArticle(createArticleBody)
  console.log('생성된 게시글:', newArticle)

  // 3. 특정 게시글 조회 테스트
  console.log('3. 특정 게시글 조회 테스트')
  const articleId = newArticle.id // 방금 생성한 게시글의 ID 사용
  const article = await articleService.getArticle(articleId)
  console.log('조회된 게시글:', article)

  // 4. 게시글 수정 테스트
  console.log('4. 게시글 수정 테스트')
  const patchArticleBody = {
    title: '수정된 테스트 게시글 제목입니다.',
    content: '수정된 테스트 게시글 내용입니다.',
    image: 'https://example.com/...'
  }
  const updatedArticle = await articleService.patchArticle(articleId, patchArticleBody)
  console.log('수정된 게시글:', updatedArticle)

  // 5. 게시글 삭제 테스트
  console.log('5. 게시글 삭제 테스트')
  const deleteResult = await articleService.deleteArticle(articleId)
  console.log('삭제 결과:', deleteResult)

  console.log('===== Article Service 테스트 완료 =====')
}

// 모든 테스트 실행
async function runAllTests() {
  try {
    await testProductService()
    await testArticleService()
  } catch (error) {
    console.error(error)
  }
}

// 테스트 실행
runAllTests()