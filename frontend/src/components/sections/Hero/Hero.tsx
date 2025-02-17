// src/components/sections/Hero/Hero.tsx
import MemojiInteractive from '@/components/MemojiTrackingMouse/MemojiTrackingMouse';
import { Button } from '@components/ui/Button';
const centerToRightFrames = [
  '/memoji-center-to-right/unscreen-001.png',
  '/memoji-center-to-right/unscreen-002.png',
  '/memoji-center-to-right/unscreen-003.png',
  '/memoji-center-to-right/unscreen-004.png',
  '/memoji-center-to-right/unscreen-005.png',
  '/memoji-center-to-right/unscreen-006.png',
  '/memoji-center-to-right/unscreen-007.png',
  '/memoji-center-to-right/unscreen-008.png',
  '/memoji-center-to-right/unscreen-009.png',
  '/memoji-center-to-right/unscreen-010.png',
  '/memoji-center-to-right/unscreen-011.png',
  '/memoji-center-to-right/unscreen-012.png',
  '/memoji-center-to-right/unscreen-013.png',
  '/memoji-center-to-right/unscreen-014.png',
  '/memoji-center-to-right/unscreen-015.png',
  '/memoji-center-to-right/unscreen-016.png',
  '/memoji-center-to-right/unscreen-017.png',
  '/memoji-center-to-right/unscreen-018.png',
  '/memoji-center-to-right/unscreen-019.png',
  '/memoji-center-to-right/unscreen-020.png',
  '/memoji-center-to-right/unscreen-021.png',
  '/memoji-center-to-right/unscreen-022.png',
  '/memoji-center-to-right/unscreen-023.png',
  '/memoji-center-to-right/unscreen-024.png',
  '/memoji-center-to-right/unscreen-025.png',
  '/memoji-center-to-right/unscreen-026.png',
  '/memoji-center-to-right/unscreen-027.png',
  '/memoji-center-to-right/unscreen-028.png'
];

const centerToLeftFrames = [
  '/memoji-center-to-left/unscreen-001.png',
  '/memoji-center-to-left/unscreen-002.png',
  '/memoji-center-to-left/unscreen-003.png',
  '/memoji-center-to-left/unscreen-004.png',
  '/memoji-center-to-left/unscreen-005.png',
  '/memoji-center-to-left/unscreen-006.png',
  '/memoji-center-to-left/unscreen-007.png',
  '/memoji-center-to-left/unscreen-008.png',
  '/memoji-center-to-left/unscreen-009.png',
  '/memoji-center-to-left/unscreen-010.png',
  '/memoji-center-to-left/unscreen-011.png',
  '/memoji-center-to-left/unscreen-012.png',
  '/memoji-center-to-left/unscreen-013.png',
  '/memoji-center-to-left/unscreen-014.png',
  '/memoji-center-to-left/unscreen-015.png',
  '/memoji-center-to-left/unscreen-016.png',
  '/memoji-center-to-left/unscreen-017.png',
  '/memoji-center-to-left/unscreen-018.png',
  '/memoji-center-to-left/unscreen-019.png'
];

const centerFrames = [centerToRightFrames[0]];



export const Hero = () => {

  
  return (
    <section className="relative flex flex-col justify-center min-h-screen overflow-hidden -mt-16">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Gradient Orbs Layer */}
      <div className="absolute inset-0 z-10">
        <div 
          className="absolute top-20 left-1/4 w-[40vw] h-[40vw]
          rounded-full filter blur-3xl opacity-15 
          animate-blob animate-color-1 bg-purple-500"
        />
        <div 
          className="absolute top-40 right-1/5 w-[35vw] h-[35vw]
          rounded-full filter blur-3xl opacity-15 
          animate-blob animate-color-2 animation-delay-2000 bg-blue-500"
        />
        <div 
          className="absolute top-60 left-1/2 w-[45vw] h-[45vw]
          rounded-full filter blur-3xl opacity-15 
          animate-blob animate-color-3 animation-delay-4000 bg-emerald-500"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 ">
           <MemojiInteractive
      centerToRightFrames={centerToRightFrames}
              centerToLeftFrames={centerToLeftFrames}
              centerFrames={centerFrames}
    />
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
                        <p className="mb-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Développeur Web Front-End 
            </p>
            <h1 className="text-4xl tracking-tight font-semibold text-white sm:text-5xl md:text-6xl">
              <span className="block opacity-90">Bienvenue sur mon Portfolio</span>
            </h1>

                  

            <div className="mt-5 max-w-md gap-6 mx-auto sm:flex sm:justify-center md:mt-8">
              <Button size="lg">
                Voir mes projets
              </Button>
              <Button variant="outline" size="lg">
                Me contacter
              </Button>
            </div>
          </div>
          <div className='text-center flex justify-center items-center'>
          
          </div>
        </div>
      </div>

      {/* Gradient Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-20 z-30" />
    </section>
  );
};