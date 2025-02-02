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
  auth(USER_ROLE.customer, USER_ROLE.admin),
  validateRequest(OrderValidations.createOrderSchema),
  OrderController.createOrder,
);

//get all order
router.get(
  '/',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  OrderController.getAllOrders,
);

//verify order
router.get('/verify', auth(USER_ROLE.customer), OrderController.verifyPayment);

//get single order
router.get(
  '/:orderId',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  OrderController.getSingleOrder,
);

// update order
router.patch(
  '/:orderId',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  validateRequest(OrderValidations.updateOrderSchema),
  OrderController.updateOrder,
);

// detete order
router.delete(
  '/:orderId',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  OrderController.deleteOrder,
);

// calculate revenue
router.get('/revenue', auth(USER_ROLE.admin), OrderController.calculateRevenue);

export const OrderRoutes = router;
