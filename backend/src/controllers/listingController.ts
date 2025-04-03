import { Response } from 'express';
import { AuthRequest as Request } from '../types';
import * as listingService from '../services/listingService';
import Listing from '../models/Listing'; // Import the model directly for update

// Get all listings
export const getAllListings = async (req: Request, res: Response): Promise<void> => {
  try {
    // Optional: Add filtering here if you want the API endpoint itself
    // to only return non-scrap items by default.
    // const query = { isScrapItem: false }; // Example server-side filter
    // const listings = await listingService.getAllListings(query);
    const listings = await listingService.getAllListings(); // Keep as is if frontend handles filtering

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get listing by ID
export const getListingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const listing = await listingService.getListingById(id);
    if (!listing) {
      res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get seller-specific listings
export const getSellerListings = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }
    const sellerId = req.user._id.toString(); // Get the seller's ID from the authenticated user

    // Optional: Add filter if seller dashboard should hide scrap items
    // const listings = await listingService.getSellerListings(sellerId, { isScrapItem: false });
    const listings = await listingService.getSellerListings(sellerId);

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Create listing
export const createListing = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }
    const sellerId = req.user._id; // Get the seller's ID from the authenticated user

    const listingData = {
      ...req.body,
      sellerId, // Add the sellerId to the listing data
      // isScrapItem will default to false based on the schema
    };

    const listing = await listingService.createListing(listingData);

    res.status(201).json({
      success: true,
      data: listing,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update listing
export const updateListing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Ensure the sellerId and isScrapItem are not overwritten via this endpoint
    delete updates.sellerId;
    delete updates.isScrapItem; // Prevent manual update of scrap status

    const updatedListing = await Listing.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedListing) {
      res.status(404).json({ success: false, message: "Listing not found" });
      return;
    }

    res.status(200).json({ success: true, data: updatedListing });
  } catch (error: any) {
    console.error("Error updating listing:", error);
    res.status(500).json({ success: false, message: "Failed to update listing" });
  }
};

// Delete listing
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

// Get featured listings - Also filter out scrap items here potentially
export const getFeaturedListings = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch the latest 4 non-scrap listings as featured listings
    const listings = await Listing.find({ isScrapItem: false }) // Filter out scrap items
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};