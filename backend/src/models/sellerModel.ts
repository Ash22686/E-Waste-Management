import mongoose, { Schema, Document, Model, Types, DefaultSchemaOptions } from "mongoose";

export interface ISeller extends Document {
    userId: string; // Added userId field
    fullAddress: string;
    country: string;
    state: string;
    city: string;
    local: string;
    productIds: mongoose.Schema.Types.ObjectId[];  // Array of product references
    buyRequests: mongoose.Schema.Types.ObjectId[]; // Array of buy requests
}

// Simplified SellerDocument type - Attempt 1 based on troubleshooting
export type SellerDocument = ISeller & {
    _id: Types.ObjectId;
    userId: string;
};


const SellerSchema: Schema<SellerDocument> = new Schema<SellerDocument>( // Explicitly use SellerDocument as generic type for Schema - Attempt 2 based on troubleshooting
    {
        fullAddress: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        local: { type: String, required: true },
        productIds: [{ type: Schema.Types.ObjectId, ref: "Product" }], // References Product model
        buyRequests: [{ type: Schema.Types.ObjectId, ref: "BuyRequest" }], // References BuyRequest model
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.userId = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
        toObject: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.userId = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);


export const Seller = mongoose.model<SellerDocument>("Seller", SellerSchema);