import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Dog, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LOGO_URL = 'https://i.imgur.com/cqOdfj3.png';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-sky-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center">
              <Link to="/pets" className="hover:opacity-90 transition-opacity">
                <img src={LOGO_URL} alt="PetConnect" className="h-20 w-auto object-contain mix-blend-multiply" />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/pets"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                <Dog className="w-5 h-5" /> <span className="hidden sm:inline">Pets</span>
              </Link>
              <Link
                to="/tutores"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                <User className="w-5 h-5" /> <span className="hidden sm:inline">Tutores</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-slate-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                title="Sair"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow p-4 sm:p-6 lg:p-8">{children}</main>

      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2025 PetConnect. Feito com amor.</p>
      </footer>
    </div>
  );
};
