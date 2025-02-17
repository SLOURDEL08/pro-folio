import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@components/layout/Header/Header';
import { Footer } from '@components/layout/Footer/Footer';
import { Home } from '@pages/Home/Home';
import { DropdownProvider, useDropdown } from '@/context/DropdownContext';
import Login from '@/components/admin/Login';
import Dashboard from '@/components/admin/Dashboard';
import ProjectForm from './components/admin/ProjectForm';

// Composant PrivateRoute pour protéger les routes admin
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" />;
};

// Composant pour le layout admin
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
};

// Composant pour le layout principal
const MainContent = () => {
  const { isDropdownOpen } = useDropdown();

  return (
    <div className="min-h-screen font-qlickers flex flex-col relative">
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
              {/* Autres routes du portfolio */}
            </Routes>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Composant principal
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes du portfolio */}
        <Route
          path="/*"
          element={
            <DropdownProvider>
              <MainContent />
            </DropdownProvider>
          }
        />

        {/* Routes Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="projects/new" element={<ProjectForm />} />
                  <Route path="projects/edit/:id" element={<ProjectForm />} />
                  {/* Ajoutez d'autres routes admin ici */}
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;