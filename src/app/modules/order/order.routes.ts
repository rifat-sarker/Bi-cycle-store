import express from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';

const router = express.Router();

//create order
router.post(
  '/',
  validateRequest(OrderValidations.createOrderSchema),
  OrderController.createOrder,
);

//get all order
router.get('/', OrderController.getAllOrders);

//get single order
router.get('/:orderId', OrderController.getSingleOrder);

// update order
router.put('/:orderId', OrderController.updateOrder);

// detete order
router.delete('/:orderId', OrderController.deleteOrder);

// calculate revenue
router.get('/revenue', OrderController.calculateRevenue);

export const OrderRoutes = router;
