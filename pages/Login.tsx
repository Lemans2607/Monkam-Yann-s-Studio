import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, AlertCircle, User, Briefcase, Shield } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Redirect to where user came from, or home
  // In RRv6 location.state is unknown, so we cast to any or a specific interface
  const from = (location.state as any)?.from?.pathname || "/";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // SIMULATION AUTHENTICATION LOGIC
    if (password === 'password') { // Simplified password for demo
      if (username === 'admin') {
        login('admin', UserRole.ADMIN);
        navigate('/admin');
        return;
      } else if (username === 'student') {
        login('student', UserRole.STUDENT);
        navigate('/students');
        return;
      } else if (username === 'business') {
        login('business', UserRole.BUSINESS);
        navigate('/business');
        return;
      }
    }
    
    // Legacy check for original admin code
    if (username === 'admin' && password === 'admin') {
       login('admin', UserRole.ADMIN);
       navigate('/admin');
       return;
    }

    setError('Identifiants incorrects.');
  };

  const fillCredentials = (user: string, roleName: string) => {
    setUsername(user);
    setPassword('password');
    setError(`Mode Démo: Identifiants ${roleName} pré-remplis.`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl dark:shadow-none transition-colors duration-300">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-yann-gold shadow-lg shadow-yann-gold/20 bg-black" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Connexion</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Accédez à votre Hub de Clarté</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Identifiant</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-yann-gold transition-colors"
              placeholder="Nom d'utilisateur"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-yann-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className={`flex items-center gap-2 text-sm p-3 rounded-lg border ${error.includes('Mode Démo') ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <Button fullWidth type="submit" className="mt-4">
            <Lock size={18} className="mr-2" />
            Se connecter
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
           <p className="text-xs text-center text-gray-500 mb-4">Accès rapide (Démo)</p>
           <div className="grid grid-cols-3 gap-2">
              <button onClick={() => fillCredentials('student', 'Étudiant')} className="flex flex-col items-center justify-center p-2 rounded bg-gray-100 dark:bg-white/5 hover:bg-yann-gold/10 transition-colors">
                 <User size={16} className="mb-1 text-gray-600 dark:text-gray-300"/>
                 <span className="text-[10px] text-gray-500 dark:text-gray-400">Étudiant</span>
              </button>
              <button onClick={() => fillCredentials('business', 'Business')} className="flex flex-col items-center justify-center p-2 rounded bg-gray-100 dark:bg-white/5 hover:bg-yann-gold/10 transition-colors">
                 <Briefcase size={16} className="mb-1 text-gray-600 dark:text-gray-300"/>
                 <span className="text-[10px] text-gray-500 dark:text-gray-400">PME</span>
              </button>
              <button onClick={() => fillCredentials('admin', 'Admin')} className="flex flex-col items-center justify-center p-2 rounded bg-gray-100 dark:bg-white/5 hover:bg-yann-gold/10 transition-colors">
                 <Shield size={16} className="mb-1 text-gray-600 dark:text-gray-300"/>
                 <span className="text-[10px] text-gray-500 dark:text-gray-400">Admin</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;