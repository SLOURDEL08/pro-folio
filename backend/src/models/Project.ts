// src/models/Project.ts
import mongoose, { Schema } from 'mongoose';


const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  tags: [{
    type: String,
    enum: ['frontend','uxui', 'backend', 'design', 'landing', 'wordpress', 'mobile', 'fullstack'],
    required: true
  }],
  technologies: [{
    type: String,
    required: true
  }],
  media: [{
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: false
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  features: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    imageUrl: {
      type: String,
      required: true
    }
  }],
  repoUrl: {
    type: String,
    required: false
  },
  liveUrl: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'archived'],
    default: 'completed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware pre-save pour mettre à jour updatedAt
projectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Project', projectSchema);