import mongoose, { Document, Schema } from 'mongoose';
import { IListing } from '../types';

export interface ListingDocument extends Omit<IListing, '_id'>, Document {}

const ListingSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    grade: {
      type: String,
      required: [true, 'Grade is required'],
      enum: ['A', 'B', 'C'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller is required'],
    },
    timeLeft: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ListingDocument>('Listing', ListingSchema);
