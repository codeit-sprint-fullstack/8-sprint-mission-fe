import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <main>
            <section id="hero" className="banner">
                <div className="wrapper">
                    <h1>
                        일상의 모든 물건을
                        <br />
                        거래해보세요
                    </h1>
                    <Link to="/items" className="button pill-button">
                        구경하러 가기
                    </Link>
                </div>
            </section>

            <section id="features" className="wrapper">
                <div className="feature">
                    <img
                        src="/images/img_home_hot_item.svg"
                        alt="인기 상품"
                        width="50%"
                    />
                    <div className="feature-content">
                        <h2 className="feature-tag">Hot item</h2>
                        <h1>
                            인기 상품을
                            <br />
                            확인해 보세요
                        </h1>
                        <p className="feature-description">
                            가장 HOT한 중고거래 물품을
                            <br />
                            판다마켓에서 확인해보세요
                        </p>
                    </div>
                </div>

                <div className="feature">
                    <div className="feature-content">
                        <h2 className="feature-tag">Search</h2>
                        <h1>
                            구매를 원하는
                            <br />
                            상품을 검색하세요
                        </h1>
                        <p className="feature-description">
                            구매하고 싶은 물품은 검색해서
                            <br />
                            쉽게 찾아보세요
                        </p>
                    </div>
                    <img
                        src="/images/img_home_search.svg"
                        alt="상품 검색"
                        width="50%"
                    />
                </div>

                <div className="feature">
                    <img
                        src="/images/img_home_register.svg"
                        alt="상품 등록"
                        width="50%"
                    />
                    <div className="feature-content">
                        <h2 className="feature-tag">Register</h2>
                        <h1>
                            판매를 원하는
                            <br />
                            상품을 등록하세요
                        </h1>
                        <p className="feature-description">
                            어떤 물건이든 판매하고 싶은 상품을
                            <br />
                            쉽게 등록하세요
                        </p>
                    </div>
                </div>
            </section>

            <section id="bottomBanner" className="banner">
                <div className="wrapper">
                    <h1>
                        믿을 수 있는
                        <br />
                        판다마켓 중고거래
                    </h1>
                </div>
            </section>
        </main>
    );
}
