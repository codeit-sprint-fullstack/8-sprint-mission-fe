import mongoose from 'mongoose';
import data from './mock.js';
import Product from '../models/Product.js';
import * as dotenv from 'dotenv';//배포용 환경변수 구성(.env)
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

await Product.deleteMany({}); //DB 안을 다 지우고
await Product.insertMany(data); //mock 파일 내용을 넣는다.

mongoose.connection.close();