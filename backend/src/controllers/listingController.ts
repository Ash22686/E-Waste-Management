import { Response } from 'express';
import { AuthRequest as Request } from '../types';
import * as listingService from '../services/listingService';
import { IListingRequest } from '../types';

// Get all listings controller
export const getAllListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const listings = await listingService.getAllListings();
    res.status(200).json({
      success: true,
      data: { listings },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get listing by ID controller
export const getListingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const listing = await listingService.getListingById(id);
    res.status(200).json({
      success: true,
      data: { listing },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Create listing controller
export const createListing = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    // If image was uploaded via multer
    if (req.file) {
      // Set the image path for the listing
      req.body.image = `/uploads/${req.file.filename}`;
    }

    const listingData: IListingRequest = req.body;
    const sellerId = req.user._id.toString();

    const listing = await listingService.createListing(listingData, sellerId);

    res.status(201).json({
      success: true,
      data: { listing },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update listing controller
export const updateListing = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    const { id } = req.params;

    // If image was uploaded via multer
    if (req.file) {
      // Set the image path for the listing
      req.body.image = `/uploads/${req.file.filename}`;
    }

    const listingData: Partial<IListingRequest> = req.body;
    const sellerId = req.user._id.toString();

    const updatedListing = await listingService.updateListing(id, listingData, sellerId);

    res.status(200).json({
      success: true,
      data: { updatedListing },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete listing controller
export const deleteListing = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    const { id } = req.params;
    const sellerId = req.user._id.toString();

    await listingService.deleteListing(id, sellerId);

    res.status(200).json({
      success: true,
      message: 'Listing deleted successfully',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get seller listings controller
export const getSellerListings = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    const sellerId = req.user._id.toString();
    const listings = await listingService.getSellerListings(sellerId);

    res.status(200).json({
      success: true,
      data: { listings },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};