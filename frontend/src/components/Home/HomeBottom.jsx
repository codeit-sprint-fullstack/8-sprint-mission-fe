import img_homBottom from '../../assets/img_home/img_home_bottom.svg';
import style from './HomeBottom.module.css';

function HomeBottom() {
  return (
    <div className={style.bottom}>
      <div className="wrap">
        <h1>
          믿을 수 있는
          <br />
          판다마켓 중고 거래
        </h1>
        <img src={img_homBottom} alt="img_home_bottom" />
      </div>
    </div>
  );
}

export default HomeBottom;
