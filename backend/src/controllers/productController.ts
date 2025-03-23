import { Request, Response } from "express";
import { Product } from "../models/productModel";

// ✅ Create a new product (No Authentication - sellerId from req.body)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        // Now expecting sellerId to be passed in the request body
        const sellerId = req.body.sellerId; // Get sellerId from req.body

        if (!sellerId) {
            res.status(400).json({ message: "Seller ID is required in the request body." }); // Or handle missing sellerId as needed
            return;
        }

        const productData = {
            ...req.body,
            sellerId: sellerId, // Add sellerId to the product data
        };

        const product = await Product.create(productData);
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Error creating product", error });
    }
};

// ✅ Get all products, optionally filter by sellerId (No changes needed)
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { sellerId } = req.query;
        let filter = {};

        if (sellerId) {
            filter = { sellerId: sellerId }; // Filter products by sellerId if provided
        }

        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// ✅ Get a single product by ID (No changes needed)
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// ✅ Update product details (No changes needed)
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

// ✅ Delete a product (No changes needed)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};