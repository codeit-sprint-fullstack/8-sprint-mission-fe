import React from 'react'
import '../css/MarketPage.css'
import defaultImg from '../assets/img_default.png'

const ProductCard = ({ product }) => {
  return (
    <div className='productCard'>
      <img
        src={product.imageUrl || defaultImg}
        alt={product.title}
        className='productImage'
      />
      <h3 className='productTitle'>{product.title}</h3>
      <p className='productPrice'>
        {product.price ? product.price.toLocaleString() : 0}원
      </p>
      <div className='productLikes'>♡ {product.likes || 0}</div>
    </div>
  )
}

export default ProductCard
