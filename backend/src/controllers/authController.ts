import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { ILoginRequest, IRegisterRequest, AuthRequest } from '../types';

// Register controller
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: IRegisterRequest = req.body;
    const { user, token } = await authService.register(userData);
    res.status(201).json({
      success: true,
      data: { user, token },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login controller
export const login = async (req: Request, res: Response): Promise<Response | undefined> => {
  try {
    const credentials: ILoginRequest = req.body;
    const { user, token } = await authService.login(credentials);
    return res.status(200).json({
      success: true,
      data: { user, token },
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Get current user controller
export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<Response | undefined> => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }
    const user = await authService.getCurrentUser(req.user._id.toString());
    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};