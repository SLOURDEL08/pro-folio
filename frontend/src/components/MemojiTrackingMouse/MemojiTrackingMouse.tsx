import React, { useState, useEffect, useRef } from 'react';

interface MemojiInteractiveProps {
  centerToRightFrames: string[];
  centerToLeftFrames: string[];
  centerFrames: string[];
}

const MemojiInteractive: React.FC<MemojiInteractiveProps> = ({
  centerToRightFrames,
  centerToLeftFrames,
  centerFrames,
}) => {
  const [currentFrame, setCurrentFrame] = useState<string>(centerFrames[0]);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      const { clientX } = event;
      const centerX = window.innerWidth / 2;
      let frames: string[];

      // Sélectionner le tableau de frames approprié
      if (clientX > centerX + 20) { // Ajoute une zone morte de 50px
        frames = centerToRightFrames;
      } else if (clientX < centerX - 20) { // Ajoute une zone morte de 50px
        frames = centerToLeftFrames;
      } else {
        frames = centerFrames;
      }

      // Calculer l'index relatif à la section actuelle
      let percentage: number;
      if (clientX > centerX) {
        percentage = (clientX - centerX) / (window.innerWidth - centerX);
      } else if (clientX < centerX - 20) {
        // Modification ici pour la partie gauche
        percentage = 1 - (clientX / (centerX - 20));
      } else {
        percentage = 0;
      }

      const frameIndex = Math.floor(percentage * (frames.length - 1));
      const boundedIndex = Math.min(frames.length - 1, Math.max(0, frameIndex));
      setCurrentFrame(frames[boundedIndex]);
    }, 10);
  };

  useEffect(() => {
    const handleMouseMoveEvent = (e: MouseEvent) => handleMouseMove(e);
    window.addEventListener('mousemove', handleMouseMoveEvent);

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveEvent);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [centerToRightFrames, centerToLeftFrames, centerFrames]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <img
        src={currentFrame}
        alt="Memoji Animation"
        className="w-[800px] h-48  object-cover pointer-events-none"
      />
    </div>
  );
};

export default MemojiInteractive;