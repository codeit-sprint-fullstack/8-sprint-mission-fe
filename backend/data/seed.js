import mongoose from "mongoose";
import data from './mock.js';
import Products from "../models/Products.js";
//import { DATABASE_URL } from "../env.js";
import * as dotenv from 'dotenv';
dotenv.config();

//mongoose.connect(DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL);

await Products.deleteMany({});
await Products.insertMany(data);

mongoose.connection.close();