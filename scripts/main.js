import { getArticleList } from "./ArticleService.js";

getArticleList({ page: 1, pageSize: 5, keyword: '컴퓨터' })
    .then(data => {
        if (data) {
            console.log('게시글 목록:', data);
        } else {
            console.log('게시글을 불러오는 데 실패했습니다.');
        }
    });

import { getArticle } from "./ArticleService.js";

getArticle(335)
    .then(data => {
        if (data) {
            console.log('게시글 :', data);
        } else {
            console.log('게시글을 불러오는 데 실패했습니다.');
        }
    });

import { createArticle } from "./ArticleService.js";
createArticle({
    title: '테스트 제목',
    content: '테스트',
    image: 'https://example.com/panda.jpg'
})
    .then(data => {
        console.log('게시글 생성 성공:', data);
    })
    .catch(error => {
        console.error('에러 발생:', error.message);
    });

import { deleteArticle } from "./ArticleService.js";

deleteArticle(2057)
    .then(data => {
        if (data) {
            console.log('게시글 삭제 성공:', data);
        } else {
            console.error('에러 발생:', error.error.message);
        }
    });

import { getProductList } from "./ProductService.js";

getProductList({ page: 1, pageSize: 5, keyword: '전자' })
    .then(data => {
        if (data) {
            console.log('상품 목록:', data);
        } else {
            console.log('상품을 불러오는 데 실패했습니다.');
        }
    });

import { getProduct } from "./ProductService.js"

getProduct(1223)
    .then(product => {
        if (product) {
            console.log('상품 정보:', product);
        } else {
            console.log('상품 정보를 가져오지 못했습니다.');
        }
    });

import { createProduct } from "./ProductService.js";
createProduct({
    name: 'TEST',
    description: 'TEST',
    price: 129000,
    tags: ['TEST', 'TEST'],
    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
});

import { deleteProduct } from "./ProductService.js"

deleteProduct('1477');