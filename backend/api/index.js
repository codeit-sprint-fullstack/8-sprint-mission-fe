import { Router } from 'express';

// // 도메인 라우터
import authRouter from './auth/index.js';
import articlesRouter from './articles/index.js';
import productsRouter from './products/index.js';
import commentsRouter from './comments/index.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/articles', articlesRouter);
router.use('/products', productsRouter);
router.use('/', commentsRouter);

export default router;
