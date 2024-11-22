import express from 'express';
import { BicycleController } from './bicycle.controller';
const router = express.Router();

// call bicycle controller func
router.post('/create-bicycle', BicycleController.createBicycle);

// get all
router.get('/', BicycleController.getAllBicycle);

export const BicycleRoutes = router;
