import mongoose from 'mongoose';

//스키마 정의
const ProductSchema = new mongoose.Schema(
  // 여기에 코드를 작성하세요.
  {
    name:{
      type: String,
      reqired: true,
      maxLength: 20,
      validate:{
        validator: function (title) {
          return title.length <= 10;
        },
        message: 'product name must be 10 words'
      }
    },
    price: {
      type: Number,
      required: true,
      validate:{
        validator: function (price) {
          return price >= 0;
        },
        message: 'Must much then 0'
      }
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: []
    },
    images: {
      type: [String],
      required: true,
    },
    favoriteCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
  //두번 째 파라미터로 timestamps를 넣으면, 
  // Mongoose가 알아서 createdAt, updatedAt을 생성, 관리해준다.
);

//모델은 해당 스키마를 다루는 것. 이름은 첫 대문자. 단수형으로 쓴다. 
const Product = mongoose.model('Product', ProductSchema);

export default Product;