import express from 'express';
import { AuthControllers } from './auth.controller';

const router = express.Router();
router.post(
  '/change-password',

  AuthControllers.changePassword,
);

export const AuthRoutes = router;
