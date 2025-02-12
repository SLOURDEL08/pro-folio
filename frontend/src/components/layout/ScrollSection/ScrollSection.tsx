import React, { useEffect, useState, ReactNode, useId } from 'react';

interface Section {
  id: string;
  title: string;
}

interface ScrollSectionProps {
  sections: Section[];
  children: ReactNode;
}

const ScrollSection = ({ sections, children }: ScrollSectionProps) => {
  const scrollSectionId = useId(); // Génère un ID unique pour chaque instance
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  // Crée des IDs uniques pour les sections de cette instance
  const getSectionId = (sectionId: string) => `${scrollSectionId}-${sectionId}`;

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -30% 0px', // Ajuste la zone de détection
      threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple seuils pour une meilleure détection
    };

    const observer = new IntersectionObserver((entries) => {
      // Trie les entrées par ratio d'intersection pour obtenir la plus visible
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries.length > 0) {
        const sectionId = visibleEntries[0].target.id.replace(`${scrollSectionId}-`, '');
        setActiveSection(sectionId);
      }
    }, options);

    // Observer les sections avec leurs IDs uniques
    sections.forEach((section) => {
      const element = document.getElementById(getSectionId(section.id));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections, scrollSectionId]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(getSectionId(sectionId));
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = window.pageYOffset + elementRect.top;
      const offset = 120; // Ajusté pour tenir compte du header et de la marge
      
      window.scrollTo({
        top: absoluteElementTop - offset,
        behavior: 'smooth'
      });
    }
  };

  // Modifie les children pour ajouter les IDs uniques
  const childrenWithIds = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.props.id) {
      return React.cloneElement(child, {
        id: getSectionId(child.props.id),
      });
    }
    return child;
  });

  return (
    <div className="relative min-h-screen">
      {/* Sticky Section Indicator */}
      <div className="sticky top-24 ml-20 my-20 z-40">
        <div className="flex w-max gap-2 bg-white rounded-full backdrop-blur-sm p-1.5 shadow-lg">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300
                ${activeSection === section.id 
                  ? 'bg-black text-white' 
                  : 'text-gray-600 hover:bg-gray-200'
                }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="w-full">
        {childrenWithIds}
      </div>
    </div>
  );
};

export default ScrollSection;