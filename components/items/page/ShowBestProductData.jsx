import React, {useEffect, useState} from "react";
import productService from "../../../scripts/apis/ProductService.js";
import BestProductCard from "./productCard/bestProductCard.jsx";
import "../../../styles/items.css"

function ShowBestProductData({productNumber = 4}) {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        async function fetchData() {
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
            {/*TODO: "판매 중인 상품"과 동일한 너비를 가지도록 스타일 변경*/}
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