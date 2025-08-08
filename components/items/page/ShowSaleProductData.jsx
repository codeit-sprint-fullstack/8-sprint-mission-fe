import React, {useEffect, useState} from "react";
import productService from "../../../scripts/apis/ProductService.js";
import BestProductCard from "./productCard/bestProductCard.jsx";
import "../../../styles/items.css"

function ShowBestProductData({page, productNumber, orderBy}) {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const options = {
                page: page,
                pageSize: productNumber,
                orderBy: orderBy,
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
            <h2 className={"product-category"}>판매 중인 상품</h2>
            <ul style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '16px',
                listStyle: 'none',
                padding: 0
            }}>
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