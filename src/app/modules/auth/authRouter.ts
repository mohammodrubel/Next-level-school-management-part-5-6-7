import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authintication } from './authValidation';
import { authControllers } from './authController';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authintication.loginValidationScema),
  authControllers.loginUser,
);

export const authinticationRouter = router;
