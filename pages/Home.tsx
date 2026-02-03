import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Database, BrainCircuit, FileText, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Tooltip from '../components/Tooltip';
import { WHATSAPP_LINK } from '../constants';

const Home: React.FC = () => {
  const testimonials = [
    {
      text: "J'ai validé mon Droit Administratif grâce aux résumés audio. Ça ne consomme rien et je peux réviser dans le taxi !",
      author: "Sarah",
      role: "Étudiante, U. Yaoundé II"
    },
    {
      text: "Le décodeur DAO m'a sauvé d'un piège dans un marché public à Douala. Indispensable pour toute PME sérieuse.",
      author: "Alain",
      role: "CEO, BTP Construction"
    },
    {
      text: "Enfin une IA qui ne raconte pas n'importe quoi sur le contexte camerounais. Les références juridiques sont précises.",
      author: "Dr. Talla",
      role: "Enseignant-Chercheur"
    }
  ];

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
                <Button pulsing className="w-full sm:w-auto text-lg px-8">
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
              <Tooltip text="Une technologie IA qui ne s'appuie que sur vos propres sources pour garantir la vérité.">
                <div className="w-12 h-12 bg-yann-gold/20 rounded-lg flex items-center justify-center mb-6 cursor-help">
                  <BrainCircuit className="text-yann-gold" size={28} />
                </div>
              </Tooltip>
              <h3 className="text-xl font-bold text-white mb-3">Intelligence Ancrée</h3>
              <p className="text-gray-400">
                Contrairement aux autres IA, Yann's Note se base uniquement sur vos documents et le contexte camerounais. Aucune invention, juste des faits.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-yann-gold/50 transition-colors">
              <Tooltip text="Formats optimisés (texte/audio) pour consommer le moins de Mo possible.">
                <div className="w-12 h-12 bg-yann-gold/20 rounded-lg flex items-center justify-center mb-6 cursor-help">
                  <Database className="text-yann-gold" size={28} />
                </div>
              </Tooltip>
              <h3 className="text-xl font-bold text-white mb-3">Économie Zéro Data</h3>
              <p className="text-gray-400">
                Nos fiches audio et synthèses sont optimisées pour consommer un minimum de données mobiles. Idéal pour le Cameroun.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-yann-gold/50 transition-colors">
              <Tooltip text="Des templates validés par des experts pour un usage immédiat.">
                <div className="w-12 h-12 bg-yann-gold/20 rounded-lg flex items-center justify-center mb-6 cursor-help">
                  <FileText className="text-yann-gold" size={28} />
                </div>
              </Tooltip>
              <h3 className="text-xl font-bold text-white mb-3">Documents Prêts</h3>
              <p className="text-gray-400">
                DAO, Pitch Decks, Guides d'étude... Générez des documents professionnels formatés et prêts à l'emploi en quelques clics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#001529] relative overflow-hidden">
         {/* Decorative elements */}
         <div className="absolute top-0 right-0 p-12 opacity-5">
            <Quote size={200} className="text-yann-gold" />
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-white">Ils ont choisi la <span className="text-yann-gold">Clarté</span></h2>
               <p className="text-gray-400 mt-2">Ce que nos utilisateurs disent de Yann's Note</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {testimonials.map((t, i) => (
                  <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/5 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300">
                     <Quote className="text-yann-gold mb-4 opacity-50" size={32} />
                     <p className="text-gray-300 italic mb-6 text-lg">"{t.text}"</p>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yann-gold to-yellow-700 flex items-center justify-center font-bold text-yann-dark">
                           {t.author.charAt(0)}
                        </div>
                        <div>
                           <p className="text-white font-bold">{t.author}</p>
                           <p className="text-yann-gold text-sm">{t.role}</p>
                        </div>
                     </div>
                  </div>
               ))}
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