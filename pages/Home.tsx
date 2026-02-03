import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Database, BrainCircuit, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { WHATSAPP_LINK } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yann-dark to-black opacity-50 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yann-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Transformez le <span className="text-yann-gold">Chaos</span> en <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yann-gold to-yellow-200">Clarté Royale</span>
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              L'IA ancrée sur vos documents. Citations vérifiables. 0% d'hallucination.
              La plateforme ultime pour les étudiants et entrepreneurs camerounais.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/brain">
                <Button className="w-full sm:w-auto text-lg px-8 animate-pulse shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  Accéder au Cerveau Numérique <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/students">
                <Button variant="secondary" className="w-full sm:w-auto text-lg px-8">
                  Espace Étudiants
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-yann-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-yann-gold/50 transition-colors">
              <div className="w-12 h-12 bg-yann-gold/20 rounded-lg flex items-center justify-center mb-6">
                <BrainCircuit className="text-yann-gold" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Intelligence Ancrée</h3>
              <p className="text-gray-400">
                Contrairement aux autres IA, Yann's Note se base uniquement sur vos documents et le contexte camerounais. Aucune invention, juste des faits.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-yann-gold/50 transition-colors">
              <div className="w-12 h-12 bg-yann-gold/20 rounded-lg flex items-center justify-center mb-6">
                <Database className="text-yann-gold" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Économie Zéro Data</h3>
              <p className="text-gray-400">
                Nos fiches audio et synthèses sont optimisées pour consommer un minimum de données mobiles. Idéal pour le Cameroun.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-yann-gold/50 transition-colors">
              <div className="w-12 h-12 bg-yann-gold/20 rounded-lg flex items-center justify-center mb-6">
                <FileText className="text-yann-gold" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Documents Prêts</h3>
              <p className="text-gray-400">
                DAO, Pitch Decks, Guides d'étude... Générez des documents professionnels formatés et prêts à l'emploi en quelques clics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="Contact WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>
    </div>
  );
};

export default Home;