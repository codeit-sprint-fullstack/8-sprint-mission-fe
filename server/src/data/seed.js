import mongoose from "mongoose";
import mockProducts from "./mock.js";
import Product from "../models/Product.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path"; // join과 dirname 꼭 import 필요
import dotenv from "dotenv";

// 현재 파일의 디렉토리 경로 구하기 (ES Modules용)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, ".env") });

mongoose.connect(process.env.DATABASE_URL);

await Product.deleteMany({});
await Product.insertMany(mockProducts);

mongoose.connection.close();
