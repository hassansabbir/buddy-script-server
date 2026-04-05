import { Router } from 'express';
import { UserController } from './user.controller.js';

const router = Router();

router.get('/', UserController.getAllUsers);
router.post('/create-user', UserController.createUser);
router.get('/:id', UserController.getSingleUser);

export const UserRoutes = router;
