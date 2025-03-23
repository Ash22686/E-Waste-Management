import express from "express";
import { createSeller, getAllSellers, getSellerById, updateSeller, deleteSeller } from "../controllers/sellerController";

const router = express.Router();

router.post("/", createSeller);
router.get("/", getAllSellers);
router.get("/:id", getSellerById);
router.put("/:id", updateSeller);
router.delete("/:id", deleteSeller);

export default router;
