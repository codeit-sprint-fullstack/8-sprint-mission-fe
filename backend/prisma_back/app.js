import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

//cors 설정
const corsOptions = {
  origin: ['http://localhost:5173'] //프론트엔드 개발 로컬 주소
  //origin: ['https://pandamarket-kwxe.onrender.com'] //render 배포 주소
}
app.use(cors(corsOptions));


app.get('/products', async (req, res) => {

  const { page = 1, pageSize = 10, orderBy = 'newest', keyword='' } = req.query;

  const limit  = parseInt(pageSize);
  const offset  = (parseInt(page) -1) * limit;
  
  const users = await prisma.product.findMany({
    orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : {favoriteCount: 'desc'},
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.send(users);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.product.findUnique({
    where: { id },
  });
  res.send(user);
});

app.post('/products', async (req, res) => {
  // 리퀘스트 바디 내용으로 유저 생성
  const user = await prisma.product.create({
    data: req.body,
  });

  res.status(201).send(user);
});

app.patch('/products/:id', async (req, res) => {
  const { id } = req.params;
  // 리퀘스트 바디 내용으로 id에 해당하는 유저 수정
  const user = await prisma.product.update({
    where: {id},
    data: req.body,
  });

  res.send(user);
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  // id에 해당하는 유저 삭제
  await prisma.product.delete({
    where: {id},
  });
  res.sendStatus(204);
});

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));