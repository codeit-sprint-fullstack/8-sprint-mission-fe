import axios from "axios";
import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService.js";
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./ProductService.js";

export const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app',
});


// ArticleService
function callgetArticleList(page, pageSize, keyword){
  getArticleList({
    page: page,
    pageSize: pageSize,
    keyword: keyword
  }).then(data => {
    console.log(data);
  }).catch((e) => console.log(e));
}

function callgetArticle(id){
  getArticle(id)
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
}

function callcreateArticle(title, content, image){
  createArticle({
    title: title,
    content: content,
    image: image
  })
    .then((data) => console.log('게시글 등록 성공', data))
    .catch((e) => console.error('게시글 등록 실패', e));
}

function callpatchArticle(id, title, content, image){
  patchArticle(id, { 
    title: title, 
    content: content,
    image: image
  })
    .then((data) => console.log('게시글 수정 완료', data))
    .catch((e) => console.error('게시글 수정 실패', e));
}

function calldeleteArticle(id){
  deleteArticle(id)
    .then(data => console.log('게시글 삭제 완료', data))
    .catch(err => console.error('게시글 삭제 실패', err));
}


// ProductService
function callgetProductList(page, pageSize, keyword){
  getProductList({
    page: page,
    pageSize: pageSize,
    keyword: keyword
  }).then(data => {
    console.log(data);
  }).catch((e) => console.log(e));
}

function callgetProduct(id){
  getProduct(id)
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
}

function callcreateProduct(name, description, price, tags = [], images = []){
  createProduct({
    name: name,
    description: description,
    price: price,
    tags: tags,
    images: images
  })
    .then((data) => console.log('제품 등록 성공', data))
    .catch((e) => console.error('제품 등록 실패', e));
}

function callpatchProduct(id, name, description, price, tags = [], images = [] ){
  patchProduct(id, { 
    name: name,
    description: description,
    price: price,
    tags: tags,
    images: images
  })
    .then((data) => console.log('제품 수정 완료', data))
    .catch((e) => console.error('제품 수정 실패', e));
}

function calldeleteProduct(id){
  deleteProduct(id)
    .then(data => console.log('제품 삭제 완료', data))
    .catch(err => console.error('제품 삭제 실패', err));
}

// test 
callgetArticleList(1,10, '');
callgetArticle(2170);
//callcreateArticle('새 글 제목', '새 글 내용', 'https://placehold.co/200');
//callpatchArticle(2152, '수정된 제목', '수정된 내용');
//calldeleteArticle(2172);

callgetProductList(1, 10, '');
callgetProduct(1542);
//callcreateProduct('맥북', '맥북 에어4', 1000000);
//callcreateProduct('pc', '조립형', 1500000, ['전자제품', '컴퓨터']);
//callpatchProduct(1564, '컴퓨터');
//calldeleteProduct(1564)