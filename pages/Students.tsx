import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, BookOpen, Headphones, MessageCircle, CheckCircle, Info, GraduationCap, Loader2, Sparkles, FileText, Wifi } from 'lucide-react';
import Button from '../components/Button';
import ZeroDataBadge from '../components/ZeroDataBadge';
import FileUploader from '../components/FileUploader';
import Modal from '../components/Modal';
import { WHATSAPP_LINK } from '../constants';
import { generateThinkingResponse } from '../services/geminiService';

const Students: React.FC = () => {
  const [option, setOption] = useState<'upload' | 'custom' | null>(null);
  const [downloads, setDownloads] = useState<{ [key: number]: number | 'completed' }>({});
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  // Guide Generator State
  const [courseTopic, setCourseTopic] = useState('');
  const [isGeneratingGuide, setIsGeneratingGuide] = useState(false);
  const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);
  const [showGuideModal, setShowGuideModal] = useState(false);

  const handleCustomNeed = () => {
    const message = encodeURIComponent("Bonjour Yann, je suis étudiant et j'ai un besoin spécifique pour mes révisions...");
    window.open(`${WHATSAPP_LINK}?text=${message}`, '_blank');
  };

  const startDownload = (id: number) => {
    if (downloads[id]) return;

    setDownloads(prev => ({ ...prev, [id]: 0 }));

    const interval = setInterval(() => {
      setDownloads(prev => {
        const current = prev[id];
        if (current === 'completed') {
          clearInterval(interval);
          return prev;
        }
        const progress = current as number;
        if (progress >= 100) {
          clearInterval(interval);
          return { ...prev, [id]: 'completed' };
        }
        return { ...prev, [id]: progress + 10 };
      });
    }, 200);
  };

  const handleGenerateGuide = async () => {
    if (!courseTopic) return;
    setIsGeneratingGuide(true);
    setShowGuideModal(true);
    setGeneratedGuide(null);

    const prompt = `Agis comme un tuteur universitaire expert pour un étudiant camerounais.
    Sujet du cours : "${courseTopic}".
    Génère un Guide d'Étude Structuré contenant :
    1. Les 3 concepts clés à maîtriser.
    2. Un résumé clair (méthode Feynman).
    3. Les pièges fréquents aux examens.
    4. Un mini-quiz de 3 questions.`;

    const response = await generateThinkingResponse(prompt);
    setGeneratedGuide(response);
    setIsGeneratingGuide(false);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-yann-dark to-black min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yann-gold/10 rounded-full blur-[80px] pointer-events-none"></div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 relative z-10">
          Espace <span className="text-transparent bg-clip-text bg-gradient-to-r from-yann-gold to-yellow-200">Étudiants</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg relative z-10">
          Validez vos matières sans vider votre forfait internet. L'excellence académique à portée de main.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Card 1: Guide Generator */}
        <div className="bg-[#001F3F]/50 backdrop-blur-md rounded-2xl border border-yann-gold/20 p-1 group hover:border-yann-gold/50 transition-all duration-300">
          <div className="bg-[#001529] rounded-xl p-8 h-full flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <BookOpen size={100} className="text-yann-gold" />
            </div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-yann-gold to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-yann-gold/20">
                <Sparkles className="text-yann-dark" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">IA Tutorat Flash</h2>
            </div>

            <p className="text-gray-400 mb-8 flex-grow">
              Transformez vos notes brutes ou un titre de chapitre en une fiche de révision structurée. L'IA identifie les concepts clés pour vous.
            </p>

            <div className="bg-black/20 rounded-xl p-2 mb-6 border border-white/5">
                <div className="grid grid-cols-2 gap-2">
                    <button 
                        onClick={() => setOption('upload')}
                        className={`py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${option === 'upload' ? 'bg-yann-gold text-yann-dark shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Upload size={16} /> Upload Notes
                    </button>
                    <button 
                        onClick={() => { setOption('custom'); handleCustomNeed(); }}
                        className={`py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${option === 'custom' ? 'bg-yann-gold text-yann-dark shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <MessageCircle size={16} /> Sur Mesure
                    </button>
                </div>
            </div>

            {option === 'upload' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                 <input 
                    type="text" 
                    placeholder="Sujet du cours (ex: Droit Administratif)"
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-yann-gold outline-none"
                    value={courseTopic}
                    onChange={(e) => setCourseTopic(e.target.value)}
                 />
                 <FileUploader onFilesSelected={(f) => f.length > 0 && setCourseTopic(`Fichier: ${f[0].name}`)} />
                 <Button fullWidth pulsing onClick={handleGenerateGuide} disabled={isGeneratingGuide || !courseTopic}>
                    {isGeneratingGuide ? "Génération..." : "Créer le Guide"}
                 </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Card 2: Zero Data Audio */}
        <div className="bg-[#001F3F]/50 backdrop-blur-md rounded-2xl border border-yann-gold/20 p-1 group hover:border-yann-gold/50 transition-all duration-300">
           <div className="bg-[#001529] rounded-xl p-8 h-full flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Headphones size={100} className="text-yann-gold" />
            </div>

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-yann-gold to-yellow-600 rounded-lg flex items-center justify-center shadow-lg shadow-yann-gold/20">
                <Wifi className="text-yann-dark" size={24} />
              </div>
              <div>
                  <h2 className="text-2xl font-bold text-white leading-none">Audio Zéro Data</h2>
                  <span className="text-xs text-green-400 font-mono mt-1 block">Optimisé: 5Mo / Heure</span>
              </div>
            </div>

            <div className="space-y-4 flex-grow">
               {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/5 hover:border-yann-gold/30 transition-all">
                     <div className="flex items-center gap-4" onClick={() => setSelectedCourse(i)}>
                        <div className="w-10 h-10 rounded-full bg-yann-gold/10 flex items-center justify-center text-yann-gold font-bold">{i}</div>
                        <div>
                           <h4 className="text-white font-bold text-sm">Pack Révision #{i}</h4>
                           <p className="text-xs text-gray-500">Droit Civil • Audio + PDF</p>
                        </div>
                     </div>
                     <div>
                        {downloads[i] === 'completed' ? (
                           <CheckCircle className="text-green-500" size={20} />
                        ) : (
                           <button onClick={() => startDownload(i)} className="text-xs bg-white/5 hover:bg-yann-gold hover:text-yann-dark border border-white/10 px-3 py-1.5 rounded-full transition-colors text-gray-300">
                              Télécharger
                           </button>
                        )}
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/5 text-center">
               <p className="text-xs text-gray-500 italic">"J'ai révisé tout mon semestre dans le taxi grâce aux audios." - Marc, U. Douala</p>
            </div>
           </div>
        </div>

      </div>

      {/* Modal Guide Result */}
      <Modal isOpen={showGuideModal} onClose={() => setShowGuideModal(false)} title="Guide Généré par IA">
          {isGeneratingGuide ? (
              <div className="p-12 text-center">
                  <Loader2 className="animate-spin w-12 h-12 text-yann-gold mx-auto mb-4" />
                  <p className="text-white">Analyse pédagogique en cours...</p>
              </div>
          ) : (
              <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap font-sans text-gray-300">{generatedGuide}</div>
              </div>
          )}
      </Modal>

      {/* Modal Course Details */}
      <Modal isOpen={selectedCourse !== null} onClose={() => setSelectedCourse(null)} title="Détails du Pack">
         <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-yann-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
               <Headphones size={32} className="text-yann-gold" />
            </div>
            <h3 className="text-xl font-bold text-white">Pack Révision Droit #{selectedCourse}</h3>
            <p className="text-gray-400 text-sm">Ce pack contient l'enregistrement audio compressé du cours magistral, nettoyé des bruits de fond, ainsi qu'une fiche synthèse PDF.</p>
            <div className="grid grid-cols-2 gap-4 text-left bg-white/5 p-4 rounded-lg">
               <div className="flex items-center gap-2 text-sm text-gray-300"><FileText size={14} className="text-yann-gold"/> Fiche Synthèse</div>
               <div className="flex items-center gap-2 text-sm text-gray-300"><Wifi size={14} className="text-green-400"/> Audio Compressé</div>
            </div>
            <Button fullWidth onClick={() => { if(selectedCourse) startDownload(selectedCourse); setSelectedCourse(null); }}>
               Lancer le téléchargement (Gratuit)
            </Button>
         </div>
      </Modal>
    </div>
  );
};

export default Students;