import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'; //배포용 환경변수로 구성(.env)
dotenv.config();
import { fileURLToPath } from 'url';

import Product from './models/Product.js';

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('Connected to DB'));

const app = express();

//cors 설정 -> '프론트엔드 코드에서 배포된 API를 사용할 수 있게 하려면 CORS를 허용해야 한다' 
const corsOptions = {
  //origin: ['http://localhost:5173'] //프론트엔드 개발 로컬 주소
  origin: ['https://pandamarket-kwxe.onrender.com'] //render 배포 주소
}
app.use(cors(corsOptions));


//배포용 정적 파일 서빙 설정...
//ES module 방식에서는 경로 지정을 수동으로 설정해줘야 한다고 합니다;;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public', 'index.html')));
/*
새로고침 시에 SPA는 경로를 서버가 직접 인식하지 못한다고 합니다.
그래서 index.html로 리다이렉트 시키는게 정석이라고 하는데 
해줘야 하는 게 너무 많습니다 ㅜㅜ
*/

/*
POST 리퀘스트에서 받는 body는 자동으로 json변환을 해주지 않는다.
(보낼 때는 자동으로 해주시만)
그래서 app.use로 json파일을 사용한다고 명시해주는게 필요하다.
*/
app.use(express.json());

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
}

app.get('/products', async (req, res) => {
  const sort = req.query.orderBy;
  const count  = Number(req.query.pageSize) || 0;
  const offset  = ((Number(req.query.page) || 0) -1)*count;
  const search = req.query.keyword  ;
  
  //검색 필터 - 요구사항 (상품명, 상품 내용으로 검색)
  const filter = search
    ? { 
      $or: [ //$or를 쓰면 하나라도 일치 할 시 참 (and는 그냥 조건을 여러 개 넣으면 된다.)
        {name: { $regex: search, $options: 'i'}}, //options: 'i' => 대소문자 구분 x
        {description: { $regex: search, $options: 'i'}}, 
      ]
    } 
    : {};

  //최신순 정렬 지원합니다 - 요구사항.
  //좋아요 순 정렬은 구현하지 말라고 했지만 일단 만들어 놓기만..
  const sortOption = sort === 'favorite'
    ? {favoriteCount : 'desc'}
    : {createdAt: 'desc'};

  //퀴리 메서드 체인. (쿼리 반환)
  const items = await Product
    .find(filter)//검색 쿼리
    .sort(sortOption)//정렬 쿼리
    .skip(offset)//오프셋 방식 페이지네이션
    .limit(count);//페이지네이션

  res.send(items);
});

app.get('/products/:id', async (req, res) => {
    const item = await Product.findById(req.params.id);//문자형으로 받기 때문에 숫자형변환 안한다. 
  if(item){
    res.send(item);
  } else{
    res.status(404).send({message : 'Cannot find given id.'});
  }
});

app.post('/products', asyncHandler(async (req, res) => {
  const newItem = await Product.create(req.body);
  res.status(201).send(newItem);
}));

app.patch('/products/:id', asyncHandler(async (req, res) => {
  //양식 틀은 get과 비슷해서 복사 후 수정
  const id = req.params.id;
  const item = await Product.findById(id);
  if(item){
    Object.keys(req.body).forEach((key)=>{
        item[key] = req.body[key];
    });
    await item.save(); //수정한 model을 MongoDB에 저장
    res.send(item);
  } else{
    res.status(404).send({message : 'Cannot find given id.'});
  }
}));

app.delete('/products/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await Product.findByIdAndDelete(id);//찾고 지우는 것까지 해준다.(편함)
  if(item){
    res.sendStatus(204);//삭제 상태 코드는 204.
  } else{
    res.send({message : 'Cannot find given id.'});
  }
}));

//배포용 포트 구성
app.listen(process.env.PORT || 3000, () => console.log('Server Started'));