import style from './HomeBanner.module.css';

function HomBanner( {bannerImg, badget, firstTitle, secondTitle, firstContent, secondContent, isReverse=false} ) {
  return (
    <section className={style.homeBanner}>
    <div className="wrap">
      <div className={`${style.banner} ${isReverse ? style.reverse : ""}`}>
        <img src={bannerImg} alt="img_home_01" />
        <div className={style.txtbox}>
          <span className={style.badget}>{badget}</span>
          <h2 className={style.title}>
            <p>{firstTitle}</p>
            <p>{secondTitle}</p></h2>
          <p className={style.content}>{firstContent}<br />{secondContent}</p>
        </div>
      </div>
    </div>
  </section>
  );
}

export default HomBanner;