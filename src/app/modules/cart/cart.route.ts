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

router.get('/', auth(USER_ROLE.customer), getCart);
router.post('/', auth(USER_ROLE.customer), addOrUpdateCart);
router.patch('/:cartItemId', auth(USER_ROLE.customer), updateQuantity);
router.patch('/save/:cartItemId', auth(USER_ROLE.customer), toggleSaveCartItem);
router.delete('/:cartItemId', auth(USER_ROLE.customer), deleteCartItem);

export const CartRoutes = router;
