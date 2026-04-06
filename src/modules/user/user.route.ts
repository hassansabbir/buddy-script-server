import { Router } from 'express';
import { UserController } from './user.controller.js';
import auth from '../../app/middlewares/auth.middleware.js';
import { UserValidations } from './user.validation.js';
import validateRequest from '../../app/middlewares/validateRequest.middleware.js';

const router = Router();

router.get('/', UserController.getAllUsers);
router.post('/create-user', UserController.createUser);
router.get('/me', auth('user', 'admin'), UserController.getMe);
router.patch(
  '/update-profile',
  auth('user', 'admin'),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserController.updateProfile,
);
router.get('/:id', UserController.getSingleUser);

export const UserRoutes = router;
