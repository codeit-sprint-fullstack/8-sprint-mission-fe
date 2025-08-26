import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Landing0 from "@/assets/images/landing0.png";
import Landing1 from "@/assets/images/landing1.png";
import Landing2 from "@/assets/images/landing2.png";
import Landing3 from "@/assets/images/landing3.png";
import Landing4 from "@/assets/images/landing4.png";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  // TODO: top, bottom 요구사항에 맞게 수정
  return (
    <>
      <div className="top">
        <Link to="/items">
          <img src={Landing0} alt="Trade all everyday items" />
        </Link>
      </div>
      <div className="middle">
        <img src={Landing1} alt="Check out our popular products" />
        <img src={Landing2} alt="Search for the product you want to purchase" />
        <img src={Landing3} alt="Register the product you want to sell" />
      </div>
      <div className="bottom">
        <img src={Landing4} alt="Reliable Panda Market second hand trading" />
      </div>
    </>
  );
}

export default Home;
