// src/pages/Home/Home.tsx
import { AnimatedTabs } from '@/components/AnimatedTabs/AnimatedTabs';
import { BestProjectCarousel } from '@/components/BestProjectCarousel/BestProjectCarousel';
import ScrollSection from '@/components/layout/ScrollSection/ScrollSection';
import MasonryGrid from '@/components/MansoryWork/MansoryWork';
import ScrollInfiniteCard from '@/components/ScrollInfiniteCard/ScrollInfiniteCard';
import { SkillsCarousel } from '@/components/SkillsCard/SkillsCard';
import { Button } from '@/components/ui/Button';
import { VerticalCarousel } from '@/components/VerticalCarousel/VerticalCarousel';
import { VideoCarousel } from '@/components/VideoCard/VideoCard';
import { Hero } from '@components/sections/Hero/Hero';

const videoGroups = [
  [
    "/public/video.mp4",
    "/public/video.mp4",
    "/public/video.mp4"
  ],
  [
   "/public/video.mp4",
    "/public/video.mp4",
    "/public/video.mp4"
  ],
  // ... plus de groupes de vidéos
];


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

const cards = [
  {
    id: 1,
    title: "Titre de la carte",
    description: "Description...",
    image: "/arrow.png" // optionnel
  },
   {
    id: 2,
    title: "Titre de la carte",
    description: "Description...",
    image: "/arrow.png" // optionnel
  },
  // ... autres cartes
];

 const projects = [
    {
      title: "Projet Portfolio",
      description: "Un portfolio moderne et interactif développé avec Next.js et TailwindCSS. Ce projet met en valeur mes compétences en développement web et design d'interface.",
      image: "/public/portfolio.jpg",
      buttonText: "Voir le projet",
      buttonLink: "https://portfolio.example.com"
    },
    {
      title: "Application E-commerce",
      description: "Une plateforme e-commerce complète avec panier d'achat, paiement sécurisé et gestion des commandes en temps réel.",
      image: "/public/ecommerce.jpg",
      buttonText: "Découvrir",
      buttonLink: "https://ecommerce.example.com"
    },
    // Ajoutez d'autres projets...
 ];
  
 

const skills = [
  {
    title: "Titre",
    description: "Description",
    image: "url-image" // optionnel
  },
   {
    title: "Titre",
    description: "Description",
    image: "url-image" // optionnel
  },
    {
    title: "Titre",
    description: "Description",
    image: "url-image" // optionnel
  },
   {
    title: "Titre",
    description: "Description",
    image: "url-image" // optionnel
  },
    {
    title: "Titre",
    description: "Description",
    image: "url-image" // optionnel
  }
];

const items = [
  {
    id: 1,
    title: "Migrate your website with 1 click",
    description: "Description de la carte",
    content: "Contenu dans la liste",
    image: "/chemin/image.jpg" // optionnel
  },
    {
    id: 2,
    title: "Get secure hosting on Google Cloud",
    description: "Description de la carte",
    content: "Contenu dans la liste",
    image: "/chemin/image.jpg" // optionnel
  },
      {
    id: 3,
    title: "Auto-optimize your site to achieve 90+ PageSpeed",
    description: "Description de la carte",
    content: "Contenu dans la liste",
    image: "/chemin/image.jpg" // optionnel
  },
        {
    id: 4,
    title: "Update your website with AI-powered editor",
    description: "Description de la carte",
    content: "Contenu dans la liste",
    image: "/chemin/image.jpg" // optionnel
  },
                {
    id: 5,
    title: "Manage, customize, and automate site operations",
    description: "Description de la carte",
    content: "Contenu dans la liste",
    image: "/chemin/image.jpg" // optionnel
  },
  // ... plus d'items
];

export const Home = () => {

  const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'details', title: 'Details' },
  { id: 'conclusion', title: 'Conclusion' },
  ];
  
  const sectionsProject = [
  { id: 'tesla', title: 'Tesla.com' },
  { id: 'ferrari', title: 'FerrariBeverly' },
  { id: 'netflix', title: 'NetflixApp' },
  ];
  
   
  return (
    <div className="min-h-screen">
      <Hero />



    <ScrollSection sections={sections} >
      <section id="overview" className="min-h-screen px-20 py-28 -mt-32">
          <div className='flex items-end gap-14 mt-20'>
            <div className='space-y-8'>
               <h3 className='text-5xl font-bold leading-tight'>Build fully functional, customizable websites with AI.</h3>
               <p className='text-2xl  leading-10 font-light'>Describe your website and let AI generate layouts, set design preferences, and build a fully functional site in minutes.</p>
            </div>
            <div className=' text-right'>
                        <Button  className='w-max bg-black border-black'>Generate Your Website</Button>
</div>
           
          </div>
             <div className="relative w-screen left-[calc(-50vw+50%)] right-[calc(-50vw+50%)] mt-12">
            <div className=""> {/* Aligne avec le padding gauche de la page */}
<VideoCarousel videoGroups={videoGroups} />
            </div>
          </div>
      </section>
      
      <section id="details" className="min-h-screen bg-gray-100 py-10 px-20">
        <div className='flex items-end gap-14 mt-20'>
            <div className='space-y-8'>
               <h3 className='text-5xl font-bold leading-tight'>Build fully functional, customizable websites with AI.</h3>
               <p className='text-2xl  leading-10 font-light'>Describe your website and let AI generate layouts, set design preferences, and build a fully functional site in minutes.</p>
            </div>
            <div className=' text-right'>
                        <Button  className='w-max bg-black border-black'>Generate Your Website</Button>
</div>
           
          </div>
                  <div className="relative">
  <SkillsCarousel skills={skills} />
</div>
      </section>
      
        <section id="conclusion" className="min-h-screen bg-black">
           
      <BestProjectCarousel projects={projects} />
        

      </section>
    </ScrollSection>

      <div className='pt-20 text-center'>
        <h3 className=' text-6xl font-bold mb-10'>One platform, four powerful use cases.</h3>
          <span className=' text-xl opacity-60'>For those who have the guts to take action on their dreams.</span>
      </div>

      <ScrollSection sections={sectionsProject} >
        
        <section  className='min-h-screen'   id='tesla'>
          <div className='px-20 flex flex-col'>
          
      <div className='flex items-end gap-14'>
            <div className='space-y-8'>
               <h3 className='text-5xl font-bold leading-tight'>Build fully functional, customizable websites with AI.</h3>
               <p className='text-2xl  leading-10 font-light'>Describe your website and let AI generate layouts, set design preferences, and build a fully functional site in minutes.</p>
              </div>
              
            <div className=' text-right w-40'>
                        <Button  className='w-max bg-black border-black'>Generate Your Website</Button>
</div>
           </div>
          </div>
                <ScrollInfiniteCard cards={cards} speed={50} />


        </section>
        <section className='min-h-screen p-20  bg-black'  id='ferrari'>
          <AnimatedTabs 
        tabs={tabs}
        duration={5}
        image="/arrow.png"
      />
        </section>
        <section className=' bg-gray-100' id='netflix'>
      <VerticalCarousel items={items} duration={5} />


        </section>
    </ScrollSection>
  

      {/* Contact Section */}
      <section className="py-16">
        <div className='space-y-8 px-20 pb-20'>
               <h3 className='text-5xl font-bold leading-tight'>Build fully functional, customizable websites with AI.</h3>
               <p className='text-2xl  leading-10 font-light'>Describe your website and let AI generate layouts, set design preferences, and build a fully functional site in minutes.</p>
              </div>
            <MasonryGrid />
      </section>
    </div>
  );
};