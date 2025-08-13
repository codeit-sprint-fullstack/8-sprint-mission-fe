# Sprint 5 피드백

## 총평

전반적으로 봤을때 아래의 부부는 좋았던 부분이였니다. 👍 👍

- 컴포넌트 기반 사고: 상품 카드를 BestProductCard, SaleProductCard로 분리하고, 데이터를 보여주는 부분을 ShowBestProductData, ShowSaleProductData로 나누는 등 컴포넌트 기반으로 UI를 구성하려는 시도가 돋보입니다. 
- 기능 구현: 페이지네이션, 검색, 정렬 등 주어진 요구사항 대부분을 기능적으로 잘 구현해냈습니다.

다만 아래의 내용을 추가로 고려해서 작성한다면 더 좋았을꺼 같아요!

1. 리액트 프로젝트 구조
    - 문제점: 현재 index.html에서 ```<script type="module">```을 사용해 각 컴포넌트(best-products.jsx, sale-products.jsx)를 직접 렌더링하고 있습니다. 이는 React의 장점인 'Single Page Application(SPA)'의 특징을 제대로 활용하지 못하는 구조이며, 컴포넌트 간 상태 공유나 라우팅 구현에 어려움을 겪게 됩니다.
    - 개선 방안
      - src/main.jsx와 같은 단일 진입점(entry point) 파일을 만드세요. 
      - main.jsx에서 ReactDOM.createRoot().render()를 사용하여 최상위 컴포넌트인 App.jsx를 렌더링합니다. 
      - App.jsx 내에서 react-router-dom을 사용하여 페이지 라우팅을 관리하고, 필요한 페이지 컴포넌트들을 렌더링하는 구조로 변경하는 것을 적극 권장합니다. 이렇게 하면 더 체계적이고 확장성 있는 프로젝트 구조를 갖출 수 있습니다.

2. 컴포넌트의 역할과 책임 분리
   - 문제점: ShowSaleProductData.jsx 컴포넌트가 너무 많은 역할을 담당하고 있습니다. 데이터 페칭, 각종 상태 관리(페이지, 정렬, 검색어 등), UI 렌더링 로직이 모두 한 파일에 집중되어 있어 복잡도가 높고 재사용이 어렵습니다.
   - 개선 방안
     - 데이터 페칭 로직 분리 (커스텀 훅): useEffect 내의 데이터 페칭 로직을 useProducts와 같은 커스텀 훅으로 분리해 보세요. 이 훅은 상품 목록, 로딩 상태, 에러 상태 등을 반환하고, 컴포넌트는 이 훅을 호출하여 사용하기만 하면 됩니다.
     - UI 컴포넌트 분리: 페이지네이션, 검색 바 등은 별도의 재사용 가능한 컴포넌트로 분리하는 것이 좋습니다. 예를 들어, Pagination 컴포넌트는 현재 페이지, 전체 페이지 수, 페이지 변경 핸들러 함수 등을 props로 받아 독립적으로 작동할 수 있습니다.

3. 코드 효율성 및 안정성 개선
    - API 호출 최적화: ShowSaleProductData.jsx에서 상품 목록을 가져오는 API 호출과 전체 페이지 수를 계산하기 위한 API 호출을 따로 하고 있습니다. /products API는 응답값에 totalCount를 포함하므로, API 호출을 한 번으로 줄여 불필요한 네트워크 요청을 방지할 수 있습니다. 
    - 에러 처리: 현재 try-catch 블록에서 console.error로 에러를 출력하고 있지만, 사용자에게 에러 상황을 알려주는 UI 처리가 부족합니다. Error Boundary 컴포넌트를 도입하거나, 에러 상태를 state로 관리하여 "데이터를 불러오는 데 실패했습니다."와 같은 메시지를 보여주는 것을 고려해 보세요.

전반적으로 React의 핵심 개념을 이해하고 활용하려는 노력이 엿보이는 좋은 코드였습니다. 위에 제안 드린 내용들을 다음 프로젝트에 적용해 보신다면, 코드의 품질을 한 단계 더 끌어올릴 수 있을 것이라 확신합니다.

수고 많으셨습니다!

### 개선사항 #1
.idea 폴더도 .gitignore에 추가해주는게 일반적입니다. 해당 폴더는 IDE 툴의 설정이 담겨져 있는데, 팀프로젝트가 진행되면 각자 IDE는 설정이 다르게 사용되길 선호하는데 불필요한 코드의 충돌이 발생합니다.

지금은 혼자 사용하는 레포지토리라 상관없지만, 팀프로젝트 진행시에는 꼭 .idea 폴더가 포함되지 않도록 처리해주는게 좋습니다 :)

