import React, { useRef, useState } from 'react';

interface ProjectCardProps {
  title: string;
  tag: string;
  details: string[];
  image: string;
  buttonText: string;
  buttonLink: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  tag,
  details,
  image, 

}) => {
  return (
    <div className="w-[1000px] h-[600px] relative flex-shrink-0 rounded-3xl bg-white/10 overflow-hidden shadow-lg">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Carte de contenu */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="bg-white flex rounded-2xl p-10 text-black">
          <div className='w-3/5 space-y-4'>
            <button className='rounded-full bg-blue-300/30 text-blue-500 px-4 py-1'>
              {tag}
            </button>
            <h3 className="text-4xl font-bold mb-3">{title}</h3>
          </div>
          <div className='w-2/5 pl-6'>
            <ul className="space-y-2">
              {details.map((detail, index) => (
                <li key={index} className="text-gray-500 font-light text-base flex items-start">
                  <span className="mr-2 mt-1 text-xs text-gray-500">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BestProjectCarouselProps {
  projects: ProjectCardProps[];
}

export const BestProjectCarousel: React.FC<BestProjectCarouselProps> = ({ projects }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const cardWidth = 800;
  const cardGap = 40; // gap-10

  const handleScroll = (direction: 'left' | 'right') => {
    if (isAnimating) return;

    setIsAnimating(true);

    const newIndex = direction === 'right' 
      ? Math.min(currentIndex + 1, projects.length - 1)
      : Math.max(currentIndex - 1, 0);

    setCurrentIndex(newIndex);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className='py-20'>
      {/* Section d'en-tête avec le contenu et les boutons de navigation */}
      <div className='flex items-end gap-14 text-white px-20'>
        <div className='space-y-8 w-auto'>
          <h3 className='text-5xl font-bold leading-tight'>
            Les projets réalisés durant mon apprentissage
          </h3>
          <p className='text-xl opacity-60 leading-10 font-light'>
            Easily manage website and technology updates, customization, and performance—all from a single, powerful dashboard.
          </p>
        </div>
        <div className='text-right w-40 flex gap-4'>
          <button
            onClick={() => handleScroll('left')}
            disabled={isAnimating || currentIndex === 0}
            className="bg-white/10 backdrop-blur-xl hover:bg-white hover:text-black rounded-full p-4 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img 
              src='/public/arrow.png' 
              width={20} 
              height={20} 
              className='w-4 h-4 invert opacity-60 rotate-180' 
              alt="Previous"
            />
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={isAnimating || currentIndex === projects.length - 1}
            className="bg-white/10 backdrop-blur-xl hover:bg-white hover:text-black rounded-full p-4 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img 
              src='/public/arrow.png' 
              width={20} 
              height={20} 
              className='w-4 h-4 invert opacity-60' 
              alt="Next"
            />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-screen mt-20 -translate-x-1/2 left-1/2 overflow-hidden">
        <div className="pl-20">
          <div className="relative w-full">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (cardWidth + cardGap)}px)`
              }}
            >
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0"
                  style={{ marginRight: `${cardGap}px` }}
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestProjectCarousel;