import express from 'express';
import {
  addOrUpdateCart,
  deleteCartItem,
  getCart,
  toggleSaveCartItem,
  updateQuantity,
} from './cart.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', getCart);
router.post('/', auth(USER_ROLE.customer), addOrUpdateCart);
router.patch('/:cartItemId', updateQuantity);
router.patch('/save/:cartItemId', toggleSaveCartItem);
router.delete('/:cartItemId', deleteCartItem);

export const CartRoutes = router;
