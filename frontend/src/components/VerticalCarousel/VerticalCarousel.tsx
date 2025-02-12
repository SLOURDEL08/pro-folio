import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  content: string;
}

interface VerticalCarouselProps {
  items: CarouselItem[];
  duration?: number;
}

export const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  items,
  duration = 5
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startProgress = () => {
    setProgress(0);
    
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    const startTime = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (elapsedTime / (duration * 1000)) * 100;

      if (newProgress >= 100) {
        setActiveIndex((prev) => (prev + 1) % items.length);
        setProgress(0);
      } else {
        setProgress(newProgress);
      }
    }, 16);
  };

  useEffect(() => {
    startProgress();
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [activeIndex, duration]);

  const selectItem = (index: number) => {
    setActiveIndex(index);
    startProgress();
  };

  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
      <div className="flex gap-32 px-20">
          
      {/* Carousel Vertical à gauche */}
      <div className="w-1/2 relative h-[700px] overflow-hidden">
        {items.map((item, index) => (
          <div 
            key={item.id}
            className={`absolute w-full h-[500px] left-0 transition-all duration-700 ease-out
              ${index === activeIndex ? 'opacity-100' : 'opacity-60 pointer-events-none'}`}
            style={{
              top: '50%',
              transform: `translateY(-50%) translateY(${(index - activeIndex) * 100}%)`
            }}
          >
            <div className="h-full py-4">
              <div className="bg-white rounded-2xl h-full w-full p-8">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-60 object-cover rounded-xl mb-6" 
                  />
                )}
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Liste avec Progress/Arrow à droite */}
          <div className="w-1/2 flex  gap-14 flex-col justify-center">
                        <h3 className='text-5xl leading-tight font-bold'>Move to better managed WordPress hosting.</h3>
        <ul className="space-y-6">
          {items.map((item, index) => (
            <li 
              key={item.id}
              className={`flex gap-2 items-center cursor-pointer group transition-all duration-300
                ${index === activeIndex ? 'opacity-100 bg-white p-3 px-4 rounded-xl' : 'opacity-50 hover:opacity-70'}`}
              onClick={() => selectItem(index)}
            >
              {/* Container pour l'icône/progress avec la même taille pour les deux états */}
<div className="relative w-6 h-6"> {/* Réduit de w-8 h-8 à w-6 h-6 */}
  {/* Arrow icon - Visible when inactive */}
  <div 
    className={`absolute inset-0 transition-all duration-300 
      ${index === activeIndex ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
  >
    <img 
      src='/public/arrow.png' 
      alt="arrow" 
      className="w-3 h-3 opacity-60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" // Réduit de w-4 h-4 à w-3 h-3
    />
  </div>

  {/* Progress Circle - Visible when active */}
  <div 
    className={`absolute inset-0 transition-all duration-300
      ${index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
  >
    <svg className="transform -rotate-90 w-6 h-6"> {/* Réduit de w-8 h-8 à w-6 h-6 */}
      {/* Cercle de fond */}
      <circle
        cx="12" // Changé de 16 à 12
        cy="12" // Changé de 16 à 12
        r={radius}
        stroke="currentColor"
        strokeWidth="2" // Réduit de 3 à 2
        fill="none"
        className="text-gray-200"
      />
      {/* Cercle de progression */}
      {index === activeIndex && (
        <circle
          cx="12" // Changé de 16 à 12
          cy="12" // Changé de 16 à 12
          r={radius}
          stroke="currentColor"
          strokeWidth="2" // Réduit de 3 à 2
          fill="none"
          className="text-black transition-all duration-100"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      )}
    </svg>
  </div>
</div>

              {/* Contenu du li */}
              <div>
                <h4 className="font-semibold text-lg ">{item.title}</h4>
              </div>
            </li>
          ))}
              </ul>
              <div className='flex gap-6'><Button size='lg' className='bg-black border-black'>Migration Your Site</Button><Button className='bg-transparent border-black text-black' size='lg'>Learn More</Button></div>
      </div>
    </div>
  );
};

export default VerticalCarousel;