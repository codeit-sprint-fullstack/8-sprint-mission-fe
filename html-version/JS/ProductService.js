import axios from "axios"; // HTTP 요청용 라이브러리

// 상품 목록 가져오기, async/await 방식으로 비동기 처리
export async function getProductList(page = 1, pageSize = 10, keyword = "") {
  const apiUrl = "https://panda-market-api-crud.vercel.app/products";

  try {
    // await로 응답을 기다림, GET 요청으로 상품 목록 조회
    const response = await axios.get(apiUrl, {
      params: {
        page: page,
        pageSize: pageSize,
        keyword: keyword,
      },
    });

    console.log("상품 리스트:", response.data);
    return response.data;
  } catch (error) {
    // try 블록에서 에러 발생시 catch로 처리
    if (error.response) {
      console.error(
        `Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else {
      console.error("Network Error:", error.message);
    }
    throw error; // 에러를 다시 던져서 호출부에서 추가 처리 가능
  }
}

// 상품 상세 정보 가져오기
export async function getProduct(productId) {
  const url = `https://panda-market-api-crud.vercel.app/products/${productId}`;

  try {
    const response = await axios.get(url);

    console.log("상품 정보:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Error: ${error.response.status} - 상품을 찾을 수 없습니다`
      );
    } else {
      console.error("Network Error:", error.message);
    }
    throw error;
  }
}

// 새 상품 생성하기, POST 요청으로 서버에 데이터 전송
export async function createProduct(name, description, price, tags, images) {
  const url = "https://panda-market-api-crud.vercel.app/products";

  // 서버가 요구하는 상품 데이터 형식에 맞춰 객체 생성
  const productInfo = {
    name: name, // 상품명
    description: description, // 상품 설명
    price: price, // 가격 (숫자)
    tags: tags, // 태그 배열
    images: images, // 이미지 URL 배열
  };

  try {
    const response = await axios.post(url, productInfo);

    console.log("상품 생성 성공:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - 상품 생성 실패`);
    } else {
      console.error("Network Error:", error.message);
    }
    throw error;
  }
}

// 기존 상품 정보 수정하기, PATCH 요청 사용
export async function patchProduct(
  productId,
  name,
  description,
  price,
  tags,
  images
) {
  const url = `https://panda-market-api-crud.vercel.app/products/${productId}`;

  // 수정할 데이터들을 객체로 정리
  const updatedData = {
    name: name,
    description: description,
    price: price,
    tags: tags,
    images: images,
  };

  try {
    // PATCH는 전체가 아닌 일부 데이터만 수정할 때 사용
    const response = await axios.patch(url, updatedData);

    console.log("상품 수정 완료:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - 상품 수정 실패`);
    } else {
      console.error("Network Error:", error.message);
    }
    throw error;
  }
}

// 상품 삭제하기, DELETE 요청으로 서버에서 제거
export async function deleteProduct(productId) {
  const url = `https://panda-market-api-crud.vercel.app/products/${productId}`;

  try {
    // DELETE는 요청 바디 없이 URL의 ID만으로 삭제
    const response = await axios.delete(url);

    console.log("상품 삭제됨:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - 상품 삭제 실패`);
    } else {
      console.error("Network Error:", error.message);
    }
    throw error;
  }
}
