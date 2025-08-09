import React, {useEffect, useState} from "react";
import productService from "../../../scripts/apis/ProductService.js";
import "../../../styles/items.css"
import SaleProductCard from "./productCard/saleProductCard.jsx";

function ShowSaleProductData({pageSize, productNumber, orderBy}) {
    const [productData, setProductData] = useState([]);
    const [orderData, setOrderData] = useState(orderBy || "recent");
    const [pageData, setPageData] = useState(pageSize || 1);
    const [totalPage, setTotalPage] = useState(9999999);
    const [keywordData, setKeywordData] = useState(""); // 실제 검색을 위한 상태값
    const [tempKeywordData, setTempKeywordData] = useState(""); // 입력창을 위한 상태값

    useEffect(() => {
        async function fetchData() {
            const options = {
                page: pageData,
                pageSize: productNumber,
                orderBy: orderData,
                keyword: keywordData,
            };

            try {
                const response = await productService.getProductList(options);
                setProductData(response.list || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setProductData([]);
            }
        }

        async function getTotalPageCount(productNumber) {
            try {
                // 전체 페이지만 불러오므로, 작동이 되는 URL을 하드코딩하여 사용
                const response = await fetch("https://panda-market-api.vercel.app/products?page=1&pageSize=1&orderBy=recent");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const totalCount = data.totalCount || 0;
                const totalPageCount = Math.ceil(totalCount / productNumber);
                setTotalPage(totalPageCount);
            } catch (error) {
                throw new Error(error);
            }
        }

        fetchData();
        getTotalPageCount(productNumber);
    }, [productNumber, orderData, pageData, keywordData]);

    return(
        <>
            {/*TODO: 헤더의 정렬 상태를 Figma 디자인과 동일하게 변경*/}
            <div className={"sale-product-header"}>
                <h2 className={"product-category"}>판매 중인 상품</h2>
                <div className="product-search-container">
                    <img
                        src="images/icons/ic_search.svg"
                        alt="검색"
                        className="search-icon"
                    />
                    <input
                        className="product-search-input"
                        placeholder="검색할 상품을 입력해주세요."
                        value={tempKeywordData}
                        onChange={e => setTempKeywordData(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                setPageData(1); // 검색 시 첫 페이지부터
                                setKeywordData(tempKeywordData); // 여기서만 keywordData 업데이트
                            }
                        }}
                    />
                    <p>{keywordData}</p>
                </div>
                <button className={"product-register-btn"}>
                    <span className={"product-register-btn-text"}>상품 등록하기</span>
                </button>
                <div className={"product-order-select-wrapper"}>
                    <select
                        className="product-order-select"
                        value={orderData}
                        onChange={(e) => setOrderData(e.target.value)}
                    >
                        <option value="recent">최신순</option>
                        <option value="favorite">좋아요순</option>
                    </select>
                    <img src={"/images/icons/ic_arrow_down.svg"} className={"product-order-select-arrow"} alt="화살표 아이콘"/>
                </div>
            </div>
            {/*TODO: "베스트 상품"과 같은 너비를 가지도록 스타일을 변경*/}
            <ul className="product-grid-container sale-product-grid">
                {productData.map((item) => (
                    <li key={item.id}>
                        <SaleProductCard item={item}/>
                    </li>
                ))}
            </ul>
            {/*TODO: 페이지네이션 스타일 정리 및 적용*/}
            <div className={'product-pagination-grid'}>
                <img
                    src="images/icons/ic_arrow_left.svg"
                    className="product-pagination-prepage"
                    onClick={() => {
                        const newPage = pageData - 1 > 1 ? pageData - 1 : 1;
                        setPageData(newPage);
                    }}
                    alt="이전 페이지"
                />
                {/*TODO: 스타일 정리 및 CSS화*/}
                {/*TODO: 페이지네이션 아이콘 클릭 시 페이지 이동 기능 구현*/}
                <div className={"product-pagination-btn"}>
                    <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#F9FAFB', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: 26, wordWrap: 'break-word'}}>{pageData}</div>
                </div>
                <div className={"product-pagination-btn"}>
                    <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B7280', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: 26, wordWrap: 'break-word'}}>{(pageData+1)}</div>
                </div>
                <div className={"product-pagination-btn"}>
                    <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B7280', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: 26, wordWrap: 'break-word'}}>{(pageData+2)}</div>
                </div>
                <div className={"product-pagination-btn"}>
                    <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B7280', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: 26, wordWrap: 'break-word'}}>{(pageData+3)}</div>
                </div>
                <div className={"product-pagination-btn"}>
                    <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#6B7280', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: 26, wordWrap: 'break-word'}}>{(pageData+4)}</div>
                </div>
                <img
                    src="images/icons/ic_arrow_left.svg"
                    className="product-pagination-nextpage"
                    onClick={() => {
                        // 다음 패이지가 totalPage보다 크면, 페이지 이동을 하지 않도록 설정
                        const newPage = pageData + 1 >= totalPage ? totalPage : pageData + 1;
                        setPageData(newPage);
                    }}
                    alt="다음 페이지"
                />
            </div>
        </>
    );
}

export default ShowSaleProductData;