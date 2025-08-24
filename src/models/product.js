import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '상품명은 필수입니다.'],
      minlength: [1, '상품명은 최소 1자 이상이어야 합니다.'],
      maxlength: [10, '상품명은 최대 10자 이내여야 합니다.']
    },
    description: {
      type: String,
      required: [true, '상품 소개는 필수입니다.'],
      minlength: [10, '상품 소개는 최소 10자 이상이어야 합니다.'],
      maxlength: [100, '상품 소개는 최대 100자 이내여야 합니다.']
    },
    price: {
      type: Number,
      required: [true, '판매 가격은 필수입니다.'],
      min: [1, '판매 가격은 1원 이상이어야 합니다.']
    },
    tags: {
      type: [String],
      validate: {
        validator: function (tags) {
          return tags.every(tag => tag.length <= 5)
        },
        message: '모든 태그는 5글자 이내여야 합니다.'
      }
    },
    likes: {
      type: Number,
      default: 0
    },
    imageUrl: {
      type: String,
      default: '/images/panda.svg'
    },
    inComplete: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('Product', ProductSchema)

export default Product
