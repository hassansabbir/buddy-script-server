import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { loginValidationSchema } from './auth.interface.js';
import { UserValidations } from '../user/user.validation.js';

const router = Router();

router.post(
  '/register',
  // validation middleware can be added here
  AuthController.register,
);

router.post(
  '/login',
  // validation middleware can be added here
  AuthController.login,
);

export const AuthRoutes = router;
