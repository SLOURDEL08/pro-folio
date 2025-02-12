import React, { useState, useEffect } from 'react';

interface SkillCardProps {
  title: string;
  description: string;
  image?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, description, image }) => {
  return (
    <div className="w-[420px] h-[550px] relative flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-lg">
      {image && (
        <div className="h-1/2 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col h-1/2">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

interface SkillsCarouselProps {
  skills: SkillCardProps[];
}

export const SkillsCarousel: React.FC<SkillsCarouselProps> = ({ skills }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const cardWidth = 420;
  const cardGap = 24;

  useEffect(() => {
    // Mettre à jour la visibilité des flèches quand l'index change
    setShowLeftArrow(currentIndex > 0);
    setShowRightArrow(currentIndex < skills.length - 1);
  }, [currentIndex, skills.length]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (isAnimating) return;

    setIsAnimating(true);

    const newIndex = direction === 'right' 
      ? Math.min(currentIndex + 1, skills.length - 1)
      : Math.max(currentIndex - 1, 0);

    setCurrentIndex(newIndex);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="relative w-screen -translate-x-1/2 left-1/2 overflow-hidden">
      <div className="relative">
        {/* Bouton gauche */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/10 backdrop-blur-xl hover:bg-white rounded-full p-4 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img 
              src='/public/arrow.png' 
              width={20} 
              height={20} 
              className='w-4 h-4 opacity-60 rotate-180' 
              alt="Previous"
            />
          </button>
        )}

        {/* Bouton droit */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/10 backdrop-blur-xl hover:bg-white rounded-full p-4 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img 
              src='/public/arrow.png' 
              width={20} 
              height={20} 
              className='w-4 h-4 opacity-60' 
              alt="Next"
            />
          </button>
        )}

        {/* Container du carousel avec position fixe pour les cartes */}
        <div className="pl-20 py-8">
          <div className="relative w-full">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (cardWidth + cardGap)}px)`
              }}
            >
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0"
                  style={{ marginRight: `${cardGap}px` }}
                >
                  <SkillCard {...skill} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsCarousel;