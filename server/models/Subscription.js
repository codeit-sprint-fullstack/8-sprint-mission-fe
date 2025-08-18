import mongoose from 'mongoose';

//import { DATABASE_URL } from './env.js';

//mongoose.connect(DATABASE_URL).then(() => console.log('Connected to DB'));

//스키마 정의
const SubscriptionSchema = new mongoose.Schema(
  // 여기에 코드를 작성하세요.
  {
    name:{
        type: String,
        reqired: true,
        maxLength: 20,
        validate:{
          validator: function (title) {
            return title.split(' ').length > 1;
          },
          message: 'Must contain at least 2 words.'
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
    cycle: {
      type: String,
      required: true,
      validate:{
        validator: function (cycle) {
          return cycle === 'm ' || cycle === 'y';
        },
        message: 'cycle is must m or y'
      }
    },
    firstPaymentDate: {
      type: Date,
      required: true,
    },
    memo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
  //두번 째 파라미터로 timestamps를 넣으면, 
  // Mongoose가 알아서 createdAt, updatedAt을 생성, 관리해준다.
);

//모델은 해당 스키마를 다루는 것. 이름은 첫 대문자. 단수형으로 쓴다. 
const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;