### 개선사항 #2
```html
  <script type="module" src="/components/items/render/best-products.jsx"></script>
  <script type="module" src="/components/items/render/sale-products.jsx"></script>
```

HTML 파일에서 직접 JSX 파일을 로드하는 방식은 일반적인 React 프로젝트 구조와 다릅니다. 이 방식은 다음과 같은 단점이 있습니다.

1. 코드 분할(Code Splitting) 및 최적화의 어려움: Vite나 Webpack과 같은 번들러의 장점을 최대한 활용하기 어렵습니다. 
2. 상태 관리의 복잡성: 여러 컴포넌트가 독립적으로 렌더링되므로, 전역 상태 관리가 복잡해집니다. (예: Context API, Redux 등 사용의 어려움)
3. 유지보수성 저하: 프로젝트가 커질수록 컴포넌트 간의 의존성을 파악하기 어렵고, 코드 관리가 복잡해집니다.

다음엔 아래의 내용을 고려해 작업을 진행하면 좋을꺼 같습니다 :)

- src/main.jsx 또는 src/App.jsx와 같은 단일 진입점(Entry Point) 파일을 만드세요. 
  - 해당 파일에서 React-Router-Dom을 사용하여 라우팅을 설정하고, 페이지 컴포넌트를 렌더링하세요. 
- index.html에서는 번들링된 JavaScript 파일 하나만 로드하도록 구조를 변경하는 것이 좋습니다.

### 개선사항 #3
컴포넌트가 너무 많은 상태(useState)를 직접 관리하고 있습니다.
특히, 데이터 페칭과 관련된 로직(productData, orderData, pageData 등)은
별도의 커스텀 훅(예: useProducts)으로 분리하면 컴포넌트의 복잡도를 낮추고 재사용성을 높일 수 있습니다.

( Best, Sale 페이지 모두 어떤 Products를 가져오나의 차이<필터링 조건>일뿐 중복되는 코드가 많으므로 훅으로 설계하면 더 좋습니다. )

데이터 페칭 로직을 커스텀 훅으로 분리하면, 컴포넌트는 UI 렌더링에만 집중할 수 있어 코드의 가독성과 유지보수성이 향상됩니다.

### 개선사항 #4
```jsx
        async function getTotalPageCount(productNumber) { // 전체 페이지 수 계산
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
```
전체 페이지 수를 가져오기 위해 별도의 API를 호출하고 있습니다.
products API는 응답에 totalCount를 포함하므로, 이 값을 활용하면 불필요한 네트워크 요청을 줄일 수 있습니다.
fetchData 함수 내에서 응답받은 totalCount를 사용하여 setTotalPage를 호출하는 방식으로 리팩토링하는 것을 권장합니다.

### 개선사항 #5
```html
            <div className={'product-pagination-grid'}>
                <img
                    src="images/icons/ic_arrow_left.svg"
                    className="product-pagination-prepage"
                    onClick={() => {
                        // 이전 페이지가 1보다 작으면, 페이지 이동을 하지 않도록 설정
                        const newPage = pageData - 1 > 1 ? pageData - 1 : 1;
                        setPageData(newPage);
                    }}
                    alt="이전 페이지"
                />
                {/* TODO: 페이지네이션 아이콘 클릭 시 페이지 이동 기능 구현 */}
                {/* TODO: 반응형에 따른 페이지 네이션 기능을 구현 */}
                <div className={"product-pagination-btn"}>
                    <div className={"product-pagination-btn-text"}>{pageData}</div>
                </div>
                <div className={"product-pagination-btn"}>
                    <div className={"product-pagination-btn-text"}>{(pageData+1)}</div>
                </div>
                <div className={"product-pagination-btn"}>
                    <div className={"product-pagination-btn-text"}>{(pageData+2)}</div>
                </div>
                <div className={"product-pagination-btn"}>
                    <div className={"product-pagination-btn-text"}>{(pageData+3)}</div>
                </div>
                <div className={"product-pagination-btn"}>
                    <div className={"product-pagination-btn-text"}>{(pageData+4)}</div>
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
```

페이지네이션 UI 로직이 컴포넌트 내에 직접 작성되어 있습니다.
이 부분은 별도의 Pagination 컴포넌트로 분리하여 재사용성을 높이는 것이 좋습니다.
페이지네이션 컴포넌트는 현재 페이지, 전체 페이지 수, 페이지 변경 함수 등을 props로 받을 수 있도록 설계 후 만들면 재사용이 가능해집니다 !