import { Router } from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
  getAllTags,
} from '../controllers/projectController';
import { upload } from '../config/cloudinary';
import { deleteImage, uploadImage } from '../controllers/uploadController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Routes publiques
router.get('/', getProjects);
router.get('/tags', getAllTags);
router.get('/:id', getProjectById);

// Routes protégées (nécessitent une authentification)
router.use(protect); // Middleware d'authentification pour toutes les routes suivantes

// Routes pour les projets
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// Routes pour la gestion des images
router.post('/upload', upload.single('image'), uploadImage);
router.delete('/upload/:publicId', deleteImage);

export default router;