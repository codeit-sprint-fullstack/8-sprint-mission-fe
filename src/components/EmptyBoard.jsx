import Image from 'next/image';
import styles from '@/styles/components/EmptyBoard.module.scss';

import img_replyEmpty from '/public/Img_replyEmpty.svg';

/*
  type: comment | article
*/
const EmptyBoard = ({ type = 'comment' }) => {
  let content;
  if (type === 'comment') {
    content = (
      <div className={styles.detail}>
        아직 댓글이 없어요, <br />
        지금 댓글을 달아보세요!
      </div>
    );
  } else {
    content = (
      <div className={styles.detail}>
        아직 게시글이 없어요, <br />
        지금 게시글을 만들어보세요!
      </div>
    );
  }

  return (
    <div className={styles.empty}>
      <div className={styles.wrapper}>
        <Image src={img_replyEmpty} alt="img_replyEmpty" width={140} height={140} />
        {content}
      </div>
    </div>
  );
};

export default EmptyBoard;
