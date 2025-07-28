import axios from "axios";

const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app/docs'
})

export async function getArticleList(params = {}) {
  const res = await instance.get('/#/Article',{ params })
                            .then((res) => res.data)
                            .catch((error) => console.log('오류'));
}

export async function getArticle() {
  const res = await instance.get('/#/Article')
                            .then((res) => res.data)
                            .catch((error) => console.log('오류'));
}

export async function createArticle() {
  const surveyData = {
    title,
    content,
    image,
  };
  
  const res = await instance.post('/#/Article', surveyData,)
                            .then((res) => res.data)
                            .catch((error) => console.log('오류'));
}

export async function patchArticle() {
  const res = await instance.patch('/#/Article')
                            .then((res) => res.data)
                            .catch((error) => console.log('오류'));
}

export async function deleteArticle() {
  const res = await instance.delete('/#/Article')
                            .then((res) => res.data)
                            .catch((error) => console.log('오류'));
}