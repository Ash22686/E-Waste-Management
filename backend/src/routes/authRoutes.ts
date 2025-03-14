import express from 'express';
import { register, login, getCurrentUser } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { AuthRequest } from '../types';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    await register(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/me', protect, async (req: AuthRequest, res, next) => {
  try {
    await getCurrentUser(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;