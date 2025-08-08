import Header from "@components/Header/Header";
import ProductList from "@components/ProductList/ProductList";
import '@styles/style.scss'
import ProductListController from "@components/ProductList/ProductListController/ProductListController";
import { useState, useEffect } from "react";
import PageButton from "@components/PageButton/PageButton";
import Footer from "@components/Footer/Footer";
import useResponsive from "@hooks/useResponsive";

function App() {
    const { size } = useResponsive();

    const bestPageSizeMap = { mobile: 1, tablet: 2, desktop: 4 };
    const listPageSizeMap = { mobile: 4, tablet: 6, desktop: 10 };

    const bestPageSize = bestPageSizeMap[size];
    const listPageSize = listPageSizeMap[size];

    const [productListQuery, setProductListQuery] = useState({
        page: 1,
        orderBy: 'recent',
        keyword: '',
        pageSize: listPageSize
    });

    const [totalCount, setTotalCount] = useState(50);

    useEffect(() => {
        setProductListQuery(prev => ({
            ...prev,
            page: 1,
            pageSize: listPageSize
        }));
    }, [size]);

    return (
        <>
            <Header />
            <main>
                <section>
                    <ProductListController title="베스트 상품" />
                    <ProductList query={{ pageSize: bestPageSize, orderBy: 'favorite' }} itemsPerRow={bestPageSize} />
                </section>
                <section>
                    <ProductListController
                        title="판매중인 상품"
                        option={{ search: true, upload: true, orderBy: true }}
                        setQuery={setProductListQuery}
                    />
                    <ProductList
                        query={productListQuery}
                        itemsPerRow={listPageSize / 2}
                        onLoad={(data) => setTotalCount(data.totalCount)}
                    />
                    <PageButton
                        nowPage={productListQuery.page}
                        pageSize={listPageSize}
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