// src/scripts/createAdmin.ts
import mongoose from 'mongoose';
import Admin from '../models/Admin';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    
    const adminData = {
      username: 'admin',
      password: 'admin'  // Sera hashé automatiquement grâce au middleware pre-save
    };

    const admin = await Admin.create(adminData);
    console.log('Admin créé avec succès:', admin);

  } catch (error) {
    console.error('Erreur lors de la création de l\'admin:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();