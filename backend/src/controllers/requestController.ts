import { Request, Response } from 'express';
import RequestModel from '../models/request';
import Listing from '../models/Listing';
import { AuthRequest } from '../types';

export const createRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { listingId } = req.body;
    const buyerId = req.user!._id;

    // Check if listing exists
    const listing = await Listing.findById(listingId).populate('sellerId');
    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    // Create request
    const newRequest = await RequestModel.create({
      buyer: buyerId,
      listing: listingId,
      status: 'pending',
      seller: listing.sellerId // Add seller reference
    });

    // Populate for response
    const populatedRequest = await RequestModel.findById(newRequest._id)
      .populate({
        path: 'listing',
        select: 'title price image category',
        populate: {
          path: 'sellerId',
          select: 'firstName lastName'
        }
      })
      .populate('buyer', 'firstName lastName');

    res.status(201).json({ 
      success: true, 
      data: populatedRequest 
    });

  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// controllers/requestController.ts
export const getBuyerRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await RequestModel.find({ buyer: req.user!._id })
      .populate({
        path: 'listing',
        select: 'title price image category sellerId timeLeft', // Add timeLeft
        populate: {
          path: 'sellerId', // Match Listing schema field name
          model: 'User', // Explicitly specify model
          select: 'firstName lastName' // Confirm fields exist in User
        }
      })
      .lean(); // Convert to plain JS object

    console.log('DEBUG - Populated requests:', requests); // Add this for verification
    res.status(200).json({ success: true, data: requests });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRequestStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const validStatuses = ['accepted', 'rejected', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const updatedRequest = await RequestModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('listing');

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    res.status(200).json({ success: true, data: updatedRequest });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// requestController.ts
export const cancelRequest = async (req: AuthRequest, res: Response) => {
  try {
    const request = await RequestModel.findOneAndUpdate(
      { 
        _id: req.params.id,
        buyer: req.user!._id, // Ensure buyer owns the request
        status: 'pending' // Only allow cancellation of pending requests
      },
      { status: 'cancelled' },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found or cannot be cancelled'
      });
    }

    res.status(200).json({ success: true, data: request });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};