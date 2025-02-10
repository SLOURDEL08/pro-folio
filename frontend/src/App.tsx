// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@components/layout/Header/Header';
import { Footer } from '@components/layout/Footer/Footer';
import { Home } from '@pages/Home/Home';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16"> {/* pt-16 pour compenser la hauteur du header fixed */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Ajoutez d'autres routes ici */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/projects" element={<Projects />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;