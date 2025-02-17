import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// Interfaces pour typer les données
interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  media: {
    type: 'image' | 'video';
    url: string;
    alt?: string;
    order?: number;
  }[];
}

interface ScrollInfiniteCardProps {
  tag: string;
  speed?: number;
}

const Card: React.FC<{ project: Project }> = ({ project }) => {
  // Récupère la première image du projet
  const mainImage = project.media.find(m => m.type === 'image')?.url;

  return (
    <div className="w-[500px] h-[400px] bg-white rounded-3xl shadow-xl border flex-shrink-0 overflow-hidden">
      {mainImage && (
        <div className="h-full w-full overflow-hidden">
          <img 
            src={mainImage} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
    </div>
  );
};

export const ScrollInfiniteCard: React.FC<ScrollInfiniteCardProps> = ({
  tag,
  speed = 50
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CLONE_COUNT = 10;
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Récupération des projets depuis l'API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5001/api/projects?tags=${tag}`);
        setProjects(response.data.data);
        setError(null);
      } catch (err) {
        setError('Erreur lors de la récupération des projets');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [tag]);

  // Création des cartes clonées une fois les projets chargés
  const clonedProjects = projects.length > 0 
    ? Array(CLONE_COUNT).fill(projects).flat() 
    : [];

  useEffect(() => {
    if (projects.length === 0) return;

    const cardWidth = 300;
    const gap = 16;
    const singleSetWidth = projects.length * (cardWidth + gap);

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const movement = (speed * deltaTime) / 1000;
      let newPosition = scrollPosition + movement;

      if (newPosition >= singleSetWidth) {
        newPosition = 0;
        setScrollPosition(0);
      } else {
        setScrollPosition(newPosition);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollPosition, projects.length, speed]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (projects.length === 0) return <div>Aucun projet trouvé avec le tag {tag}</div>;

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex gap-4 py-8">
        <div
          ref={containerRef}
          className="flex gap-8 transition-transform duration-100"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            willChange: 'transform',
          }}
        >
          {clonedProjects.map((project, index) => (
            <Card
              key={`${project._id}-${index}`}
              project={project}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollInfiniteCard;