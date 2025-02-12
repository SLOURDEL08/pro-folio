import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';

interface Tab {
  title: string;
  description: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  duration?: number; // Durée en secondes pour chaque tab
  image: string;
}

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  duration = 5, // 5 secondes par défaut
  image
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timer | null>(null);

  const startProgress = () => {
    // Réinitialiser le progrès
    setProgress(0);
    
    // Nettoyer l'intervalle précédent si existant
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    // Créer un nouvel intervalle
    const startTime = Date.now();
    progressInterval.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (elapsedTime / (duration * 1000)) * 100;

      if (newProgress >= 100) {
        // Passer à l'onglet suivant
        setActiveTab((prev) => (prev + 1) % tabs.length);
        setProgress(0);
      } else {
        setProgress(newProgress);
      }
    }, 16); // ~60fps
  };

  // Démarrer le progrès au montage et au changement d'onglet
  useEffect(() => {
    startProgress();

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [activeTab, duration]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    startProgress();
  };

  return (
    <div className='flex text-white'>
      <div className='w-2/5 space-y-10'>
        <h3 className='text-4xl mb-4 font-bold'>Launch and manage your online store with AI.</h3>
        <span className='text-lg opacity-80'>Launch an ecommerce store, set up online payments, and manage everything with AI.</span>
        
        <div className='flex flex-col gap-4' id='tabs'>
          {tabs.map((tab, index) => (
            <div 
              key={index}
              onClick={() => handleTabClick(index)}
              className={`relative flex gap-4 cursor-pointer group transition-all duration-300 ${
                index === activeTab ? '' : 'opacity-50 hover:opacity-80'
              }`}
            >
              {/* Progress Bar verticale */}
              {index === activeTab && (
                <div className="absolute rounded-full left-0 w-1 h-full bg-white/20">
                  <div 
                    className="absolute top-0 rounded-full left-0 w-full bg-blue-600 transition-all duration-300"
                    style={{ 
                      height: `${progress}%`,
                      transition: 'height linear'
                    }}
                  />
                </div>
              )}
              
              <div className='pl-6'>
                <h4 className="font-medium text-2xl">{tab.title}</h4>
                {index === activeTab && (
                  <p className="mt-2 text-lg text-white/70 transition-all duration-300">
                    {tab.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className='flex gap-4'>
          <Button className="bg-white text-black hover:bg-white/90">
            Launch Your Store
          </Button>
          <Button variant="outline">
            Learn More
          </Button>
        </div>
      </div>

      <div className='w-3/5'>
        <img src={image} className='w-full invert object-cover' alt="Illustration" />
      </div>
    </div>
  );
};

// Exemple d'utilisation
const Example = () => {
  const tabs = [
    {
      title: "AI-powered ecommerce store generation",
      description: "Instantly build and publish a fully functional AI store. Customize design, content, and products with drag-&-drop editor and AI tools."
    },
    {
      title: "Automated inventory management",
      description: "Let AI handle your inventory tracking, reordering, and optimization while you focus on growing your business."
    },
    {
      title: "Smart marketing automation",
      description: "Leverage AI to create targeted campaigns, optimize ad spend, and drive more sales to your store automatically."
    }
  ];

  return (
    <div className="min-h-screen bg-black p-20">
      <AnimatedTabs 
        tabs={tabs}
        duration={5}
        image="/arrow.png"
      />
    </div>
  );
};

export default Example;