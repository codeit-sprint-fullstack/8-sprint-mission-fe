const BASE_URL_PRODUCT="https://panda-market-api-crud.vercel.app/products";

class ProductService {
    // 정해진 조건에 따라 Product 목록을 가져오는 함수
    async getProductList(product_list_data) {
        // 문자열로 직접 URL 구성 (가장 확실한 방법)
        const baseURL = 'https://panda-market-api.vercel.app/products';

        // orderBy가 작동하지 않아, 쿼리 설정을 직접 처리하게 되었습니다.
        const queryParams = [];
        if (product_list_data.page) queryParams.push(`page=${product_list_data.page}`);
        if (product_list_data.pageSize) queryParams.push(`pageSize=${product_list_data.pageSize}`);
        if (product_list_data.orderBy) queryParams.push(`orderBy=${product_list_data.orderBy}`);

        const queryString = queryParams.join('&');
        const fullUrl = queryString ? `${baseURL}?${queryString}` : baseURL;

        try {
            const response = await fetch(fullUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    // Product 목록을 가져오는 함수
    async getProduct() {
        const url = new URL(BASE_URL_PRODUCT);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // 사용자 입력 데이터에 따라 Product를 생성하는 함수
    async createProduct(article_data) {
        /*
        article_data {
            image	UrlType[...]
            content*	ArticleContent[...]
            title*	ArticleTitle[...]
        }
        */

        const url = new URL(BASE_URL_PRODUCT);
        const options = {
            method: 'POST',
            body: JSON.stringify(article_data),
            headers: {'Content-Type': 'application/json'}
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json();

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // 사용자 입력 데이터에 따라 Product를 수정하는 함수
    async patchProduct(product_id, patch_data) {
        const url = new URL(`${BASE_URL_PRODUCT}/${product_id}`);
        const options = {
            method: 'PATCH',
            body: JSON.stringify(patch_data),
            headers: {'Content-Type': 'application/json'}
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Product를 삭제하는 함수
    async deleteProduct(product_id) {
        const url = new URL(`${BASE_URL_PRODUCT}/${product_id}`);
        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new ProductService();

