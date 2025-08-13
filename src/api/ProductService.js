// 리퀘스트 통신은 JSON 파일로 주고 받습니다.
// Swagger에 등록된 API 문서를 참고하여 함수를 구현했습니다.

const url = 'https://panda-market-api-crud.vercel.app/products'

async function getProductList(page=1, pagesize=10, orderBy='recent', keyword=''){
    //검색 파라미터를 쿼리로 넘겼습니다.
    const result = await fetch(url+`?page=${page}&pageSize=${pagesize}&orderBy=${orderBy}&keyword=${keyword}`)
        .then(async (res) => {
            await resErrorCatch(res); //fetch에서 404, 500 리스폰스 에러는 따로 처리
            return res.json(); //중괄호 형식에서는 return 걸어주기
        })
        //.then((data) => JSON.stringify(data))
        .catch((err) => console.log(err));
    return result;
}   

async function getProduct(id){
    const result = await fetch(url+`/${id}`)
        .then(async(res) => {
            await resErrorCatch(res);
            return res.json();
        })
        //.then((data) => JSON.stringify(data))
        .catch((err) => console.log(err));
    return result;
}

//테스트용 body인 것 같아 가공은 안했습니다.
const postRqBody = {
  images: [
    "https://example.com/..."
  ],
  tags: [
    "전자제품"
  ],
  price: 0,
  description: "string",
  name: "상품 이름"
}

async function createProduct() {
    const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(postRqBody),
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(async (res) => {
            await resErrorCatch(res);
            return res.json();
        })
        //.then((data) => JSON.stringify(data))
        .catch((err) => console.log(err));
    return result;
}

async function patchProduct(id) {
    const result = await fetch(url+`/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(postRqBody),
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(async (res) => {
            await resErrorCatch(res);
            return res.json();
        })
        //.then((data) => JSON.stringify(data))
        .catch((err) => console.log(err));
    return result;
}

async function deleteProduct(id) {
    const result = await fetch(url+`/${id}`, {
            method: 'DELETE',
        })
        .then(async (res) => {
            await resErrorCatch(res);
            return res.json(); 
        })
        //.then((data) => JSON.stringify(data))
        .catch((err) => console.log(err));
    return result;
}

async function resErrorCatch(res){
    if (!res.ok) {
        //404, 500 에러는 리퀘스트 에러가 아니라 리스폰스 에러. fetch는 따로 처리해줘야 합니다.(axois는 같이 담아준다)
        const errorMessage = await res.text();
        throw new Error(`리스폰스 에러: ${res.status} - ${errorMessage}`);//수동으로 에러 던지기
    }
}

export default { getProduct, getProductList, createProduct, patchProduct, deleteProduct };