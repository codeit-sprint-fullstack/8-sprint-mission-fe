import express from 'express';
import mockSubs from './data/mock.js';

import mongoose from 'mongoose';
import { DATABASE_URL } from '../env.js';
import Subs from './models/Subscription.js'

mongoose.connect(DATABASE_URL).then(() => console.log('Connected to DB'));

const app = express();

//POST 리퀘스트에서 받는 body는 자동으로 json변환을 해주지 않는다.
//(보낼 때는 자동으로 해주시만)
//그래서 app.use로 json파일을 사용한다고 명시해주는게 필요하다.
app.use(express.json());

// function asyncHandler(handler){
//   return async function (req, res){
//     try{
//       await handler(req, res);
//     }catch (e){
//       console.log(e.name);
//       console.log(e.message);
//     }
//   }
// }

function asyncHandler(handler) {
  // 여기에 코드를 작성하세요.
  return async function (req, res){
    try{
      await handler(req, res);
    }catch (e){
      if(e.name == "ValidationError"){
        return res.status(400).send({message: e.message});
      }
      if(e.name == "CastError"){
        return res.status(404).send({message: 'Cannot find given id.'});
      }
      return res.status(500).send({message: e.message});
    }
  }
  //return asyncReqHandler;
}

app.get('/subscriptions', async (req, res) => {
  const sort = req.query.sort;
  const count  = Number(req.query.count) || 0;
  
  const sortOption = sort === 'price'
    ? {price : 'desc'}
    : {createdAt: 'desc'};

  const subs = await Subs.find().sort(sortOption).limit(count);//퀴리 메서드 체인이다. 모두 쿼리를 반환한다.
  
  res.send(subs);
});

app.get('/subscriptions/:id', async (req, res) => {
    const sub = await Subs.findById(req.params.id);//문자형으로 받기 때문에 숫자형변환 안한다. 
  if(sub){
    res.send(sub);
  } else{
    res.status(404).send({message : 'Cannot find given id.'});
  }
});

app.post('/subscriptions', asyncHandler(async (req, res) => {
  const newSubscription = await Subs.create(req.body);
  res.status(201).send(newSubscription);
}));

app.patch('/subscriptions/:id', asyncHandler(async (req, res) => {
    //양식 틀은 get과 비슷해서 복사 후 수정
  const id = req.params.id;
  const sub = await Subs.findById(id);
  if(sub){
    Object.keys(req.body).forEach((key)=>{
        sub[key] = req.body[key];
    });
    await sub.save(); //수정한 model을 MongoDB에 저장
    res.send(sub);
  } else{
    res.status(404).send({message : 'Cannot find given id.'});
  }
}));

app.delete('/subscriptions/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const sub = await Subs.findByIdAndDelete(id);//찾고 지우는 것까지 해준다.(편함)
  if(sub){
    res.sendStatus(204);//삭제 상태 코드는 204.
  } else{
    res.send({message : 'Cannot find given id.'});
  }
}));

app.listen(3000, () => console.log('Server Started'));