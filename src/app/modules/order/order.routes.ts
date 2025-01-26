import express from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

//create order
router.post(
  '/',
  auth(USER_ROLE.customer),
  validateRequest(OrderValidations.createOrderSchema),
  OrderController.createOrder,
);

//get all order
router.get('/', auth(USER_ROLE.customer), OrderController.getAllOrders);

//get single order
router.get(
  '/:orderId',
  auth(USER_ROLE.customer),
  OrderController.getSingleOrder,
);

// update order
router.put('/:orderId', auth(USER_ROLE.customer), OrderController.updateOrder);

// detete order
router.delete(
  '/:orderId',
  auth(USER_ROLE.customer),
  OrderController.deleteOrder,
);

// calculate revenue
router.get('/revenue', auth(USER_ROLE.admin), OrderController.calculateRevenue);

export const OrderRoutes = router;
