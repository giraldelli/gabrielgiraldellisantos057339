import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center sm:justify-start items-center h-16">
            <Link to="/login" className="flex items-center gap-2 text-sky-500">
              <div className="bg-sky-500 p-2 rounded-xl text-white">
                <PawPrint className="w-6 h-6" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-800">PetConnect</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-sky-100/50 p-8 md:p-10 border border-white">
          {children}
        </div>
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2025 PetConnect. Feito com amor.</p>
      </footer>
    </div>
  );
}
