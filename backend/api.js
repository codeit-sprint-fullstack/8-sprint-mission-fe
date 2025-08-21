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

// 상품 등록 API
router.post('/products', asyncHandler(async (req, res) => {
    // 등록할 상품의 데이터
    const newProductData = req.body;

    // 데이터를 DB에 저장
    const createProductData = await Product.create(newProductData);

    // 응답으로 생성된 상품 데이터를 반환
    res.status(201).send(createProductData);
}));

// 상품 상세 조회 API
router.get('/products/:id', asyncHandler( async (req, res) => {
    // 조회할 상품의 ID
    const id = req.params.id;

    // ID로 상품 데이터를 찾고, 필요한 필드만 선택
    const productData = await Product.findById(id)
        .select("id, name, description, price, tags, createdAt")
        .lean();

    // 선택된 상품의 데이터를 반환
    res.status(200).send(productData);
}));

// 상품 수정 API
router.patch('/products/:id', asyncHandler(async (req, res) => {
    // 수정할 상품의 ID와 데이터
    const id = req.params.id;
    const updateData = req.body;

    // ID로 기존 상품 데이터를 찾음
    const updatedProduct = await Product.findById(id);

    // 상품의 데이터를 수정 및 저장
    Object.keys(updateData).forEach((key) => {
        updatedProduct[key] = updateData[key];
    });
    updatedProduct.updatedAt = new Date();
    await updatedProduct.save();

    // 수정된 상품 데이터를 응답으로 반환
    res.status(200).send(updatedProduct);
}));