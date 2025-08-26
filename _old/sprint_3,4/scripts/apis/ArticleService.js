// default export 선언
const article_service = {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle
}
export default article_service;

// 정해진 조건에 따라 Article 목록을 가져오는 함수
async function getArticleList(article_list_data) {
    const url = new URL("https://panda-market-api-crud.vercel.app/articles");
    const params = new URLSearchParams(article_list_data);
    url.search = params.toString();

    return await fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error(response.status)
            }
            return response.json()
        })
        .catch(error => console.error(error));
}

// Article 목록을 가져오는 함수
async function getArticle() {
    const url = new URL("https://panda-market-api-crud.vercel.app/articles");

    return await fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error(response.status)
            }
            return response.json()
        })
        .catch(error => console.error(error));
}

// 사용자 입력 데이터에 따라 Article을 생성하는 함수
async function createArticle(article_data) {
    /*
    article_data {
        image	UrlType[...]
        content*	ArticleContent[...]
        title*	ArticleTitle[...]
    }
    */
    
    const url = new URL("https://panda-market-api-crud.vercel.app/articles");

    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(article_data),
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => {
            if (!response.ok) {
                console.error(response.status)
            }
            return response.json()
        })
        .catch(error => console.error(error));
}

// 사용자 입력 데이터에 따라 Article을 수정하는 함수
async function patchArticle(article_id, patch_data) {
    const url = new URL(`https://panda-market-api-crud.vercel.app/articles/${article_id}`);

    return await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(patch_data),
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => {
            if (!response.ok) {
                console.error(response.status)
            }
            return response.json()
        })
        .catch(error => console.error(error));
}

// Article을 삭제하는 함수
async function deleteArticle(article_id) {
    const url = new URL(`https://panda-market-api-crud.vercel.app/articles/${article_id}`);

    return await fetch(url, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => {
            if (!response.ok) {
                console.error(response.status)
            }
            return response.json()
        })
        .catch(error => console.error(error))
}


