import Image from 'next/image';
import clsx from 'clsx';
import ic_back from '/public/icons/ic_back.svg';

import styles from '@/styles/components/Button.module.scss';

/*
  type: login | write | post | explore | goBack
  size: sm | md | lg
  bg: primary-100 | 200 | 300 | disabled
*/
const Button = ({ type = 'login', size = 'sm', bg = 'primary-100' }) => {
  const typeMap = {
    login: '로그인',
    write: '글쓰기',
    post: '등록',
    explore: '구경하러 가기',
  };

  if (type === 'goBack') {
    return (
      <button className={clsx(styles.button, styles.goBack, styles[size], styles[bg])}>
        <div className={styles.detail}>목록으로 돌아가기</div>
        <Image src={ic_back} alt="ic_back" width={24} height={24} />
      </button>
    );
  }

  return (
    <button className={clsx(styles.button, styles[type], styles[size], styles[bg])}>
      {typeMap[type]}
    </button>
  );
};

export default Button;
