// src/controllers/authController.ts
import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const generateToken = (id: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username });

    if (!username || !password) {
      res.status(400);
      throw new Error('Please provide username and password');
    }

    const admin = await Admin.findOne({ username });
    console.log('Admin found:', !!admin);

    if (!admin) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    const isMatch = await admin.matchPassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
      username: admin.username
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    });
  }
});