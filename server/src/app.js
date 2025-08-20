import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path"; // join과 dirname 꼭 import 필요
import dotenv from "dotenv";
import cors from "cors";

// 현재 파일의 디렉토리 경로 구하기 (ES Modules용)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

function asyncHandler(handler) {
  async function asyncReqHandler(req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      console.log(e.name);
      console.log(e.message);
    }
  }

  return asyncReqHandler;
}

app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const { page = 1, limit, search, sort = "recent" } = req.query;
    console.log("받은 파라미터", { page, limit, search, sort });

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sortOption = sort === "recent" ? { createdAt: -1 } : { createdAt: 1 };

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const offset = (pageNum - 1) * limitNum;

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(offset)
      .limit(limitNum)
      .select("id name price createdAt");

    const total = await Product.countDocuments(query);

    const totalPage = Math.ceil(total / limitNum);

    res.send({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPage,
        hasNext: pageNum < totalPage,
        hasPrev: pageNum > 1,
      },
    });
  })
);

app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).select(
      "id name description price tags createdAt"
    );
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

app.post(
  "/products",
  asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);

    res.status(201).send(newProduct);
  })
);

app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      Object.keys(req.body).forEach((key) => [(product[key] = req.body[key])]);
      await product.save();
      res.send(product);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"));
app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
