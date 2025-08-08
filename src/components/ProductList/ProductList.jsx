import { useEffect, useState } from "react";
import ProductItem from "./ProductItem/ProductItem";
import { getProductList } from "@api/ProductService";
import style from './ProductList.module.scss';

function ProductList({ query = {}, itemsPerRow = 4, onLoad = () => { } }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductList(query).then((data) => {
            setProducts(data.list);
            onLoad(data);
        })
    }, [query]);

    return (
        <ul className={style.productList}
            style={{ ['--items-per-row']: itemsPerRow }}
        >
            {products.map((product) => (
                <ProductItem key={product.id} {...product} />
            ))}
        </ul>
    );
}

export default ProductList;