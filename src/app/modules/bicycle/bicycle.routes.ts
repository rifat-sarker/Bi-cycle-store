import express from 'express';
import { BicycleController } from './bicycle.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BicycleValidation } from './bicycle.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// create bicycle
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(BicycleValidation.createBicycleValidationSchema),
  BicycleController.createBicycle,
);

// get all
router.get('/', BicycleController.getAllBicycle);

// get a single bicycle route
router.get('/:productId', BicycleController.getASpecificBicycle);

//update bicycle
router.put(
  '/:productId',
  auth(USER_ROLE.admin),
  validateRequest(BicycleValidation.updateBicycleValidationSchema),
  BicycleController.updateBicycle,
);

// delete a bicycle
router.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  BicycleController.deleteBicycle,
);

export const BicycleRoutes = router;
