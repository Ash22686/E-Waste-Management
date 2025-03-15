import { Request } from 'express';
import { ObjectId } from 'mongoose';

// User interfaces
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}


export interface IUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'seller' | 'buyer';
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Auth interfaces
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
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

export interface IAuthResponse {
  user: IUserResponse;
  token: string;
}

// Extend the Express Request interface to include user

export interface AuthRequest extends Request {
  user?: IUser;

// Listing interfaces
export interface IListing {
  _id: ObjectId;
  title: string;
  description: string;
  price: number;
  image: string;
  seller: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IListingRequest {
  title: string;
  description: string;
  price: number;
  image: string;
}