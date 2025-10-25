import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './api/index.js';

dotenv.config();
const corsOptions = {
  origin: ['http://localhost:3000'], //프론트엔드 개발 로컬 주소
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server Started');
  console.log(`Post: http://localhost:${PORT}`); //로컬 호스트 포트
});
