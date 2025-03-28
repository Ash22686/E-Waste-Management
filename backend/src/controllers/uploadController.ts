import { Request, Response } from "express";
import cloudinary from "../uploadCloudinary";
import fs from "fs";
import axios from "axios";

const GEMINI_API_KEY = 'AIzaSyDLG3ObQNfMpftULAT43lLkBQtmUnwZnqs';

const encodeImage = (imagePath: string): string => {
  try {
    return fs.readFileSync(imagePath, { encoding: "base64" });
  } catch (error) {
    console.error(`Error reading image file: ${imagePath}`, error);
    throw error;
  }
};

const getGeminiGrading = async (imagePath: string) => {
  const encodedImage = encodeImage(imagePath);
  const mimeType = "image/png";

  const prompt = `Analyze this image and provide the following details in this exact format:
    **Title:** [Name of the item]
    **Description:** [Brief description of the item in max 15 words]
    **Grade (A-E):** [A/B/C/D/E based on condition (gust a single letter)]`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          { role: "user", parts: [{ text: prompt }] },
          { role: "user", parts: [{ inline_data: { mime_type: mimeType, data: encodedImage } }] }
        ]
      }
    );

    const rawResponse = response.data.candidates?.[0]?.content.parts?.[0]?.text || "";
    
    const titleMatch = rawResponse.match(/\*\*Title:\*\*\s*(.*)/);
    const descriptionMatch = rawResponse.match(/\*\*Description:\*\*\s*(.*)/);
    const gradeMatch = rawResponse.match(/\*\*Grade \(A-E\):\*\*\s*(.*)/);

    return {
      itemName: titleMatch ? titleMatch[1].trim() : "Unknown",
      description: descriptionMatch ? descriptionMatch[1].trim() : "No description available",
      grade: gradeMatch ? gradeMatch[1].trim() : "Unknown"
    };
  } catch (error) {
    console.error("Error generating description:", error);
    throw error;
  }
};

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
      return;
    }

    // Get grading from Gemini first
    const grading = await getGeminiGrading(req.file.path);

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "seller-listings",
    });

    // Delete the file from the local uploads folder
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    // Return the correct response
    res.status(200).json({
      success: true,
      item: grading.itemName,  
      description: grading.description,
      grade: grading.grade,  
      url: result.secure_url
    });
  } catch (error: any) {
    console.error("Error in upload process:", error);
    res.status(500).json({ 
      success: false, 
      message: "Image processing and upload failed" 
    });
  }
};
