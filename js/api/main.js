import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService.js";

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
    .catch((e) => console.error('등록 실패', e));
}

function callpatchArticle(id, params={}){
  const { title, content, image } = params;
  patchArticle(id, { 
    title: title, 
    content: content,
    image: image
  })
    .then((data) => console.log('수정 완료', data))
    .catch((e) => console.error('수정 실패', e));
}

function calldeleteArticle(id){
  deleteArticle(id)
    .then(data => console.log('삭제 완료', data))
    .catch(err => console.error('삭제 실패', err));
}


// test 
callgetArticleList(1,10, '');
callgetArticle(2170);
callcreateArticle('새 글 제목', '새 글 내용', 'https://placehold.co/200');
callpatchArticle(2152, '수정된 제목', '수정된 내용');
calldeleteArticle(2172);
