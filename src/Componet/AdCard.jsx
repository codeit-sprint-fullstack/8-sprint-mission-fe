import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/AdCard.css';
import ad_1 from '../assets/Img_home_01.png';
import ad_2 from '../assets/Img_home_02.png';

const ad = [
  {
    title: '일상의 모든 물건을\n거래해 보세요',
    image: ad_1,
    buttonText: '구경하러 가기',
  },
  {
    title: '믿을 수 있는\n판다 중고거래',
    image: ad_2,
  },
];

export default function AdCard({ children = 0, onClick }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (children >= 0 && children < ad.length) {
      setItem(ad[children]);
    }
  }, [children]);

  if (!item) return null;

  let buttonElement = null;

  if (item.buttonText) {
    buttonElement = (
      <Link to='/items'>
        <button onClick={onClick} className='adBtn'>
          {item.buttonText}
        </button>
      </Link>
    );
  }

  return (
    <div className='adPage'>
      <div className='adContent'>
        <div className='adText'>
          {item.title.split('\n').map((line, i) => (
            <p key={i} className='adTitle'>
              {line}
            </p>
          ))}
          {buttonElement}
        </div>
        <img src={item.image} alt={item.title} className='adImage' />
      </div>
    </div>
  );
}
