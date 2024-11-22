import express from 'express';
import { BicycleController } from './bicycle.controller';
const router = express.Router();

// call bicycle controller func
router.post('/create-bicycle', BicycleController.createBicycle);

// get all
router.get('/', BicycleController.getAllBicycle);

// get a single bicycle route
router.get('/:productId', BicycleController.getASpecificBicycle);

export const BicycleRoutes = router;
