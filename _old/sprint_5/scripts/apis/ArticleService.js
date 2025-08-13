const BASE_URL_ARTICLE = "https://panda-market-api-crud.vercel.app/articles";

class ArticleService {
    // 정해진 조건에 따라 Article 목록을 가져오는 함수
    getArticleList(article_list_data) {
        const url = new URL(BASE_URL_ARTICLE);
        const params = new URLSearchParams(article_list_data);
        url.search = params.toString();

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(error => console.error(error));
    }

    // Article 목록을 가져오는 함수
    getArticle() {
        const url = new URL(BASE_URL_ARTICLE);

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(error => console.error(error));
    }

    // 사용자 입력 데이터에 따라 Article을 생성하는 함수
    createArticle(article_data) {
        /*
        article_data {
            image	UrlType[...]
            content*	ArticleContent[...]
            title*	ArticleTitle[...]
        }
        */

        const url = new URL(BASE_URL_ARTICLE);
        const options = {
            method: 'POST',
            body: JSON.stringify(article_data),
            headers: {'Content-Type': 'application/json'}
        };

        return fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(error => console.error(error));
    }

    // 사용자 입력 데이터에 따라 Article을 수정하는 함수
    patchArticle(article_id, patch_data) {
        const url = new URL(`${BASE_URL_ARTICLE}/${article_id}`);
        const options = {
            method: 'PATCH',
            body: JSON.stringify(patch_data),
            headers: {'Content-Type': 'application/json'}
        }

        return fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(error => console.error(error));
    }

    // Article을 삭제하는 함수
    deleteArticle(article_id) {
        const url = new URL(`${BASE_URL_ARTICLE}/${article_id}`);
        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };

        return fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(error => console.error(error))
    }
}

export default new ArticleService();