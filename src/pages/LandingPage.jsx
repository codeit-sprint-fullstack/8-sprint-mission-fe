import { Link } from 'react-router-dom'
import '../styles/reset.css'
import '../styles/landing.css'

export default function LandingPage() {
  return (
    <>
        
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-text">
              <h2>일상의 모든 물건을<br />거래해 보세요</h2>
              <a href="/items" className="cta-btn">구경하러 가기</a>
            </div>
            <div className="hero-img">
              <img src="/img/panda-main.png" alt="판다 캐릭터" className="hero-img" />
            </div>
          </div>
        </section>

        <section className="card-section">
          <div className="card card-type1">
            <img src="/img/tshirt.png" alt="인기 상품 아이콘" className="card-img" />
            <div className="card-text">
              <p className="label">Hot item</p>
              <h3>인기 상품을<br /> 확인해 보세요</h3>
              <p className="desc">가장 HOT한 중고거래 물품을<br /> 판다 마켓에서 확인해 보세요</p>
            </div>
          </div>

          <div className="card card-type2">
            <div className="card-text">
              <p className="label">Search</p>
              <h3>구매를 원하는<br /> 상품을 검색하세요</h3>
              <p className="desc">구매하고 싶은 물품은 검색해서<br /> 쉽게 찾아보세요</p>
            </div>
            <img src="/img/search.png" alt="검색" className="card-img" />
          </div>

          <div className="card card-type3">
            <img src="/img/book.png" alt="등록" className="card-img" />
            <div className="card-text">
              <p className="label">Register</p>
              <h3>판매를 원하는<br /> 상품을 등록하세요</h3>
              <p className="desc">어떤 물건이든 판매하고 싶은 상품을<br />쉽게 등록하세요</p>
            </div>
          </div>
        </section>

        <section className="review-section">
          <div className="review-inner">
            <div className="review-text">
              <p>믿을 수 있는<br /> 판다마켓 중고 거래</p>
            </div>
            <div className="review-img">
              <img src="/img/panda-hi.png" alt="후기 대화하는 판다들" />
            </div>
          </div>
        </section>

      
    </>
  )
}