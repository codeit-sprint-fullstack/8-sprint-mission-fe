import { Link } from 'react-router-dom';
import img_home from '../../assets/img_home/img_home_top.svg'
import style from './MainVisual.module.css'

function MainVisual() {
  return(
    <main className={style.mainVisual}>
    <div className="wrap">
      <div className={style.mainTxt}>
        <h1 className={style.mainTitle}>
          <p>일상의 모든 물건을</p>
          <p>거래해 보세요</p></h1>
        <Link to='./items'><span className={style.itemsButton}>구경하러 가기</span></Link>
      </div>
      <img src={img_home} alt="img_home_top" />
    </div>
  </main>
  );
}

export default MainVisual;