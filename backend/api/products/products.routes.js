import { Router } from 'express';
import { asyncHandeler } from '../../utils/errorHandler.js';
import {
  getProductList,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addFavorite,
} from './products.controller.js';
const router = Router();

/* === 상품 api === */
router.get('', asyncHandeler(getProductList));
router.get('/:id', asyncHandeler(getProduct));
router.post('', asyncHandeler(createProduct));
router.patch('/:id', asyncHandeler(updateProduct));
router.delete('/:id', asyncHandeler(deleteProduct));
router.patch('/:id/favorite', asyncHandeler(addFavorite));

export default router;
