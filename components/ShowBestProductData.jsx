import React, {useEffect, useState} from "react";
import productService from "../scripts/apis/ProductService.js";
import ProductCard from "./ProductCard.jsx";

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
                console.log('API Response:', response); // 디버깅용
                setProductData(response.list || response || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setProductData([]);
            }
        }

        fetchData();
    }, [productNumber]);

    return(
        <>
            <h2>베스트 상품</h2>
            <ul style={{display: 'flex', listStyle: 'none', gap: '16px', padding: 0}}>
                {productData.map((item) => (
                    <li key={item.id}>
                        <ProductCard item={item}/>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ShowBestProductData;