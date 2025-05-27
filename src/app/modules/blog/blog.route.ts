import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';

import { BlogController } from './blog.controller';
import { USER_ROLE } from '../user/user.constant';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();
router.post(
  '/',
  auth("admin"),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  // validateRequest(blogCreateSchema),
  BlogController.createBlog,
);

router.get('/', BlogController.getAllBlog);
router.get('/:id', BlogController.getBlogById);
router.patch(
  '/:id',

  auth(USER_ROLE.admin),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  BlogController.updateBlog,
);

router.delete('/:id', auth(USER_ROLE.admin), BlogController.deleteBlog);

export const BlogRoutes = router;
