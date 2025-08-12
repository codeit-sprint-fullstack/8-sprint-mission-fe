import styles from '../../styles/components/atoms/LikeButton.module.css';

export function LikeButton({ favoriteCount = 0, isLiked = false }) {
  return (
    <button className={styles.likeButton}>
      <img
        src={isLiked ? '/product-list/like-icon-filled.svg' : '/product-list/like-icon.svg'}
        alt="좋아요"
      />
      <span>{favoriteCount}</span>
    </button>
  );
}
