import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../models/User';
import { ILoginRequest, IRegisterRequest, IUserResponse } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallbackSecretKey';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '86400';

console.log('JWT_SECRET:', JWT_SECRET ? 'Loaded' : 'Not Loaded'); // Debugging

export const register = async (userData: IRegisterRequest): Promise<{ user: IUserResponse; token: string }> => {
  const { firstName, lastName, email, password, userType, address, coordinates } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    userType,
    address,
    coordinates,
  }) as UserDocument;

  const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
    expiresIn: parseInt(JWT_EXPIRES_IN, 10),
  });

  const userResponse: IUserResponse = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userType: user.userType,
    address: user.address,
    coordinates: user.coordinates,
  };

  return { user: userResponse, token };
};

export const login = async (credentials: ILoginRequest): Promise<{ user: IUserResponse; token: string }> => {
  const { email, password } = credentials;

  const user = await User.findOne({ email }).select('+password') as UserDocument;
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
    expiresIn: parseInt(JWT_EXPIRES_IN, 10),
  });

  const userResponse: IUserResponse = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userType: user.userType,
    address: user.address,
    coordinates: user.coordinates,
  };

  return { user: userResponse, token };
};

export const getCurrentUser = async (userId: string): Promise<IUserResponse> => {
  const user = await User.findById(userId) as UserDocument;
  if (!user) {
    throw new Error('User not found');
  }

  const userResponse: IUserResponse = {
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userType: user.userType,
    address: user.address,
    coordinates: user.coordinates,
  };

  return userResponse;
};
