import Image from "next/image";
import styles from "@/styles/components/BestArticleCard.module.scss";

import articleImg from "../../public/articleImg.svg";
import ic_medal from "../../public/icons/ic_medal.svg";
import ic_heart from "../../public/icons/ic_heart.svg";

const BestArticleCard = () => {
  return (
    <div className={styles.bestCard}>
      <div className={styles.header}>
        <Image src={ic_medal} alt="ic_medal" />
        <div className={styles.best}>Best</div>
      </div>
      <div className={styles.contents}>
        <div className={styles.title}>게시글 제목</div>
        <Image
          className={styles.contentsImg}
          src={articleImg}
          alt="articleImg"
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.nickAndLikes}>
          <div className={styles.nickName}>총명한판다</div>
          <div className={styles.likesWrapper}>
            <Image src={ic_heart} alt="ic_heart" />
            <div className={styles.likes}>9999+</div>
          </div>
        </div>
        <div className={styles.date}>2025. 09. 22</div>
      </div>
    </div>
  );
};

export default BestArticleCard;
