// src/controllers/uploadController.ts
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary';

export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  try {
    res.status(200).json({
      success: true,
      url: req.file.path, // URL Cloudinary
      publicId: req.file.filename // ID public Cloudinary
    });
  } catch (error) {
    res.status(500);
    throw new Error('Image upload failed');
  }
});

export const deleteImage = asyncHandler(async (req: Request, res: Response) => {
  const { publicId } = req.params;

  if (!publicId) {
    res.status(400);
    throw new Error('No public ID provided');
  }

  try {
    await cloudinary.uploader.destroy(publicId);
    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500);
    throw new Error('Image deletion failed');
  }
});

export default uploadImage;