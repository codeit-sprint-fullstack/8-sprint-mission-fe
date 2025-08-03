import axios from "axios"

//article 과 달리 awit와 try catch를 권장하여 그부분에 맞게 수정함
const url = axios.create({
        baseURL: 'https://panda-market-api-crud.vercel.app/'
    });


async function getProductList({page, pageSize, keyword}) {
    try{
        const product = await url.get('/products', {
            params:{
                page,
                pageSize,
                keyword
            }
            });
        return product.data;
    }
    catch(e){
        console.log('목록 불러오기 실패 =>', e.message);
    }
}

async function getProduct(id){
    try{
        const product = await url.get(`/products/${id}`); 
        return product.data;
    }
    catch(e){
        console.log('불러오기 실패 =>', e.message);
    }
}

async function createProduct({name, description, price, tags, images}) {
    try{
        const product = await url.post('/products', {
            params:{
                name, 
                description, 
                price, 
                tags, 
                images
            }
            
        });
        return product.data;
    }
    catch(e){
        console.log('생성 실패 =>', e.message);
    }
}

async function patchProduct(id,{name, description, price, tags, images}){
    try{
        const product = await url.patch(`/products/${id}`,{ 
            params:{
                name, 
                description, 
                price, 
                tags, 
                images
            }
        }); 
        return product.data;
    }
    catch(e){
        console.log('수정 실패 =>', e.message);
    }
}

async function deleteProduct(id){
    try{
        const product = await url.delete(`/products/${id}`); 
        return product.data;
    }
    catch(e){
        console.log('삭제 실패 =>', e.message);
    }
}

const products = {
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct
}
export default products;