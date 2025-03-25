import express, { RequestHandler } from 'express';
import {
  createRequest,
  getBuyerRequests,
  updateRequestStatus
} from '../controllers/requestController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

// Add proper type casting for middleware
router.use(protect as RequestHandler);

router.post(
  '/',
  restrictTo('buyer') as RequestHandler,
  createRequest as RequestHandler
);

router.get(
  '/buyer',
  restrictTo('buyer') as RequestHandler,
  getBuyerRequests as RequestHandler
);

router.patch(
  '/:id/status',
  restrictTo('seller') as RequestHandler,
  updateRequestStatus as RequestHandler
);

export default router;