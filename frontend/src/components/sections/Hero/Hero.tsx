// src/components/sections/Hero/Hero.tsx
import { Button } from '@components/ui/Button';

export const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden -mt-16">
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
      <div className="relative z-20 pt-56 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block opacity-90">Bienvenue sur mon</span>
              <span className="block text-primary-400">Portfolio</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Développeur Web Full Stack passionné par la création d'applications web modernes et performantes.
            </p>
            <div className="mt-5 max-w-md gap-6 mx-auto sm:flex sm:justify-center md:mt-8">
              <Button size="lg">
                Voir mes projets
              </Button>
              <Button variant="outline" size="lg">
                Me contacter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-20 z-30" />
    </section>
  );
};