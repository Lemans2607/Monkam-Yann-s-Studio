import React from 'react';
import { Smartphone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#001529] border-t border-yann-gold/20 pt-16 pb-8 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-yann-gold to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full border-2 border-yann-gold object-cover shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
              <div>
                <span className="block text-xl font-bold text-white tracking-tight">Yann's <span className="text-yann-gold">Note</span></span>
                <span className="text-[10px] text-yann-gold/80 tracking-widest uppercase">Hub de Clarté IA</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              La première plateforme SaaS camerounaise qui transforme le chaos académique et entrepreneurial en clarté royale. IA ancrée, 0% hallucination.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 rounded bg-white/5 hover:bg-yann-gold hover:text-yann-dark flex items-center justify-center transition-colors cursor-pointer text-gray-400">
                  <span className="font-bold text-xs">FB</span>
               </div>
               <div className="w-8 h-8 rounded bg-white/5 hover:bg-yann-gold hover:text-yann-dark flex items-center justify-center transition-colors cursor-pointer text-gray-400">
                  <span className="font-bold text-xs">LN</span>
               </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 border-l-2 border-yann-gold pl-3">Navigation</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/students" className="hover:text-yann-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-yann-gold rounded-full"></span> Espace Étudiants</Link></li>
              <li><Link to="/business" className="hover:text-yann-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-yann-gold rounded-full"></span> Services PME</Link></li>
              <li><Link to="/brain" className="hover:text-yann-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-yann-gold rounded-full"></span> Cerveau Numérique</Link></li>
              <li><Link to="/studio" className="hover:text-yann-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-yann-gold rounded-full"></span> Studio Graphique</Link></li>
              <li><Link to="/faq" className="hover:text-yann-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-yann-gold rounded-full"></span> FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 border-l-2 border-yann-gold pl-3">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-yann-gold mt-1 shrink-0" />
                <span>Douala, Ndogpassi 2<br/>Carrefour saint-nicholas</span>
              </li>
              <li className="flex items-center gap-3">
                <Smartphone size={16} className="text-yann-gold shrink-0" />
                <span>+237 676 04 29 96</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-yann-gold shrink-0" />
                <span>myannluther@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-white font-bold mb-6 border-l-2 border-yann-gold pl-3">Paiement Sécurisé</h3>
            <p className="text-xs text-gray-500 mb-4">Transactions cryptées et validées par les opérateurs locaux.</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 hover:border-yellow-400/50 transition-colors group cursor-default">
                <div className="w-10 h-10 rounded bg-[#FFCC00] flex items-center justify-center text-black font-extrabold text-xs shadow-lg shadow-yellow-500/20">MTN</div>
                <div>
                    <div className="text-sm text-gray-200 font-medium">Mobile Money</div>
                    <div className="text-[10px] text-gray-500 group-hover:text-yellow-400 transition-colors">*126#</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 hover:border-orange-500/50 transition-colors group cursor-default">
                <div className="w-10 h-10 rounded bg-[#FF7900] flex items-center justify-center text-white font-extrabold text-xs shadow-lg shadow-orange-500/20">OM</div>
                <div>
                    <div className="text-sm text-gray-200 font-medium">Orange Money</div>
                    <div className="text-[10px] text-gray-500 group-hover:text-orange-400 transition-colors">#150#</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Yann's Note. Tous droits réservés. | <Link to="/privacy" className="hover:text-yann-gold cursor-pointer">Confidentialité</Link> | <span className="hover:text-yann-gold cursor-pointer">CGU</span></p>
          <p className="flex items-center gap-2 mt-4 md:mt-0 opacity-70">
            <Smartphone size={14} />
            Optimisé pour Mobile & Zéro Data
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;