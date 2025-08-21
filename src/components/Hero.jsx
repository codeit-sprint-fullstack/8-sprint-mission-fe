import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="top">
      <div className="container hero-content">
        <div className="hero-text-group">
          <div className="hero-title">
            일상의 모든 물건을<br />거래해 보세요
          </div>
          <Link to="/market" className="hero-cta">
            구경하러 가기
          </Link>
        </div>
        <div className="hero-image"></div>
      </div>
    </div>
  );
}
