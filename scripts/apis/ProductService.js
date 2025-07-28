// defualt export 선언
const product_service = {
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct
}
export default product_service;

// 정해진 조건에 따라 Product 목록을 가져오는 함수
async function getProductList(product_list_data) {
    const url = new URL("https://panda-market-api-crud.vercel.app/products");
    const params = new URLSearchParams(product_list_data);
    url.search = params.toString();

    try{
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Product 목록을 가져오는 함수
async function getProduct() {
    const url = new URL("https://panda-market-api-crud.vercel.app/products");
    
    try{
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 사용자 입력 데이터에 따라 Product를 생성하는 함수
async function createProduct(article_data) {
    /*
    article_data {
        image	UrlType[...]
        content*	ArticleContent[...]
        title*	ArticleTitle[...]
    }
    */
    
    const url = new URL("https://panda-market-api-crud.vercel.app/products");

    try{
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(article_data),
            headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        return response.json();

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 사용자 입력 데이터에 따라 Product를 수정하는 함수
async function patchProduct(product_id, patch_data) {
    const url = new URL(`https://panda-market-api-crud.vercel.app/products/${product_id}`);

    try{
        const response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(patch_data),
            headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const response_result = await response.json();
        return response_result;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Product를 삭제하는 함수
async function deleteProduct(product_id) {
    const url = new URL(`https://panda-market-api-crud.vercel.app/articles/${product_id}`);
    
    try{
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const response_result = await response.json();
        return response_result;

    } catch (error) {
        console.error(error);
        throw error;
    }
}


