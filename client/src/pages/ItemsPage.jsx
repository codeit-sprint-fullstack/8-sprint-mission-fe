import { useState, useEffect, useContext } from 'react';
import useAsync from '../components/hooks/useAsync.jsx';
import LocaleContext from '../contexts/LocaleContext.js';

import HomeHeader from "../components/HomeHeader.jsx";
import HomeFooter from "../components/HomeFooter.jsx";
import ProductHeadline from '../components/Items/ProductHeadline.jsx';
import ProductList from '../components/Items/ProductList.jsx';
import PageButton from '../components/Items/PageButton.jsx';

import productApi from '../api/ProductService.js';


function Items() {

    const [bestProducts, setBestProducts] = useState([]);
    const [commonProducts, setCommonProducts] = useState([]);

    //삼화 미션 - 커스텀 훅 만들기 (GET 리퀘스트 오류, 지연 처리 훅)
    const [isLoading, loadingError, getItemsAsync] = useAsync(productApi.getProductList); 
    const [pageIdx, setPageIdx] = useState(1);
    const [order, setOrder] = useState('recent');
    const [search, setSearch] = useState('');
    

    const deviceType = useContext(LocaleContext);

    //화면 크기에 따라 다시 상품 목록을 받아옵니다.
    //목록 배열 스타일은 이번에는 CSS에서 관리하는 걸로 했습니다.
    useEffect(() => {
        handleBestProductLoad();
    }, []);

    useEffect(() => {
        handleCommonProductLoad(deviceType, pageIdx, order, search);
    }, [deviceType, pageIdx, order, search]);

    const handleBestProductLoad = async () => {
        const res1 = await productApi.getProductList(1, 4, 'favorite');
        setBestProducts(res1.list);
    }

    const handleCommonProductLoad = async(deviceType, pageIdx, order, search) => {
        //최신순, 좋아요순 으로 쿼리가 잘 넘어가지만 리스폰스 배열은 안 바뀝니다.
        //'recnet', 'favoite'만 orderBy의 쿼리로 받는 것으로 봐서 서버 api는 인지하는 것 같습니다.
        //그런데 리스폰스는 안 바뀌어서 상품 목록 순서가 안 바뀝니다.
        const setPageSize = {
            'mobile' : 6,
            'tablet' : 8,
            'desktop' : 10,
        }
        //페이지 로딩이 끝날 때까지 페이지 이동이 안되도록 막았습니다.
        const res = await getItemsAsync(pageIdx, setPageSize[deviceType], order, search);
        if(!res)return;
        setCommonProducts(res.list);
    }

    const handlePagechange = (idx) => {
        setPageIdx(idx);
    }
    
    const handleDropdown = (e) => {
        setOrder(e.target.value);
    }

    const handleSearchInput = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <HomeHeader deviceType={deviceType}/>
            <main className="with-header itemsMain">
                <div>
                    <section id='best-products'>
                        <div className='section-headline'>
                            <p>베스트 상품</p>
                        </div>
                        <ProductList items={bestProducts}/>
                    </section>

                    <section id='common-products'>
                        <ProductHeadline 
                            deviceType={deviceType} 
                            order={order}
                            onChangeOrder={handleDropdown}
                            search={search}
                            onChangeSearch={handleSearchInput}
                        />
                        {loadingError?.massege && <div>{loadingError.message}</div>}
                        <ProductList items={commonProducts}/>
                        <PageButton pageIdx={pageIdx} onPageChange={handlePagechange} disabled={isLoading}/>
                    </section>
                </div>
            </main> 
            <HomeFooter />
        </>
    );
}

export default Items;