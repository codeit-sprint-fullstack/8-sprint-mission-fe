import { Router } from "express";
import create from "../controllers/products/create.js";
import getOne from "../controllers/products/getOne.js";
import update from "../controllers/products/update.js";

const router = Router();

router.post("/", create); // 상품 등록
router.get("/:id", getOne); // 상품 상세목록 조회
router.patch("/:id", update); // 상품 수정

export default router;
