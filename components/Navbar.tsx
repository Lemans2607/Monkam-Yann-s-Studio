import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, Wand2, Sun, Moon, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { UserRole } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Helper to determine active link styling
  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `relative px-3 py-2 text-sm font-medium transition-colors group ${
      isActive ? 'text-yann-gold font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-yann-gold dark:hover:text-yann-gold'
    }`;
  };

  // Helper for the underline animation
  const AnimatedUnderline = ({ isActive }: { isActive: boolean }) => (
    <span 
      className={`absolute bottom-0 left-0 h-0.5 bg-yann-gold transition-all duration-300 ease-out origin-left
      ${isActive ? 'w-full h-[3px]' : 'w-0 group-hover:w-full'}`}
    />
  );

  return (
    <nav className="sticky top-0 z-50 bg-yann-light/95 dark:bg-yann-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Yann's Note Logo" className="w-10 h-10 rounded-full object-cover border border-yann-gold group-hover:scale-105 transition-transform" />
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">Yann's <span className="text-yann-gold">Note</span></span>
            </Link>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/" className={getLinkClasses('/')}>
                Accueil
                <AnimatedUnderline isActive={location.pathname === '/'} />
              </Link>

              {/* STUDENT ROLE LINKS */}
              {(user?.role === UserRole.STUDENT || user?.role === UserRole.ADMIN) && (
                <Link to="/students" className={getLinkClasses('/students')}>
                  Étudiants
                  <AnimatedUnderline isActive={location.pathname === '/students'} />
                </Link>
              )}

              {/* BUSINESS ROLE LINKS */}
              {(user?.role === UserRole.BUSINESS || user?.role === UserRole.ADMIN) && (
                <Link to="/business" className={getLinkClasses('/business')}>
                  PME & Leaders
                  <AnimatedUnderline isActive={location.pathname === '/business'} />
                </Link>
              )}

              {/* SHARED AI TOOLS */}
              {user && (
                <>
                  <Link to="/studio" className={`${getLinkClasses('/studio')} flex items-center gap-1`}>
                    <Wand2 size={14} /> Studio IA
                    <AnimatedUnderline isActive={location.pathname === '/studio'} />
                  </Link>
                  <Link to="/brain" className={getLinkClasses('/brain')}>
                    Cerveau Numérique
                    <AnimatedUnderline isActive={location.pathname === '/brain'} />
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
             {/* Theme Toggle */}
             <button 
               onClick={toggleTheme}
               className="p-2 rounded-full text-gray-500 hover:text-yann-gold dark:text-gray-300 dark:hover:text-yann-gold transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
               aria-label="Toggle Theme"
             >
               <AnimatePresence mode="wait">
                 {theme === 'dark' ? (
                   <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                   >
                     <Sun size={20} />
                   </motion.div>
                 ) : (
                   <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                   >
                     <Moon size={20} />
                   </motion.div>
                 )}
               </AnimatePresence>
             </button>

             {user ? (
               <div className="flex items-center gap-3">
                 <div className="text-right hidden xl:block">
                   <div className="text-xs text-gray-500 dark:text-gray-400">Connecté en tant que</div>
                   <div className="text-sm font-bold text-yann-gold uppercase">{user.role}</div>
                 </div>
                 {user.role === UserRole.ADMIN && (
                   <Link to="/admin">
                     <Button 
                        variant="outline" 
                        className="!px-3 bg-yann-gold/10 border-yann-gold text-yann-gold hover:bg-yann-gold hover:text-yann-dark animate-pulse"
                        title="Espace Admin"
                     >
                       <ShieldCheck size={20} className="mr-2" />
                       <span className="font-bold">ADMIN</span>
                     </Button>
                   </Link>
                 )}
                 <Button variant="ghost" className="!py-2 !px-3 hover:bg-red-500/10 hover:text-red-500" onClick={logout}>
                   <LogOut size={18} />
                 </Button>
               </div>
             ) : (
               <Link to="/login">
                  <Button variant="primary" size="sm" className="!py-2 hover:shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                    <UserIcon size={18} className="mr-2" /> Connexion
                  </Button>
               </Link>
             )}
          </div>

          <div className="-mr-2 flex lg:hidden items-center gap-2">
            <button 
               onClick={toggleTheme}
               className="p-2 rounded-full text-gray-500 dark:text-gray-300"
            >
               <AnimatePresence mode="wait">
                 {theme === 'dark' ? (
                   <motion.div
                    key="sun-mobile"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                   >
                     <Sun size={20} />
                   </motion.div>
                 ) : (
                   <motion.div
                    key="moon-mobile"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                   >
                     <Moon size={20} />
                   </motion.div>
                 )}
               </AnimatePresence>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-200 dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-white hover:bg-yann-gold focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-yann-light dark:bg-yann-dark border-b border-gray-200 dark:border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-yann-gold block px-3 py-2 rounded-md text-base font-medium">Accueil</Link>
            
            {(user?.role === UserRole.STUDENT || user?.role === UserRole.ADMIN) && (
              <Link to="/students" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-yann-gold block px-3 py-2 rounded-md text-base font-medium">Étudiants</Link>
            )}
            
            {(user?.role === UserRole.BUSINESS || user?.role === UserRole.ADMIN) && (
              <Link to="/business" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-yann-gold block px-3 py-2 rounded-md text-base font-medium">PME & Leaders</Link>
            )}
            
            {user && (
              <>
                <Link to="/studio" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-yann-gold block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"><Wand2 size={16}/> Studio Graphique</Link>
                <Link to="/brain" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-yann-gold block px-3 py-2 rounded-md text-base font-medium">Cerveau Numérique</Link>
              </>
            )}

            {user?.role === UserRole.ADMIN && (
              <Link to="/admin" onClick={() => setIsOpen(false)} className="text-yann-dark bg-yann-gold font-bold block px-3 py-2 rounded-md text-base border-l-4 border-white mt-2">
                 <ShieldCheck size={16} className="inline mr-2"/> Espace Admin
              </Link>
            )}

            {!user ? (
               <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-yann-gold block px-3 py-2 rounded-md text-base font-medium border-t border-gray-200 dark:border-white/10 mt-2 pt-2">Se connecter</Link>
            ) : (
               <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left text-red-500 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium border-t border-gray-200 dark:border-white/10 mt-2 pt-2">Déconnexion</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;