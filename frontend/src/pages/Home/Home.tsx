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
    image: "/design/digitoile.png" // optionnel
  },
   {
    id: 2,
    title: "Titre de la carte",
    description: "Description...",
    image: "/design/Crafty.png" // optionnel
  },
      {
    id:3,
    title: "Titre de la carte",
    description: "Description...",
    image: "/design/avocat.png" // optionnel
  },
         {
    id: 4,
    title: "Titre de la carte",
    description: "Description...",
    image: "/design/digitalizerr.png" // optionnel
  },
  // ... autres cartes
];

const projects = [
  {
    title: "Projet Portfolio",
    tag: "Next.js",
    details: [
      "Développé avec Next.js et TailwindCSS",
      "Interface responsive et moderne",
      "Optimisation SEO et performance",
      "Animations fluides et interactives"
    ],
    image: "/formation/booki.webp",
    buttonText: "Voir le projet",
    buttonLink: "https://portfolio.example.com"
  },
  {
    title: "Application E-commerce",
    tag: "Full-Stack",
    details: [
      "Authentification sécurisée",
      "Paiement Stripe intégré",
      "Gestion de panier en temps réel",
      "Dashboard administrateur"
    ],
    image: "/formation/kasa.webp",
    buttonText: "Découvrir",
    buttonLink: "https://ecommerce.example.com"
  },
  {
    title: "API REST",
    tag: "Back-end",
    details: [
      "Architecture REST complète",
      "Sécurité et authentification JWT",
      "Documentation Swagger",
      "Tests unitaires et d'intégration"
    ],
    image: "/formation/monvieuxgrimoire.webp",
    buttonText: "Découvrir",
    buttonLink: "https://api.example.com"
  }
];
  
 

const skills = [
  {
    title: "Front-End",
    description: "Création d'interfaces utilisateurs réactives et modernes en utilisant HTML, CSS, JavaScript et des frameworks comme React.",
    image: "/responsivedevfront.png", // optionnel
  },
    {
    title: "Performance Web",
    description: "Optimisation des sites pour une performance maximale, en visant un score PageSpeed supérieur à 90.",
    image: "/pagespeed.jpg" // optionnel
  },
   {
    title: "Back-End",
    description: "Conception et consommation d'APIs RESTful, permettant une communication fluide entre le front-end et le back-end.",
    carouselVertical: [
      "React.js",
      "Vue.js",
      "Next.js",
      "TypeScript",
      "Redux",
      "React Query"
    ] // optionnel
  },
  {
    title: "Déploiement",
    description: "Automatisation du processus de déploiement avec des outils comme Docker, CI/CD, et hébergement sur des services cloud (AWS, Heroku).",
    image: ["/vercel.webp", "/netlify2.png"] // Alternera entre ces images
  },
    {
    title: "Intégration Maquettes",
    description: "Conversion de maquettes Figma/AdobeXD en sites web fonctionnels, en respectant les meilleures pratiques d'accessibilité et de performance.",
    image: "/maquetteviewer.png" // optionnel
  },
  {
    title: "Styling Avancé",
    description: "Utilisation de frameworks CSS comme TailwindCSS, Bootstrap et Sass pour des interfaces visuellement attrayantes et responsives.",
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
          <div className='flex items-end gap-14 mt20'>
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
       <ScrollInfiniteCard tag="design" speed={50} />


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