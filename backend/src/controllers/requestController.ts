import { Request, Response } from 'express';
import RequestModel from '../models/request';
import Listing from '../models/Listing';
import User from '../models/User';
import { AuthRequest } from '../types';

export const createRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { listingId, message } = req.body;
    const buyerId = req.user!._id;

    // Validate listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    // Prevent buying from self
    if (listing.sellerId.toString() === buyerId.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot request your own listing' });
    }

    // Create request
    const newRequest = await RequestModel.create({
      buyer: buyerId,
      seller: listing.sellerId,
      listing: listingId,
      message
    });

    // Populate data for response
    const populatedRequest = await RequestModel.findById(newRequest._id)
      .populate('seller', 'firstName lastName')
      .populate('listing', 'title price image');

    res.status(201).json({ success: true, data: populatedRequest });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// requestController.ts
export const getBuyerRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await RequestModel.find({ buyer: req.user!._id })
      .populate({
        path: 'listing',
        select: 'title description price image category',
        model: 'Listing'
      })
      .populate({
        path: 'seller',
        select: 'firstName lastName',
        model: 'User'
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: requests });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRequestStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    // Find and validate request
    const request = await RequestModel.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Verify seller ownership
    if (request.seller.toString() !== req.user!._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // Update request
    const updatedRequest = await RequestModel.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    ).populate('buyer', 'firstName lastName');

    res.status(200).json({ success: true, data: updatedRequest });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};