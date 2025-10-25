import { Router } from 'express';
import prisma from '../../config/db.js';
import { asyncHandeler } from '../../utils/errorHandler.js';
const router = Router();

/* === 상품 api === */
router.get(
  '',
  asyncHandeler(async (req, res) => {
    const { page = 1, pageSize = 10, orderBy = 'newest', keyword = '' } = req.query;

    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;

    const products = await prisma.product.findMany({
      where: {
        // 검색 쿼리
        OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }],
      },
      orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
      skip: parseInt(offset),
      take: parseInt(limit),
    });
    res.send(products);
  })
);

router.get(
  '/:id',
  asyncHandeler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    res.send(product);
  })
);

router.post(
  '',
  asyncHandeler(async (req, res) => {
    const product = await prisma.product.create({
      data: req.body,
    });

    res.status(201).send(product);
  })
);

router.patch(
  '/:id',
  asyncHandeler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });

    res.send(product);
  })
);

router.delete(
  '/:id',
  asyncHandeler(async (req, res) => {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

export default router;
