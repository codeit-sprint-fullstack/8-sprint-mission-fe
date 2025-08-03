const BASE_URL = 'https://panda-market-api-crud.vercel.app';

export function getArticleList(page = 1, pageSize = 10, keyword = '') {
    const params = new URLSearchParams({ page, pageSize, keyword });
    return fetch(`${BASE_URL}/articles?${params}`, { method: 'GET' })
        .then((res) => {
            if (!res.ok) {
                console.error(
                    `Error fetching article list: ${res.status} ${res.statusText}`,
                );
                throw new Error(`HTTP ${res.status}`);
            }
            return res.json();
        })
        .then((data) => data)
        .catch((err) => {
            console.error('getArticleList failed:', err);
        });
}

export function getArticle(articleId) {
    return fetch(`${BASE_URL}/articles/${articleId}`, { method: 'GET' })
        .then((res) => {
            if (!res.ok) {
                console.error(
                    `Error fetching article ${articleId}: ${res.status} ${res.statusText}`,
                );
                throw new Error(`HTTP ${res.status}`);
            }
            return res.json();
        })
        .then((data) => data)
        .catch((err) => {
            console.error('getArticle failed:', err);
        });
}

export function createArticle({ title, content, image }) {
    return fetch(`${BASE_URL}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, image }),
    })
        .then((res) => {
            if (!res.ok) {
                console.error(
                    `Error creating article: ${res.status} ${res.statusText}`,
                );
                throw new Error(`HTTP ${res.status}`);
            }
            return res.json();
        })
        .then((data) => data)
        .catch((err) => {
            console.error('createArticle failed:', err);
        });
}

export function patchArticle(articleId, { title, content, image }) {
    return fetch(`${BASE_URL}/articles/${articleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, image }),
    })
        .then((res) => {
            if (!res.ok) {
                console.error(
                    `Error updating article ${articleId}: ${res.status} ${res.statusText}`,
                );
                throw new Error(`HTTP ${res.status}`);
            }
            return res.json();
        })
        .then((data) => data)
        .catch((err) => {
            console.error('patchArticle failed:', err);
        });
}

export function deleteArticle(articleId) {
    return fetch(`${BASE_URL}/articles/${articleId}`, {
        method: 'DELETE',
    })
        .then((res) => {
            if (!res.ok) {
                console.error(
                    `Error deleting article ${articleId}: ${res.status} ${res.statusText}`,
                );
                throw new Error(`HTTP ${res.status}`);
            }
            return res.text();
        })
        .then((data) => data)
        .catch((err) => {
            console.error('deleteArticle failed:', err);
        });
}
