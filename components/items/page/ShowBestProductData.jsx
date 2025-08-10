import React, {useEffect, useState} from "react";
import productService from "../../../scripts/apis/ProductService.js";
import BestProductCard from "./productCard/bestProductCard.jsx";
import "../../../styles/items.css"

function ShowBestProductData({productNumber = 4}) {
    const [productData, setProductData] = useState([]); // 상품 데이터

    useEffect(() => {
        async function fetchData() { // 상품 데이터 불러오기
            const options = {
                page: 1,
                pageSize: productNumber,
                orderBy: "favorite",
            };

            try {
                const response = await productService.getProductList(options);
                setProductData(response.list || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setProductData([]);
            }
        }

        fetchData();
    }, [productNumber]);

    return(
        <>
            <h2 className={"product-category"}>베스트 상품</h2>
            {/* TODO: 기기의 크기에 따라 "중고 마켓의 카드 컴포넌트 반응형" 구현 */}
            <ul className="product-grid-container best-product-grid">
                {productData.map((item) => (
                    <li key={item.id}>
                        <BestProductCard item={item}/>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ShowBestProductData;