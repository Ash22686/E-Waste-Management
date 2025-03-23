import express from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController";

const router = express.Router();

// No authentication middleware applied now
router.post("/", createProduct); // Directly use createProduct - NO AUTHENTICATION
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;