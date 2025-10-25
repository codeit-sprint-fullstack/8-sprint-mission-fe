import { Router } from 'express';
import prisma from '../../config/db.js';
import { asyncHandeler } from '../../utils/errorHandler.js';
const router = Router();

/* === 댓글 api === */
/* === 상품 댓글 api  === (조회, 생성) */
router.get(
  '/products/:id/comments',
  asyncHandeler(async (req, res) => {
    const productId = req.params.id;
    const { pageSize = 10, lastId = '', orderBy = 'recent', keyword = '' } = req.query;

    const limit = parseInt(pageSize);

    //cursor 방식 페이지네이션
    const comments = await prisma.comment.findMany({
      where: { productId },
      skip: lastId ? 1 : 0, //cursor 항목 제외
      take: parseInt(limit),
      ...(lastId && { cursor: { id: lastId } }), //lastId를 쿼리로 받으면 커서 사용.

      //댓글에는 아직 favoriteCount가 없지만 일단 구현했습니다.(쿼리로 전달하지 말아주세요)
      orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
    });
    res.json(comments);
  })
);

router.get(
  '/products/:productId/comments/:id',
  asyncHandeler(async (req, res) => {
    const { productId, id } = req.params;
    const comments = await prisma.comment.findMany({
      where: {
        productId,
        id,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(comments);
  })
);

router.post(
  '/products/:id/comments',
  asyncHandeler(async (req, res) => {
    const productId = req.params.id;
    const { content } = req.body;

    const comment = await prisma.comment.create({
      data: {
        content,
        product: {
          connect: { id: productId },
        },
      },
    });
    res.status(201).json(comment);
  })
);

/* === 게시글 댓글 api === (조회, 생성) */
router.get(
  '/articles/:id/comments',
  asyncHandeler(async (req, res) => {
    const articleId = req.params.id;
    const { pageSize = 10, lastId = '', orderBy = 'recent', keyword = '' } = req.query;

    const limit = parseInt(pageSize);

    //cursor 방식 페이지네이션
    const comments = await prisma.comment.findMany({
      where: { articleId },
      skip: lastId ? 1 : 0, //cursor 항목 제외
      take: limit,
      ...(lastId && { cursor: { id: lastId } }), //lastId를 쿼리로 받으면 커서 사용.

      orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
    });
    res.json(comments);
  })
);

router.get(
  '/articles/:articleId/comments/:id',
  asyncHandeler(async (req, res) => {
    const { articleId, id } = req.params;
    const comments = await prisma.comment.findMany({
      where: {
        articleId,
        id,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(comments);
  })
);

router.post('/articles/:id/comments', async (req, res) => {
  const articleId = req.params.id;
  const { content } = req.body;

  const comment = await prisma.comment.create({
    data: {
      content,
      article: {
        connect: { id: articleId },
      },
    },
  });
  res.status(201).json(comment);
});

/* === 공통 댓글 api (삭제, 수정)=== */
router.patch(
  '/comments/:id',
  asyncHandeler(async (req, res) => {
    const id = req.params.id;
    const { content } = req.body;

    const updated = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    res.json(updated);
  })
);

router.delete(
  '/comments/:id',
  asyncHandeler(async (req, res) => {
    const { id } = req.params;
    await prisma.comment.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

export default router;
