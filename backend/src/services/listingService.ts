import Listing from '../models/Listing';
import { IListing, IListingRequest } from '../types';

// Get all listings
export const getAllListings = async (): Promise<IListing[]> => {
  const listings = await Listing.find().sort({ createdAt: -1 });
  return listings.map(listing => listing.toObject() as IListing);
};

// Get listing by ID
export const getListingById = async (id: string): Promise<IListing | null> => {
  const listing = await Listing.findById(id).populate('seller', 'firstName lastName email');
  return listing ? listing.toObject() as IListing : null;
};

// Create listing
export const createListing = async (
  listingData: IListingRequest,
  sellerId: string
): Promise<IListing> => {
  const listing = await Listing.create({
    ...listingData,
    seller: sellerId,
  });
  
  return listing.toObject() as IListing;
};

// Update listing
export const updateListing = async (
  id: string,
  listingData: Partial<IListingRequest>,
  sellerId: string
): Promise<IListing> => {
  // Check if listing exists and belongs to seller
  const existingListing = await Listing.findOne({
    _id: id,
    seller: sellerId,
  });
  
  if (!existingListing) {
    throw new Error('Listing not found or unauthorized');
  }
  
  // Update listing
  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    listingData,
    { new: true, runValidators: true }
  ).populate('seller', 'firstName lastName email');
  
  if (!updatedListing) {
    throw new Error('Listing not found');
  }
  
  return updatedListing.toObject() as IListing;
};

// Delete listing
export const deleteListing = async (id: string, sellerId: string): Promise<void> => {
  // Check if listing exists and belongs to seller
  const existingListing = await Listing.findOne({
    _id: id,
    seller: sellerId,
  });
  
  if (!existingListing) {
    throw new Error('Listing not found or unauthorized');
  }
  
  await Listing.findByIdAndDelete(id);
};

// Get seller listings
export const getSellerListings = async (sellerId: string): Promise<IListing[]> => {
  const listings = await Listing.find({ seller: sellerId })
    .sort({ createdAt: -1 });
  
  return listings.map(listing => listing.toObject() as IListing);
};