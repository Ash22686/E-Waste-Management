import { Request, Response } from "express";
import { Seller } from "../models/sellerModel";

// ✅ Fix: Ensure functions return void
export const createSeller = async (req: Request, res: Response): Promise<void> => {
    try {
        const seller = await Seller.create(req.body);
        res.status(201).json(seller);
    } catch (error) {
        res.status(500).json({ message: "Error creating seller", error });
    }
};

export const getAllSellers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const sellers = await Seller.find().populate("productIds").populate("buyRequests"); //Populate buyRequests also if needed
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sellers", error });
    }
};

export const getSellerById = async (req: Request, res: Response): Promise<void> => {
    try {
        const seller = await Seller.findById(req.params.id).populate("productIds").populate("buyRequests"); //Populate buyRequests also if needed
        if (!seller) {
            res.status(404).json({ message: "Seller not found" });
            return;
        }
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: "Error fetching seller", error });
    }
};

export const updateSeller = async (req: Request, res: Response): Promise<void> => {
    try {
        const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!seller) {
            res.status(404).json({ message: "Seller not found" });
            return;
        }
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: "Error updating seller", error });
    }
};

export const deleteSeller = async (req: Request, res: Response): Promise<void> => {
    try {
        const seller = await Seller.findByIdAndDelete(req.params.id);
        if (!seller) {
            res.status(404).json({ message: "Seller not found" });
            return;
        }
        res.status(200).json({ message: "Seller deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting seller", error });
    }
};