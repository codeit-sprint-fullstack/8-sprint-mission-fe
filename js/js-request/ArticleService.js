import axios from "axios";

// const instance = axios.create({
//   baseURL: 'https://panda-market-api-crud.vercel.app/docs'
// })

export function getArticleList(params = {}) {
  return instance.get('https://panda-market-api-crud.vercel.app/docs/#/Article',{ params: { page, pageSize, keyword } })
                  .then((res) => res.data)
                  .catch((error) => {
                    console.error('오류')
                    throw error;
                  });
}

export function getArticle(id) {
  return instance.get(`https://panda-market-api-crud.vercel.app/docs/#/Article/${id}`)
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
  
  return instance.post('https://panda-market-api-crud.vercel.app/docs/#/Article', articleData,)
                  .then((res) => res.data)
                  .catch((error) => {
                    console.error('오류')
                    throw error;
                  });
}

export function patchArticle(id) {
  return instance.patch(`https://panda-market-api-crud.vercel.app/docs/#/Article${id}`)
                            .then((res) => res.data)
                            .catch((error) => {
                              console.error('오류')
                              throw error;
                            });
}

export function deleteArticle(id) {
  return instance.delete(`https://panda-market-api-crud.vercel.app/docs/#/Article`)
                            .then((res) => res.data)
                            .catch((error) => {
                              console.error('오류')
                              throw error;
                            });
}