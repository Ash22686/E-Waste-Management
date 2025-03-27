"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const uploadCloudinary_1 = __importDefault(require("../uploadCloudinary"));
const fs_1 = __importDefault(require("fs"));
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, message: "No file uploaded" });
            return;
        }
        // Upload the file to Cloudinary
        const result = yield uploadCloudinary_1.default.uploader.upload(req.file.path, {
            folder: "seller-listings", // Optional: Specify a folder in Cloudinary
        });
        // Delete the file from the local uploads folder
        fs_1.default.unlink(req.file.path, (err) => {
            if (err)
                console.error("Error deleting file:", err);
        });
        res.status(200).json({
            success: true,
            url: result.secure_url, // Return the secure URL of the uploaded image
        });
    }
    catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ success: false, message: "Image upload failed" });
    }
});
exports.uploadImage = uploadImage;
