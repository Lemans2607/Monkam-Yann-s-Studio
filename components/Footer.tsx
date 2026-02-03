import React from 'react';
import { Smartphone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#001529] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full border border-yann-gold object-cover" />
              <span className="text-xl font-bold text-white">Yann's <span className="text-yann-gold">Note</span></span>
            </div>
            <p className="text-gray-400 text-sm">
              Transformez le chaos en clarté royale. La plateforme de référence pour l'excellence académique et professionnelle au Cameroun.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/students" className="hover:text-yann-gold">Espace Étudiants</a></li>
              <li><a href="/business" className="hover:text-yann-gold">Services PME</a></li>
              <li><a href="/brain" className="hover:text-yann-gold">Cerveau Numérique</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Paiement Sécurisé</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                <div className="w-8 h-8 rounded bg-yellow-400 flex items-center justify-center text-black font-bold text-xs">MTN</div>
                <div className="text-sm text-gray-300">MTN Mobile Money</div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center text-white font-bold text-xs">OM</div>
                <div className="text-sm text-gray-300">Orange Money</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Yann's Note. Tous droits réservés.</p>
          <p className="flex items-center gap-2 mt-4 md:mt-0">
            <Smartphone size={16} />
            Mobile First Design
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;