import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Project from '../models/Project';
import { IProject } from '../types/project';


interface TypedRequestQuery extends Request {
  query: {
    tags?: string | string[];
  }
}
// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req: TypedRequestQuery, res: Response) => {
  const { tags } = req.query;
  let query = {};

  if (tags) {
    const tagArray = Array.isArray(tags) 
      ? tags 
      : typeof tags === 'string' 
        ? tags.split(',') 
        : [];
        
    query = { tags: { $in: tagArray } };
  }

  const projects = await Project.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

export const getAllTags = asyncHandler(async (req: Request, res: Response) => {
  const projects = await Project.find({});
  const tags = [...new Set(projects.flatMap(project => project.tags))];

  res.status(200).json({
    success: true,
    count: tags.length,
    data: tags
  });
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Public (you might want to add authentication later)
// src/controllers/projectController.ts
export const createProject = asyncHandler(async (req: Request, res: Response) => {
  try {
    console.log('Received project data:', req.body); // Pour le débogage

    const projectData = {
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags || [],
      technologies: req.body.technologies || [],
      media: req.body.media || [],
      githubUrl: req.body.githubUrl || '',
      liveUrl: req.body.liveUrl || '',
      status: req.body.status || 'completed'
    };

    const project = await Project.create(projectData);
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Server Error'
    });
  }
});

// src/controllers/projectController.ts
export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});



// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Public
export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProject);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Public
export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    // Supprime les images associées dans Cloudinary
    for (const media of project.media) {
      if (media.publicId) {
        try {
          await cloudinary.uploader.destroy(media.publicId);
          console.log(`Image deleted from Cloudinary: ${media.publicId}`);
        } catch (error) {
          console.error(`Failed to delete image from Cloudinary: ${media.publicId}`, error);
        }
      }
    }

    // Supprime le projet de la base de données
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ 
      success: true,
      id: req.params.id,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete project'
    });
  }
});
