import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();
router.post('/create-user', UserControllers.createUser);
router.post('/create-admin', UserControllers.createAdmin);
export const UserRoutes = router;
