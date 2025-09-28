import Image from 'next/image';
import styles from '@/styles/components/Footer.module.scss';

import ic_facebook from '/public/icons/ic_social/ic_facebook.svg';
import ic_twitter from '/public/icons/ic_social/ic_twitter.svg';
import ic_youtube from '/public/icons/ic_social/ic_youtube.svg';
import ic_instagram from '/public/icons/ic_social/ic_instagram.svg';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>©codeit - 2025</div>
      <div className={styles.legal}>
        <div className={styles.privacy}>Privacy Policy</div>
        <div className={styles.faq}>FAQ</div>
      </div>
      <div className={styles.socials}>
        <Image className={styles.socialIcon} src={ic_facebook} alt="ic_facebook" />
        <Image className={styles.socialIcon} src={ic_twitter} alt="ic_twitter " />
        <Image className={styles.socialIcon} src={ic_youtube} alt="ic_youtube" />
        <Image className={styles.socialIcon} src={ic_instagram} alt="ic_instagram" />
      </div>
    </div>
  );
};

export default Footer;
