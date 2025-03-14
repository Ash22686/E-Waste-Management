import { Router } from 'express';
import * as listingController from '../controllers/listingController';
import { protect, restrictTo } from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';

const router = Router();

// Public routes
router.get('/', listingController.getAllListings);
router.get('/:id', listingController.getListingById);

// Protected routes
router.use(protect);

// Seller only routes
router.post(
  '/',
  restrictTo('seller'),
  upload.single('image'),
  listingController.createListing
);

router.put(
  '/:id',
  restrictTo('seller'),
  upload.single('image'),
  listingController.updateListing
);

router.delete(
  '/:id',
  restrictTo('seller'),
  listingController.deleteListing
);

router.get(
  '/seller/listings',
  restrictTo('seller'),
  listingController.getSellerListings
);

export default router;