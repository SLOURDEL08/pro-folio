import React, { useState, useEffect } from 'react';

interface SkillCardProps {
  title: string;
  description: string;
  image?: string | string[];
  carouselVertical?: string[];
}

const VerticalCarousel: React.FC<{ items: string[] }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = items.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalItems]);

  const getItemStyle = (index: number) => {
    const position = (index - currentIndex + totalItems) % totalItems;
    
    // Calculer la position verticale
    let translateY;
    let opacity = 1;
    let scale = 1;
    let zIndex = 0;
    let textColor = "text-black";
    let bgColor = "bg-transparent";
    
    // Position centrale (élément actif)
    if (position === 0) {
      translateY = "0rem";
      opacity = 1;
      scale = 1;
      zIndex = 30;
      textColor = "text-white";
      bgColor = "bg-black";
    }
    // Élément juste au-dessus
    else if (position === totalItems - 1) {
      translateY = "-4rem";
      opacity = 0.5;
      scale = 0.9;
      zIndex = 20;
    }
    // Élément juste en-dessous
    else if (position === 1) {
      translateY = "4rem";
      opacity = 0.5;
      scale = 0.9;
      zIndex = 20;
    }
    // Élément deux positions au-dessus
    else if (position === totalItems - 2) {
      translateY = "-7rem";
      opacity = 0.2;
      scale = 0.7;
      zIndex = 10;
    }
    // Élément deux positions en-dessous
    else if (position === 2) {
      translateY = "7rem";
      opacity = 0.2;
      scale = 0.7;
      zIndex = 10;
    }
    // Autres éléments (cachés)
    else {
      translateY = position < totalItems / 2 ? "10rem" : "-10rem";
      opacity = 0;
      scale = 0.4;
      zIndex = 0;
    }

    return {
      transform: `translateY(${translateY}) scale(${scale})`,
      opacity,
      zIndex,
      className: `absolute text-2xl w-max transition-all duration-500 ease-in-out px-20 py-3 rounded-full text-center font-medium ${textColor} ${bgColor} hover:cursor-pointer`
    };
  };

  const handleItemClick = (index: number) => {
    const diff = (index - currentIndex + totalItems) % totalItems;
    if (diff !== 0) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="relative h-80 w-full overflow-hidden flex items-center justify-center">
      {items.map((item, index) => {
        const style = getItemStyle(index);
        return (
          <div
            key={index}
            onClick={() => handleItemClick(index)}
            className={style.className}
            style={{
              transform: style.transform,
              opacity: style.opacity,
              zIndex: style.zIndex
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

const SkillCard: React.FC<SkillCardProps> = ({ 
  title, 
  description, 
  image, 
  carouselVertical 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const images = Array.isArray(image) ? image : [image];

  useEffect(() => {
    if (!image || images.length <= 1) return;

    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setOpacity(1);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [image, images.length]);

  return (
    <div className="w-[450px] h-[34rem] relative flex flex-col justify-between bg-white rounded-3xl overflow-hidden shadow-lg">
      <div className="p-8 z-10 h-max flex-grow">
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 text-lg font-light">{description}</p>
      </div>
      
      {carouselVertical ? (
        <div className="w-full flex items-center justify-center mb-8">
          <VerticalCarousel items={carouselVertical} />
        </div>
      ) : image && (
        <div className="w-full flex items-end absolute bottom-0 h-96">
          <img
            src={images[currentImageIndex]}
            alt={title}
            className="w-full h-auto max-h-96 object-contain transition-opacity duration-300"
            style={{ opacity }}
          />
        </div>
      )}
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

  const cardWidth = 450;
  const cardGap = 24;

  useEffect(() => {
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
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/10 backdrop-blur-xl hover:bg-white rounded-full p-4 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="/arrow.png"
              className="w-4 h-4 opacity-60 rotate-180"
              alt="Previous"
            />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/10 backdrop-blur-xl hover:bg-white rounded-full p-4 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="/arrow.png"
              className="w-4 h-4 opacity-60"
              alt="Next"
            />
          </button>
        )}

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