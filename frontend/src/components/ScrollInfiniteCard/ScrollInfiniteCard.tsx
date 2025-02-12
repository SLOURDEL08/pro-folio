import React, { useEffect, useRef, useState } from 'react';

interface Card {
  id: number;
  title: string;
  description: string;
  image?: string;
}

interface ScrollInfiniteCardProps {
  cards: Card[];
  speed?: number;
}

const Card: React.FC<Card> = ({ title, image }) => {
  return (
    <div className="w-[300px] h-[400px] bg-white rounded-xl shadow-lg flex-shrink-0 overflow-hidden">
      {image && (
        <div className="h-1/2 w-full overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

    </div>
  );
};

export const ScrollInfiniteCard: React.FC<ScrollInfiniteCardProps> = ({ 
  cards,
  speed = 50
}) => {
  const CLONE_COUNT = 10; // Nombre de fois que nous clonons l'ensemble des cartes
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Création d'un grand nombre de cartes clonées
  const clonedCards = Array(CLONE_COUNT).fill(cards).flat();

  useEffect(() => {
    const cardWidth = 300; // Largeur d'une carte
    const gap = 16; // Espace entre les cartes
    const singleSetWidth = cards.length * (cardWidth + gap);

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Calcul du déplacement
      const movement = (speed * deltaTime) / 1000;
      let newPosition = scrollPosition + movement;

      // Réinitialisation en douceur
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
  }, [scrollPosition, cards.length, speed]);

  useEffect(() => {
    const cardWidth = 300; // Largeur d'une carte
    const gap = 16; // Espace entre les cartes
    const singleSetWidth = cards.length * (cardWidth + gap);

    // Réinitialiser la position si on atteint la fin
    if (scrollPosition >= singleSetWidth) {
      setScrollPosition(0);
    }
  }, [scrollPosition, cards.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex gap-4 py-8">
        <div 
          ref={containerRef}
          className="flex gap-4 transition-transform duration-100"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            willChange: 'transform',
          }}
        >
          {/* Premier groupe de cartes visibles */}
          {clonedCards.map((card, index) => (
            <Card 
              key={`${card.id}-${index}`} 
              {...card} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollInfiniteCard;
