import express, { NextFunction, Request, Response } from 'express';
import { BicycleController } from './bicycle.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BicycleValidation } from './bicycle.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
// import { upload } from '../../utils/sendImageToCloudinary';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

// create bicycle
router.post(
  '/',
  // auth(USER_ROLE.admin), 
  multerUpload.single('file'),
  // upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(BicycleValidation.createBicycleValidationSchema),
  BicycleController.createBicycle,
);

// get all
router.get('/', BicycleController.getAllBicycle);

// get a single bicycle route
router.get('/:slugAndId', BicycleController.getASpecificBicycle);


//update bicycle
router.patch(
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
