import axios from "axios"

// 다른 언어에서 쓰던 get_article_list 형식이 편한데 요구사항에 getArticleList이런식 
// 작성을 요구해서 이런 식으로 작성함
// .then, .catch를 이용함
const url = axios.create({
    baseURL: 'https://panda-market-api-crud.vercel.app/',
});

async function getArticleList({page, pageSize, keyword}){
    return url.get('/articles',{
        params:{
            page,
            pageSize,
            keyword
        }
    })
    .then(e => {
        if (e.status >= 200 && e.status < 300){
            return e.data;
        }
        else{
            console.log('오류 =>', e.statusText);
        }

    })
    .catch(e => {
        console.log('목록 불러오기 실패 => ', e.message);
    });
}

async function getArticle(id){
    return url.get(`/articles/${id}`)
    .then(e => {
        if(e.status >= 200 && e.status < 300){
            return e.data;
        }
        else{
            console.log('오류 =>', e.statusText);
        }
    })
    .catch(e => {
        console.log('불러오기 실패 => ', e.message);
    });
}
async function createArticle({title, content, image}) {
    return url.post('/articles',{
        params:{
            title,
            content,
            image
        }
    })
    .then(e => {
        if(e.status >= 200 && e.status < 300){
            return e.data;
        }
        else{
            console.log('오류 =>', e.statusText);
        }
    })
    .catch(e => {
        console.log('생성 실패=>', e.message);
    });
}

async function patchArticle(id, {title, content, image}) {
    return url.patch(`/articles/${id}`, {params:{title, content, image}})
    .then(e => {
        if(e.status >= 200 && e.status < 300){
            return e.data;
        }
        else{
            console.log('오류 =>', e.statusText);
        }
    })
    .catch(e => {
        console.log('수정 실패 =>', e.message);
    });
}

async function deleteArticle(id) {
    return url.delete(`/articles/${id}`)     
    .then(e => {
        if(e.status >= 200 && e.status < 300){
            return e.data;
        }
        else{
            console.log('오류 =>', e.statusText);
        }
    })
    .catch(e => {
        console.log('삭제 실패 => ', e.message);
    });

}
const articles = {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle
};

export default articles; 