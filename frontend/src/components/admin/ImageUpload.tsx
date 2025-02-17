// src/components/admin/ImageUpload.tsx
import React, { useState, useRef } from 'react';
import axios from 'axios';

interface ImageUploadProps {
  onUploadComplete: (imageData: { url: string; publicId: string }) => void;
  onUploadError?: (error: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onUploadComplete,
  onUploadError
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('image', files[0]);

      const response = await axios.post(
        'http://localhost:5001/api/projects/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setProgress(progress);
          },
        }
      );

      onUploadComplete({
        url: response.data.url,
        publicId: response.data.publicId
      });

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError?.(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files?.length && fileInputRef.current) {
      fileInputRef.current.files = files;
      handleUpload({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="w-full">
      {/* Zone de drop */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center
          ${uploading ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
          transition-colors duration-200 cursor-pointer
        `}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />

        <div className="flex flex-col items-center space-y-4">
          {/* Icône upload */}
          <svg
            className={`w-12 h-12 ${uploading ? 'text-blue-500' : 'text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>

          {/* Texte et statut */}
          <div className="text-sm text-gray-600">
            {uploading ? (
              <p>Uploading... {progress}%</p>
            ) : (
              <p>
                Drag and drop an image here, or{' '}
                <span className="text-blue-500">browse</span>
              </p>
            )}
          </div>
        </div>

        {/* Barre de progression */}
        {uploading && progress > 0 && (
          <div className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Messages d'erreur */}
      {onUploadError && (
        <p className="text-red-500 text-sm mt-2">
          {onUploadError}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;