import { Router } from 'express';
import {
  getCarts,
  createCart,
  getCartById,
  updateCart,
  addProductToCart,
  purchaseCart,
  deleteCart
} from '../controllers/cart.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js'; 

const router = Router();

router.get('/', getCarts);
router.get('/:id', getCartById);
router.post('/', createCart);
router.post('/:id/purchase', authMiddleware, purchaseCart); 
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

export default router;

