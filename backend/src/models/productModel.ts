import mongoose, { Schema, Document, Model, Types, DefaultSchemaOptions } from "mongoose";

export interface IProduct extends Document {
    name: string;
    type: string;
    images: string[];
    questions: string[];
    price: number;
    sellerId: string; // Add sellerId field of type String
}

// Corrected ProductDocument type
export type ProductDocument = IProduct & {
    _id: Types.ObjectId;
};

const ProductSchema: Schema<ProductDocument> = new Schema<ProductDocument>( // Explicitly use ProductDocument here
    {
        name: { type: String, required: true },
        type: { type: String, required: true, enum: ["keyboard", "mouse", "arduino", "charger", "other"] },
        images: [{ type: String, required: true }],
        questions: [{ type: String, required: true }],
        price: { type: Number, required: true },
        sellerId: { type: String, required: true }, // Make sellerId required
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.userId = ret._id.toString(); // Although named userId in Seller/User, keeping sellerId consistent with product model
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
        toObject: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.userId = ret._id.toString(); // Consistent naming for userId in API responses
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

export const Product = mongoose.model<ProductDocument>("Product", ProductSchema);