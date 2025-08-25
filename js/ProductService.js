import axios from 'axios';
const BASE_URL = 'https://panda-market-api-crud.vercel.app';

export async function getProductList(page = 1, pageSize = 10, keyword = '') {
    try {
        const res = await axios.get(`${BASE_URL}/products`, {
            params: { page, pageSize, keyword },
        });
        return res.data;
    } catch (err) {
        console.error(
            'getProductList failed:',
            err.response
                ? `${err.response.status} ${err.response.statusText}`
                : err.message,
        );
    }
}

export async function getProduct(productId) {
    try {
        const res = await axios.get(`${BASE_URL}/products/${productId}`);
        return res.data;
    } catch (err) {
        console.error(
            'getProduct failed:',
            err.response
                ? `${err.response.status} ${err.response.statusText}`
                : err.message,
        );
    }
}

export async function createProduct({
    name,
    description,
    price,
    tags,
    images,
}) {
    try {
        const res = await axios.post(`${BASE_URL}/products`, {
            name,
            description,
            price,
            tags,
            images,
        });
        return res.data;
    } catch (err) {
        console.error(
            'createProduct failed:',
            err.response
                ? `${err.response.status} ${err.response.statusText}`
                : err.message,
        );
    }
}

export async function patchProduct(
    productId,
    { name, description, price, tags, images },
) {
    try {
        const res = await axios.patch(`${BASE_URL}/products/${productId}`, {
            name,
            description,
            price,
            tags,
            images,
        });
        return res.data;
    } catch (err) {
        console.error(
            'patchProduct failed:',
            err.response
                ? `${err.response.status} ${err.response.statusText}`
                : err.message,
        );
    }
}

export async function deleteProduct(productId) {
    try {
        const res = await axios.delete(`${BASE_URL}/products/${productId}`);
        return res.data;
    } catch (err) {
        console.error(
            'deleteProduct failed:',
            err.response
                ? `${err.response.status} ${err.response.statusText}`
                : err.message,
        );
    }
}
