import { Router } from "express";
import Product from "./models/Product.model.js";

const router = Router();

// 등록 (POST /api/products)
router.post("/", async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;
    if (!name || !description || price == null) {
      return res
        .status(400)
        .json({ message: "name, description, price are required" });
    }
    const product = await Product.create({ name, description, price, tags });
    return res.status(201).json({ id: product.id });
  } catch (e) {
    next(e);
  }
});

// 상세 (GET /api/products/:id)
router.get("/:id", async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ message: "Product not found" });
    const { _id, name, description, price, tags, createdAt } = p;
    return res.json({
      id: _id.toString(),
      name,
      description,
      price,
      tags,
      createdAt,
    });
  } catch (e) {
    next(e);
  }
});

// 수정 (PATCH /api/products/:id)
router.patch("/:id", async (req, res, next) => {
  try {
    const allowed = ["name", "description", "price", "tags"];
    const updates = {};
    for (const k of allowed) if (k in req.body) updates[k] = req.body[k];

    const updated = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    return res.json({ id: updated.id });
  } catch (e) {
    next(e);
  }
});

// 삭제 (DELETE /api/products/:id)
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
});

// 목록 (GET /api/products?offset=&limit=&sort=recent&q=)
router.get("/", async (req, res, next) => {
  try {
    const offset = Math.max(parseInt(req.query.offset ?? "0", 10), 0);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit ?? "12", 10), 1),
      50
    );
    const q = req.query.q?.trim();
    const sort = req.query.sort;

    const filter = {};
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const [items, total] = await Promise.all([
      Product.find(filter)
        .sort(sort === "recent" ? { createdAt: -1 } : {})
        .skip(offset)
        .limit(limit)
        .select("name price createdAt")
        .lean(),
      Product.countDocuments(filter),
    ]);

    const data = items.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      createdAt: p.createdAt,
    }));
    res.json({
      items: data,
      total,
      offset,
      limit,
      hasMore: offset + data.length < total,
    });
  } catch (e) {
    next(e);
  }
});

// > +    const { _id, name, description, price, tags, createdAt } = p;
// +    return res.json({
// +      id: _id.toString(),
// +      name,
// +      description,
// +      price,
// +      tags,
// +      createdAt,
// +    });
// const {_id, ...rest } = p;
// resturn res.json({
//   id: ...,
//   ...rest
// })
// 이렇게 destructuring을 활용하는 방법도 있으니 참고해보세요 : -)

export default router;
