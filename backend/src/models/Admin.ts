// src/models/Admin.ts
import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface pour les méthodes du document
interface IAdminDocument extends Document {
  username: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Interface pour le modèle
interface IAdminModel extends Model<IAdminDocument> {
  // Ajoutez ici les méthodes statiques si nécessaire
}

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.matchPassword = async function(
  this: IAdminDocument,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model<IAdminDocument, IAdminModel>('Admin', adminSchema);

export default Admin;