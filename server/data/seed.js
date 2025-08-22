import mongoose from 'mongoose';
import data from './mock.js';
import Product from '../models/Product.js';
import { DATABASE_URL } from '../env.js';

mongoose.connect(DATABASE_URL);

await Product.deleteMany({}); //DB 안을 다 지우고
await Product.insertMany(data); //mock 파일 내용을 넣는다.

mongoose.connection.close();