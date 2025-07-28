import axios from "axios";


export function getArticleList(params = {}) {
  return axios.get('https://panda-market-api-crud.vercel.app/articles',{ params: { page: 1, pageSize: 5, keyword: '' } })
              .then((res) => res.data)
              .catch((error) => {
                console.error('오류')
                throw error;
              });
}

export function getArticle(id) {
  return axios.get(`https://panda-market-api-crud.vercel.app/articles/${id}`)
              .then((res) => res.data)
              .catch((error) => {
                console.error('오류')
                throw error;
              });
}

export function createArticle() {
  const articleData = {
    title: '제목',
    content: '내용',
    image: 'img url',
  };
  
  return axios.post('https://panda-market-api-crud.vercel.app/articles', articleData,)
              .then((res) => res.data)
              .catch((error) => {
                console.error('오류')
                throw error;
              });
}

export function patchArticle(id) {
  return axios.patch(`https://panda-market-api-crud.vercel.app/articles/${id}`)
              .then((res) => res.data)
              .catch((error) => {
                console.error('오류')
                throw error;
              });
}

export function deleteArticle(id) {
  return axios.delete(`https://panda-market-api-crud.vercel.app/articles/${id}`)
              .then((res) => res.data)
              .catch((error) => {
                console.error('오류')
                throw error;
              });
}