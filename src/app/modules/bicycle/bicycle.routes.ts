import express from 'express';
import { BicycleController } from './bicycle.controller';

const router = express.Router();

// call bicycle controller func
router.post('/', BicycleController.createBicycle);

// get all
router.get('/', BicycleController.getAllBicycle);
// get a single bicycle route
router.get('/:productId', BicycleController.getASpecificBicycle);
router.put('/:productId', BicycleController.updateBicycle);
router.delete('/:productId', BicycleController.deleteBicycle);

export const BicycleRoutes = router;
