import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, Wand2 } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-yann-gold font-bold" : "text-gray-300 hover:text-yann-gold";

  return (
    <nav className="sticky top-0 z-50 bg-yann-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Yann's Note Logo" className="w-10 h-10 rounded-full object-cover border border-yann-gold" />
              <span className="text-xl font-bold tracking-tight text-white">Yann's <span className="text-yann-gold">Note</span></span>
            </Link>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/" className={`${isActive('/')} transition-colors px-3 py-2 rounded-md text-sm font-medium`}>Accueil</Link>
              <Link to="/students" className={`${isActive('/students')} transition-colors px-3 py-2 rounded-md text-sm font-medium`}>Étudiants</Link>
              <Link to="/business" className={`${isActive('/business')} transition-colors px-3 py-2 rounded-md text-sm font-medium`}>PME & Leaders</Link>
              <Link to="/studio" className={`${isActive('/studio')} transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1`}>
                 <Wand2 size={14} /> Studio IA
              </Link>
              <Link to="/brain" className={`${isActive('/brain')} transition-colors px-3 py-2 rounded-md text-sm font-medium`}>Cerveau Numérique</Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
             <Link to="/admin">
               <Button variant="ghost" className="!px-3">
                 <ShieldCheck size={20} />
               </Button>
             </Link>
             <a href="https://wa.me/237676042996" target="_blank" rel="noreferrer">
               <Button variant="outline" className="!py-2">Contact</Button>
             </a>
          </div>

          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-yann-dark border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Accueil</Link>
            <Link to="/students" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Étudiants</Link>
            <Link to="/business" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">PME & Leaders</Link>
            <Link to="/studio" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"><Wand2 size={16}/> Studio Graphique</Link>
            <Link to="/brain" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Cerveau Numérique</Link>
            <Link to="/admin" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Espace Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;