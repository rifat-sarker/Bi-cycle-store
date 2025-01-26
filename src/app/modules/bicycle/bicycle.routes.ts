import express from 'express';
import { BicycleController } from './bicycle.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BicycleValidation } from './bicycle.validation';

const router = express.Router();

// create bicycle
router.post(
  '/',
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
  validateRequest(BicycleValidation.updateBicycleValidationSchema),
  BicycleController.updateBicycle,
);

// delete a bicycle
router.delete('/:productId', BicycleController.deleteBicycle);

export const BicycleRoutes = router;
