// src/components/atom/Icons/LikeIcon.jsx
import "./LikeIcon.css";

function LikeIcon({ 
  count = 0, 
  size = 16, 
  className = "" 
}) {
  return (
    <div className={`likeIcon ${className}`}>
      <span className="heartIcon">♡</span>
      <span className="likeCount">{count}</span>
    </div>
  );
}

export default LikeIcon;