import express from 'express';
import {
  addOrUpdateCart,
  deleteCartItem,
  getCart,
  toggleSaveCartItem,
  updateQuantity,
} from './cart.controller';

const router = express.Router();

router.get('/', getCart);
router.post('/', addOrUpdateCart);
router.patch('/:cartItemId', updateQuantity);
router.patch('/save/:cartItemId', toggleSaveCartItem);
router.delete('/:cartItemId', deleteCartItem);

export const CartRoutes = router;
