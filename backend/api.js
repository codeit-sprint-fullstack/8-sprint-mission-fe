import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import Product from "./schema.js";

mongoose.connect(process.env.DATABASE_ADDRESS).then(console.log("Connected to DB"));

const router = express();
router.use(express.json());

function asyncHandler(handler) {
  async function asyncReqHandler(req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: e.message });
      } else if (e.name === 'CastError') {
        res.status(404).send({ message: 'Cannot find given id.' });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  }

  return asyncReqHandler;
}

// router.get('/', asyncHandler( async (req, res) => {
//
// }));

// 상품 등록 API
router.post('/products', asyncHandler(async (req, res) => {
    const productData = req.body;
    const newProductData = await Product.create(productData);
    res.status(201).send(newProductData);
}));

