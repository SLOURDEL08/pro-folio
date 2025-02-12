import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@components/layout/Header/Header';
import { Footer } from '@components/layout/Footer/Footer';
import { Home } from '@pages/Home/Home';
import { DropdownProvider, useDropdown } from '@/context/DropdownContext';

const MainContent = () => {
  const { isDropdownOpen } = useDropdown();

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      
      {/* Overlay de blur */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 w-full h-full backdrop-blur-md bg-black/30
          transition-opacity duration-200 z-20"
        />
      )}
      
      {/* Wrapper pour gérer l'overflow-x sans affecter le sticky */}
      <div className="w-full">
        <div className="relative w-full max-w-[100vw] overflow-x-clip">
          <main className="flex-grow pt-16 relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Autres routes */}
            </Routes>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <DropdownProvider>
        <MainContent />
      </DropdownProvider>
    </Router>
  );
};

export default App;