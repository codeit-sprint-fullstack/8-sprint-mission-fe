import { Router } from 'express';
import prisma from '../../config/db.js';
import { asyncHandeler } from '../../utils/errorHandler.js';
const router = Router();

/* === 게시글 api === */
router.get(
  '',
  asyncHandeler(async (req, res) => {
    const { page = 1, pageSize = 10, orderBy = 'recent', keyword = '' } = req.query;

    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;

    const articles = await prisma.article.findMany({
      where: {
        // 검색 쿼리
        OR: [{ title: { contains: keyword } }, { content: { contains: keyword } }],
      },
      orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
      skip: parseInt(offset),
      take: parseInt(limit),
    });
    res.send(articles);
  })
);

router.get(
  '/:id',
  asyncHandeler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: { id },
    });
    res.send(article);
  })
);

router.post(
  '',
  asyncHandeler(async (req, res) => {
    const article = await prisma.article.create({
      data: req.body,
    });

    res.status(201).send(article);
  })
);

router.patch(
  '/:id',
  asyncHandeler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.update({
      where: { id },
      data: req.body,
    });

    res.send(article);
  })
);

router.delete(
  '/:id',
  asyncHandeler(async (req, res) => {
    const { id } = req.params;
    await prisma.article.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

export default router;
