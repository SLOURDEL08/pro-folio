// src/components/layout/Header/Header.tsx
import { Button } from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDropdown } from '@/context/DropdownContext';

const navItems = {
  home: {
    title: "Accueil",
    links: [
      { label: "Services", href: "/services" },
      { label: "Expertises", href: "/expertise" },
      { label: "Témoignages", href: "/testimonials" },
      { label: "Blog", href: "/blog" },
      { label: "React Development", href: "/dev/react" },
      { label: "Vue.js Solutions", href: "/dev/vue" },
      { label: "TypeScript Expertise", href: "/dev/typescript" },
    ]
  },
  projects: {
    title: "Projets",
    links: [
      { label: "React Development", href: "/dev/react" },
      { label: "Next.js Projects", href: "/dev/nextjs" },
      { label: "Vue.js Solutions", href: "/dev/vue" },
      { label: "TypeScript Expertise", href: "/dev/typescript" },
      { label: "React Development", href: "/dev/react" },
      { label: "Next.js Projects", href: "/dev/nextjs" },
      { label: "Vue.js Solutions", href: "/dev/vue" },
      { label: "TypeScript Expertise", href: "/dev/typescript" },
    ]
  },
  about: {
    title: "À Propos",
    links: [
      { label: "Mon Parcours", href: "/about/journey" },
      { label: "Compétences", href: "/about/skills" },
      { label: "Formations", href: "/about/education" },
      { label: "Expériences", href: "/about/experience" },
      { label: "React Development", href: "/dev/react" },
      { label: "TypeScript Expertise", href: "/dev/typescript" },
    ]
  }
};

const DropdownMenu = ({ title, links, isScrolled }: { title: string, links: { label: string, href: string }[], isScrolled: boolean }) => {
  const { setIsDropdownOpen } = useDropdown();

  return (
    <div 
      className="group relative flex items-center h-20"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <button 
        className={`hover:text-primary-600 flex items-center z-[60] relative
          ${isScrolled ? 'text-gray-900' : 'text-white'}`}
      >
        {title}
      </button>

      {/* Dropdown content */}
      <div 
        className={`fixed left-0 right-0 invisible opacity-0 transform 
        -translate-y-2 group-hover:translate-y-0 group-hover:visible 
        group-hover:opacity-100 transition-[transform,opacity,visibility] 
        duration-200 ease-out top-20 pt-0 z-50
        ${isScrolled ? 'bg-white/95' : 'bg-black/95'}`}
      >
        <div className="shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div 
              className="grid grid-cols-3 gap-6"
              style={{ gridAutoFlow: 'column', gridTemplateRows: 'repeat(4, auto)' }}
            >
              {links.map((link, linkIdx) => (
                <Link
                  key={linkIdx}
                  to={link.href}
                  className={`text-lg transition-colors duration-200 flex items-center group
                    ${isScrolled 
                      ? 'text-gray-600 hover:text-gray-900' 
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <span className="group-hover:translate-x-2 transition-transform duration-200">
                    {link.label}
                  </span>
                  <svg 
                    className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-200" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`w-full backdrop-blur-sm z-50 transition-all duration-300
        ${isScrolled ? 'fixed bg-white/95 top-0' : 'absolute top-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          {/* Logo and Left Navigation */}
          <div className="flex items-center text-white gap-10" >
            {/* Logo avec un z-index plus élevé que tout le reste */}
            <Link to="/" className={`text-2xl font-bold relative z-[100]  ${isScrolled ? 'text-black' : ''}`}>
              Portfolio
            </Link>
            {/* Navigation avec un z-index plus bas */}
            <nav className="hidden md:flex items-center gap-10 h-20 relative z-[45]">
              <DropdownMenu isScrolled={isScrolled} title={navItems.home.title} links={navItems.home.links} />
              <DropdownMenu isScrolled={isScrolled} title={navItems.projects.title} links={navItems.projects.links} />
              <DropdownMenu isScrolled={isScrolled} title={navItems.about.title} links={navItems.about.links} />
            </nav>
          </div>

          {/* Right Navigation avec un z-index élevé aussi */}
    <nav className="hidden md:flex items-center space-x-4 relative z-[100]">
  <Button 
    variant={isScrolled ? 'ghost' : 'outline'} 
    size='lg'
  >
    Download CV
  </Button>
  <Button 
    variant={isScrolled ? 'primary' : 'secondary'} 
    size='lg'
  >
    Contact
  </Button>
</nav>

          {/* Mobile menu button */}
          <div className="md:hidden relative z-[100]">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden relative z-40">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {Object.values(navItems).map((item) => (
                <div key={item.title} className="py-2">
                  <div className="px-3 text-white font-medium">{item.title}</div>
                  {item.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};