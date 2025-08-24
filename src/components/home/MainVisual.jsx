import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import img_home from "../../assets/img_home/img_home_top.svg";
import style from "./MainVisual.module.css";
import BasicButton from "../Atoms/BasicButton";

function MainVisual() {
  const isMobile = useMediaQuery({ maxWidth: 743 });
  const isTablet = useMediaQuery({ minWidth: 744, maxWidth: 1199 });

  let width = "100%"; // 기본
  if (isTablet) width = "357px"; // Tablet
  if (isMobile) width = "240px"; // Mobile

  return (
    <main className={style.mainVisual}>
      <div className="wrap">
        <div className={style.mainTxt}>
          <h1 className={style.mainTitle}>
            <p>일상의 모든 물건을</p>
            <p>거래해 보세요</p>
          </h1>
          <Link to="./items">
            <BasicButton
              name="구경하러 가기"
              widthSize={width}
              heightSize="56px"
              fontSize="20px"
              shape="round"
            />
          </Link>
        </div>
        <img src={img_home} alt="img_home_top" />
      </div>
    </main>
  );
}

export default MainVisual;
