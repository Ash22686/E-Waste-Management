import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  userId: string; // Added userId field
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: 'seller' | 'buyer';
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['seller', 'buyer'], required: true },
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // Ensure virtual fields are serialised when using toJSON
      transform: function (doc, ret) {
        ret.userId = ret._id.toString(); // Map _id to userId for API responses
        delete ret._id; // Optionally remove the original _id from the output
        delete ret.__v; // Optionally remove __v
        return ret;
      },
    },
    toObject: {
      virtuals: true, // Ensure virtual fields are serialised when using toObject
      transform: function (doc, ret) {
        ret.userId = ret._id.toString(); // Map _id to userId for JavaScript objects
        delete ret._id; // Optionally remove the original _id from the output
        delete ret.__v; // Optionally remove __v
        return ret;
      },
    },
  }
);

export type UserDocument = Omit<IUser, 'userId'> & { // Omit userId from IUser interface
  _id: Types.ObjectId; // Keep _id as ObjectId in document type
  userId: string; // Add userId to UserDocument type
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;