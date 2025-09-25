import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/pages/LandingPage.module.scss';

import topImage from '/public/img_home_top.svg';
import imgSection1 from '/public/section1_img.svg';
import imgSection2 from '/public/section2_img.svg';
import imgSection3 from '/public/section3_img.svg';
import bottomImage from '/public/img_home_bottom.svg';

const HomePage = () => {
  return (
    <div className={styles.main}>
      <section className={styles.topBanner}>
        <div className={styles.wrapper}>
          <div className={styles.detail}>
            <div className={styles.title}>일상의 모든 물건을 거래해 보세요</div>
            <Link href="/items" className={styles.itemsBtn}>
              구경하러 가기
            </Link>
          </div>
          <Image src={topImage} alt="topImage" />
        </div>
      </section>
      <section className={styles.section1}>
        <div className={styles.wrapper}>
          <Image src={imgSection1} alt="section1Img" />
          <div className={styles.detail}>
            <div className={styles.tag}>Hot Item</div>
            <div className={styles['title-text']}>
              <div className={styles.title}>인기상품을 확인해 보세요</div>
              <div className={styles.text}>
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section2}>
        <div className={styles.wrapper}>
          <div className={styles.detail}>
            <div className={styles.tag}>Search</div>
            <div className={styles['title-text']}>
              <div className={styles.title}>구매를 원하는 상품을 검색하세요</div>
              <div className={styles.text}>
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </div>
            </div>
          </div>
          <Image src={imgSection2} alt="section2Img" />
        </div>
      </section>
      <section className={styles.section3}>
        <div className={styles.wrapper}>
          <Image src={imgSection3} alt="section3Img" />
          <div className={styles.detail}>
            <div className={styles.tag}>Register</div>
            <div className={styles['title-text']}>
              <div className={styles.title}>판매를 원하는 상품을 등록하세요</div>
              <div className={styles.text}>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.bottomBanner}>
        <div className={styles.wrapper}>
          <div className={styles.text}>
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </div>
          <Image src={bottomImage} alt="bottomImg" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
