import express from "express";
import mongoose from "mongoose";
import cors from "cors";
//import { DATABASE_URL } from './env.js';
import * as dotenv from "dotenv";
dotenv.config();
import Products from "./models/Products.js";

const app = express();
app.use(cors());
app.use(express.json());

//mongoose.connect(DATABASE_URL).then(() => console.log('Connected to DB'));
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"));

function asyncHandler(handler) {
  // 라우터에 들어가는 핸들러 함수를 파라미터로 받아서
  return async function (req, res) {
    // 새로운 핸들러 함수를 반환한다. -> 파라미터로 받는 핸들러 함수와 동일하나 오류처리가 된 상태
    try {
      await handler(req, res);
    } catch (e) {
      // 각 오류에 맞는 오류 메세지를 보여준다
      if (e.name === "ValidationError") {
        res.status(400).send({ message: e.message });
      } else if (e.name === "CastError") {
        res.status(404).send({ message: "Cannot find given id." });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

app.get("/items", async (req, res) => {
  const sort = req.query.sort;
  const count = Number(req.query.count) || 0;

  const sortOption = { createdAt: sort === "oldest" ? "asc" : "desc" };
  const products = await Products.find().sort(sortOption).limit(count);

  res.send(products); // JS 객체를 받으면 자동으로 JSON으로 변환해서 돌려준다.
});

app.get("/items/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id); //mongo DB 에서 제공하는 함수(id는 string을 이용)
  if (product) {
    res.send(product);
  } else {
    // status 메소드를 이용해서 status 코드 설정가능
    res.status(404).send({ message: "Cannot find given id" });
  }
});

// 비동기 오류 처리를 위해 asyncHandler 함수로 감싸기
app.post(
  "/items",
  asyncHandler(async (req, res) => {
    const product = await Products.create(req.body);
    res.status(201).send(product);
  })
);

app.patch(
  "/items/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Products.findById(id);
    if (product) {
      // product 있다면 req로 들어온 body의 정보로 덮어씌워야함
      Object.keys(req.body).forEach((key) => {
        product[key] = req.body[key]; // 기존의 task 값을 body 값으로 변경
      });
      await product.save(); // DB에 저장
      res.send(product);
    } else {
      res.status(404).send({ message: "Cannot find given id" });
    }
  })
);

app.delete(
  "/items/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Products.findByIdAndDelete(id); // 객체를 찾아서 삭제까지 해주는 함수. 삭제를 한 객체, 없다면 null 반환
    if (product) {
      res.sendStatus(204); // 바디 없이 상태코드만 반환
    } else {
      res.status(404).send({ message: "Cannot find given id" });
    }
  })
);

// app.listen(3000, () => console.log('server started!'));
app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
