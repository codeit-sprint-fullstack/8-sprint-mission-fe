import {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle,
} from './ArticleService.js';

import {
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct,
} from './ProductService.js';

// Article 호출 검증 (.then/.catch)
getArticleList(1, 5, 'test').then((data) =>
    console.log('getArticleList:', data),
);

getArticle(1).then((data) => console.log('getArticle:', data));

createArticle({
    title: 'A',
    content: 'B',
    image: 'https://via.placeholder.com/1',
})
    .then((created) => {
        console.log('createArticle:', created);
        return patchArticle(created.id, {
            title: 'A1',
            content: 'B1',
            image: created.image,
        });
    })
    .then((updated) => {
        console.log('patchArticle:', updated);
        return deleteArticle(updated.id);
    })
    .then((resp) => console.log('deleteArticle:', resp));

// Product 호출 검증 (async/await + try/catch)
(async () => {
    try {
        const list = await getProductList(1, 5, 'test');
        console.log('getProductList:', list);

        const prod = await getProduct(1);
        console.log('getProduct:', prod);

        const created = await createProduct({
            name: 'N',
            description: 'D',
            price: 100,
            tags: ['t1'],
            images: ['https://via.placeholder.com/1'],
        });
        console.log('createProduct:', created);

        const patched = await patchProduct(created.id, { price: 200 });
        console.log('patchProduct:', patched);

        const deleted = await deleteProduct(patched.id);
        console.log('deleteProduct:', deleted);
    } catch (err) {
        console.error('main.js 내부 에러:', err);
    }
})();
