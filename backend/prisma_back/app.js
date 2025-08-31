import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  const { offset = 0, limit = 10, order = 'newest' } = req.query;
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.send(users);
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  res.send(user);
});

app.post('/users', async (req, res) => {
  // 리퀘스트 바디 내용으로 유저 생성
  const user = await prisma.user.create({
    data: req.body,
  });

  res.status(201).send(user);
});

app.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  // 리퀘스트 바디 내용으로 id에 해당하는 유저 수정
  const user = await prisma.user.update({
    where: {id},
    data: req.body,
  });

  res.send(user);
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  // id에 해당하는 유저 삭제
  await prisma.user.delete({
    where: {id},
  });
  res.sendStatus(204);
});

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));