// src/types/index.ts
export interface IProject {
  title: string;
  description: string;
  tags: string[];
  technologies: string[];
  media: {
    type: 'image' | 'video';
    url: string;
    alt?: string;
    order?: number;
  }[];
  features?: {
    name: string;
    description?: string;
    imageUrl: string;
  }[];
  githubUrl?: string;
  liveUrl?: string;
  status?: 'in-progress' | 'completed' | 'archived';
  createdAt?: Date;
  updatedAt?: Date;
}