import { Request, Response } from "express";
import cloudinary from "../uploadCloudinary";
import fs from "fs";

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
      return;
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "seller-listings", // Optional: Specify a folder in Cloudinary
    });

    // Delete the file from the local uploads folder
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    res.status(200).json({
      success: true,
      url: result.secure_url, // Return the secure URL of the uploaded image
    });
  } catch (error: any) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
};