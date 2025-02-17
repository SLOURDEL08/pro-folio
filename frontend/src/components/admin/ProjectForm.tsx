
// src/components/admin/ProjectForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import axios from 'axios';

export interface IMedia {
  type: 'image' | 'video';
  url: string;
  publicId?: string;
  alt?: string;
  order?: number;
}

export interface IProject {
  title: string;
  description: string;
  tags: string[];
  technologies: string[];
  media: IMedia[];
  githubUrl: string;
  liveUrl: string;
  status: 'in-progress' | 'completed' | 'archived';
}

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const initialFormState: IProject = {
    title: '',
    description: '',
    tags: [],
    technologies: [],
    media: [],
    githubUrl: '',
    liveUrl: '',
    status: 'completed'
  };

  const [formData, setFormData] = useState<IProject>(initialFormState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(`http://localhost:5001/api/projects/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Ajout de logs pour déboguer
    console.log('Response:', response);
    
    // Vérification de la structure des données
    if (response.data && response.data.data) {
      setFormData(response.data.data);
    } else {
      console.error('Invalid data structure:', response.data);
      // Initialiser avec des valeurs par défaut si nécessaire
      setFormData(initialFormState);
    }
  } catch (error) {
    console.error('Error fetching project:', error);
    // Gérer l'erreur (redirection ou message d'erreur)
    navigate('/admin/dashboard');
  }
};

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = localStorage.getItem('adminToken');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    if (id) {
      await axios.put(`http://localhost:5001/api/projects/${id}`, formData, config);
    } else {
      await axios.post('http://localhost:5001/api/projects', formData, config);
    }
    navigate('/admin/dashboard');
  } catch (error: any) {
    console.error('Error saving project:', error.response?.data || error);
    // Ajoutez une gestion d'erreur plus détaillée ici
  } finally {
    setLoading(false);
  }
};

  const handleImageUpload = (imageData: { url: string; publicId: string }) => {
    const newMedia: IMedia = {
      type: 'image',
      url: imageData.url,
      publicId: imageData.publicId
    };

    setFormData(prev => ({
      ...prev,
      media: [...prev.media, newMedia]
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (name: keyof IProject, value: string) => {
    const arrayValue = value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [name]: arrayValue
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">
        {id ? 'Edit Project' : 'Create New Project'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags.join(', ')}
            onChange={(e) => handleArrayInputChange('tags', e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Technologies (comma-separated)</label>
          <input
            type="text"
            value={formData.technologies.join(', ')}
            onChange={(e) => handleArrayInputChange('technologies', e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Live URL</label>
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Images</label>
          <ImageUpload onUploadComplete={handleImageUpload} />
          {formData.media.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {formData.media.map((media, index) => (
                <div key={index} className="relative">
                  <img 
                    src={media.url} 
                    alt={`Project image ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        media: prev.media.filter((_, i) => i !== index)
                      }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Project'}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;