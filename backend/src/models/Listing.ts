import mongoose, { Schema, Document } from "mongoose";

export interface IListing extends Document {
  title: string;
  description: string;
  image: string;
  price: number;
  grade: string;
  location: string;
  category: string;
  timeLeft: string;
  delay: number;
  sellerId: mongoose.Types.ObjectId; // Reference to the seller in the User collection
  estimatedWeight: number; // Weight of the item
}

const ListingSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    grade: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    timeLeft: { type: String, required: true },
    delay: { type: Number, required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User collection
    estimatedWeight: { type: Number, required: true }, // New field for estimated weight
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export default mongoose.model<IListing>("Listing", ListingSchema);