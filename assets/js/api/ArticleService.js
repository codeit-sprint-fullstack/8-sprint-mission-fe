import { pandaMarketApi } from './main.js'

/**
 * 아티클 목록 조회
 * @returns {Promise<object>}
 */
function getArticleList () {
  return pandaMarketApi
  .get(`/articles`, {
    page: 1 ,
    pageSize: 10,
    keyword: ''
  })
  .then(res => res.data)
  .catch(err => {
    console.error(err.message)
  })
}

/**
 * 아티클 조회
 * @param {number} articleId 
 * @returns {Promise<object>}
 */
function getArticle (articleId) {
  return pandaMarketApi
  .get(`/articles/${articleId}`)
  .then(res => res.data)
  .catch(err => {
    console.error(err.message)
  })
}

/**
 * 아티클 생성
 * @param {object} createArticleBody 
 * @returns {Promise<object>}
 */
function createArticle (createArticleBody) {
  return pandaMarketApi
  .post('/articles', createArticleBody)
  .then(res => res.data)
  .catch(err => {
    console.error(err.message)
  })
}

/**
 * 아티클 수정
 * @param {number} articleId 
 * @param {object} patchArticleBody 
 * @returns {Promise<object>}
 */
function patchArticle (articleId, patchArticleBody) {
  return pandaMarketApi
  .patch(`/articles/${articleId}`, patchArticleBody)
  .then(res => res.data)
  .catch(err => {
    console.error(err.message)
  })
}

/**
 * 아티클 삭제
 * @param {number} articleId 
 * @returns {Promise<object>}
 */
function deleteArticle (articleId) {
  return pandaMarketApi
  .delete(`/articles/${articleId}`)
  .then(res => res.data)
  .catch(err => {
    console.error(err.message)
  })
}

export const articleService = { getArticleList, getArticle, createArticle, patchArticle, deleteArticle };