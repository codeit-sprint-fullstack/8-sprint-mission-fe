import Header from "./Header/Header";
import ProductList from "./ProductList/ProductList";
import '@styles/style.scss'
import ProductListController from "./ProductList/ProductListController/ProductListController";
import { useMemo, useState } from "react";
import PageButton from "@components/PageButton/PageButton";
import Footer from "./Footer/Footer";

function App() {
    const bestQueryMemo = useMemo(() => ({ pageSize: 4, orderBy: 'favorite' }), []);
    const [productListQuery, setProductListQuery] = useState({ page: 1, pageSize: 10, orderBy: 'recent', keyword: '' });
    const [totalCount, setTotalCount] = useState(50);

    return (
        <>
            <Header />
            <main>
                <section>
                    <ProductListController title={'베스트 상품'} />
                    <ProductList query={bestQueryMemo} />
                </section>
                <section>
                <ProductListController title={'판매중인 상품'} option={{ search: true, upload: true, orderBy: true }} setQuery={setProductListQuery} />
                <ProductList query={productListQuery} itemsPerRow={5} onLoad={(data) => setTotalCount(data.totalCount)} />
                <PageButton
                    nowPage={productListQuery.page}
                    totalCount={totalCount}
                    onChange={(newPage) =>
                        setProductListQuery(prev => ({ ...prev, page: newPage }))
                    }
                />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default App;