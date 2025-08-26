import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Product from "./schema.js";

mongoose.connect(process.env.DATABASE_ADDRESS).then(console.log("Connected to DB"));

const router = express();
router.use(cors());
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

// 상품 데이터 등록 API
router.post('/products', asyncHandler(async (req, res) => {
    // 등록할 상품의 데이터
    const newProductData = req.body;

    // 데이터를 DB에 저장
    const createProductData = await Product.create(newProductData);
    if (!createProductData) { // 상품 데이터 생성에 실패한 경우, 에러 메시지 반환
        return res.status(400).send({ message: '상품 데이터 생성에 실패하였습니다.' });
    }

    // 응답으로 생성된 상품 데이터를 반환
    res.status(201).send(createProductData);
}));

// 상품 데이터 상세 조회 API
router.get('/products/:id', asyncHandler( async (req, res) => {
    // 조회할 상품 데이터의 ID
    const id = Number(req.params.id);

    // ID로 상품 데이터를 찾고, 필요한 필드만 선택
    const productData = await Product.findOne({ id })
        .select("id name description price tags createdAt");
    if (!productData) { // 상품 데이터가 존재하지 않는 경우, 에러 메시지 반환
        return res.status(404).send({ message: 'ID에 해당하는 상품을 찾을 수 없습니다.' });
    }

    // 선택된 상품의 데이터를 반환
    res.status(200).send(productData);
}));

// 상품 데이터 수정 API
router.patch('/products/:id', asyncHandler(async (req, res) => {
    // 수정할 상품 데이터의 ID와 데이터
    const id = Number(req.params.id);
    const updateData = req.body;

    // ID로 기존 상품 데이터를 찾음
    const updatedProduct = await Product.findOne({ id });
    if (!updatedProduct) { // 상품 데이터가 존재하지 않는 경우, 에러 메시지 반환
        return res.status(404).send({ message: 'ID에 해당하는 상품을 찾을 수 없습니다.' });
    }

    // 상품의 데이터를 수정
    Object.keys(updateData).forEach((key) => {
        updatedProduct[key] = updateData[key];
    });
    updatedProduct.updatedAt = new Date();

    // 수정된 상품의 데이터를 저장
    const isUpdatedProduct = await updatedProduct.save();
    if (!isUpdatedProduct) { // 상품 데이터 수정에 실패한 경우, 에러 메시지 반환
        return res.status(400).send({ message: '상품 데이터 수정에 실패하였습니다.' });
    }


    // 수정된 상품 데이터를 응답으로 반환
    res.status(200).send(updatedProduct);
}));

// 상품 데이터 삭제 API
router.delete('/products/:id', asyncHandler(async (req, res) => {
    // 삭제할 상품 데이터의 ID
    const id = Number(req.params.id);

    // ID로 상품 데이터를 찾고 삭제
    const isDeletedProduct = await Product.findOneAndDelete({ id });
    if (!isDeletedProduct) { // 상품 데이터를 삭제할 수 없는 경우, 에러 메시지 반환
        return res.status(400).send({ message: 'ID에 해당하는 상품을 찾을 수 없거나, 삭제에 실패하였습니다.' });
    }

    // 삭제된 경우, 성공 응답 송신
    res.status(204).send({ message: '상품 데이터가 성공적으로 삭제되었습니다.'});
}));

// 상품 데이터 목록 조회 API
router.get('/products', asyncHandler(async (req, res) => {
    // 쿼리 파라미터에서 데이터를 불러옴
    const sortData = req.query.sort || 'recent';
    const offsetData = parseInt(req.query.offset) || 1;
    const nameData = req.query.name || '';
    const descriptionData = req.query.description || '';

    // 모든 상품 데이터를 불러옴
    let printProducts = await Product.find({});
    if (!printProducts || printProducts.length === 0) { // 상품 데이터가 없는 경우, 에러 메시지 반환
        return res.status(404).send({ message: '상품 데이터가 존재하지 않습니다.' });
    }

    // 쿼리 파라미터를 이용하여, 정렬 기능 구현
    const compareFn =
        sortData === 'recent'
            ? (a, b) => a.updatedAt - b.updatedAt
            : (a, b) => b.updatedAt - a.updatedAt;
    printProducts = await printProducts.sort(compareFn);

    // 쿼리 파라미터를 이용하여, 검색 기능 구현
    printProducts = printProducts.filter((product) => {
        return (
            product.name.includes(nameData) &&
            product.description.includes(descriptionData)
        );
    })

    //쿼리 파라미터를 이용하여, Pagination 기능 구현
    if (offsetData) {
        printProducts = printProducts.slice(0, offsetData);
    }

    if (printProducts.length === 0) { // 필터링된 결과가 없는 경우, 에러 메시지 반환
        return res.status(404).send({ message: '검색 결과가 없습니다.' });
    }

    // 필터링된 결과 반환
    res.status(200).send(printProducts);
}));

router.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log(`Database is connected at ${process.env.DATABASE_ADDRESS}`);
})