import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, BookOpen, Headphones, MessageCircle, CheckCircle, Info, GraduationCap, Loader2, Sparkles } from 'lucide-react';
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
    const message = encodeURIComponent("Bonjour Yann, j'ai un besoin spécifique pour mes révisions...");
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
        
        const increment = Math.floor(Math.random() * 15) + 5;
        const nextProgress = Math.min(progress + increment, 100);
        
        return { ...prev, [id]: nextProgress };
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
    1. Les 3 concepts clés à maîtriser absolument.
    2. Un résumé clair et concis (méthode Feynman).
    3. Les pièges fréquents aux examens sur ce sujet.
    4. Un mini-quiz de 3 questions avec les réponses à la fin.
    
    Ton : Encouragent, précis, académique.`;

    const response = await generateThinkingResponse(prompt, "Tu es un expert pédagogique spécialisé dans l'enseignement supérieur francophone.");
    
    setGeneratedGuide(response);
    setIsGeneratingGuide(false);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Espace <span className="text-yann-gold">Étudiants</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Optimisez vos révisions, économisez votre forfait et validez vos examens avec l'aide de l'IA.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Guide d'Étude Section */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8 h-fit flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-yann-gold" size={28} />
            <h2 className="text-2xl font-bold text-white">Générateur de Guide d'Étude</h2>
          </div>
          
          <div className="space-y-6 flex-grow">
            <p className="text-gray-400 text-sm">
              Transformez vos sujets de cours en une fiche de synthèse claire, structurée et prête à être mémorisée grâce à notre IA "Thinking Mode".
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setOption('upload')}
                className={`p-4 rounded-xl border ${option === 'upload' ? 'border-yann-gold bg-yann-gold/10' : 'border-white/10 bg-white/5'} hover:border-yann-gold/50 transition-all text-left`}
              >
                <Upload className="mb-2 text-yann-gold" />
                <h3 className="text-white font-medium">Générer Fiche</h3>
                <p className="text-xs text-gray-400 mt-1">Via Sujet / Notes</p>
              </button>
              
              <button
                onClick={() => { setOption('custom'); handleCustomNeed(); }}
                className={`p-4 rounded-xl border ${option === 'custom' ? 'border-yann-gold bg-yann-gold/10' : 'border-white/10 bg-white/5'} hover:border-yann-gold/50 transition-all text-left`}
              >
                <MessageCircle className="mb-2 text-yann-gold" />
                <h3 className="text-white font-medium">Besoin spécifique</h3>
                <p className="text-xs text-gray-400 mt-1">Cours en ligne / Recherche</p>
              </button>
            </div>

            {option === 'upload' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-4 border-t border-white/10"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Sujet du cours ou Titre du chapitre</label>
                  <input 
                    type="text" 
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-yann-gold outline-none placeholder-gray-600"
                    placeholder="Ex: Droit des Obligations, Biochimie métabolique..."
                    value={courseTopic}
                    onChange={(e) => setCourseTopic(e.target.value)}
                  />
                </div>
                
                <div className="text-xs text-gray-500 text-center">- OU -</div>

                <FileUploader 
                  onFilesSelected={(files) => {
                    // Simulation: Use filename as context
                    if (files.length > 0) setCourseTopic(`Contenu du fichier: ${files[0].name}`);
                  }}
                />

                <Button 
                    fullWidth 
                    onClick={handleGenerateGuide}
                    disabled={!courseTopic || isGeneratingGuide}
                    className="mt-2"
                >
                    {isGeneratingGuide ? (
                        <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Réflexion en cours...</span>
                    ) : (
                        <span className="flex items-center gap-2"><Sparkles size={18} /> Générer le Guide IA</span>
                    )}
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Services Zéro Data */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <Headphones className="text-yann-gold" size={28} />
            <h2 className="text-2xl font-bold text-white">Services "Zéro Data"</h2>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/5 hover:border-yann-gold/30 transition-colors group relative">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => setSelectedCourse(i)}>
                  <div className="w-10 h-10 bg-yann-gold/20 rounded flex items-center justify-center text-yann-gold font-bold group-hover:bg-yann-gold group-hover:text-yann-dark transition-colors">
                    {i}
                  </div>
                  <div>
                    <h4 className="text-white font-medium flex items-center gap-2">
                      Fiche Révision Audio #{i}
                      <Info size={14} className="text-gray-500 hover:text-yann-gold" />
                    </h4>
                    <p className="text-xs text-gray-400">Droit Civil - Chapitre {i}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 min-w-[140px]">
                  <ZeroDataBadge />
                  
                  {downloads[i] !== undefined ? (
                    <div className="w-full flex flex-col items-end animate-in fade-in duration-300">
                      {downloads[i] === 'completed' ? (
                         <span className="text-green-400 text-sm font-medium flex items-center gap-1.5 py-0.5">
                           <CheckCircle size={14} className="stroke-[3]" />
                           Terminé
                         </span>
                      ) : (
                        <div className="w-full">
                           <div className="flex justify-between items-center text-xs text-yann-gold mb-1.5 font-mono">
                             <span className="opacity-80">Téléchargement...</span>
                             <span className="font-bold">{Math.round(downloads[i] as number)}%</span>
                           </div>
                           <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                             <div 
                               className="h-full bg-yann-gold transition-all duration-200 ease-out shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                               style={{ width: `${downloads[i]}%` }}
                             />
                           </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button 
                      onClick={() => startDownload(i)}
                      className="text-yann-gold text-sm cursor-pointer hover:underline hover:text-yellow-400 transition-colors font-medium focus:outline-none"
                    >
                      Télécharger
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg flex gap-3">
             <div className="text-xl">💡</div>
             <p className="text-sm text-blue-200">
              <strong>Astuce :</strong> Nos fiches audio consomment 95% moins de données qu'une vidéo YouTube. Révisez dans le taxi !
            </p>
          </div>
        </div>
      </div>
      
      {/* Mentorship Section */}
      <div className="mt-16 bg-gradient-to-r from-yann-dark to-[#002b55] rounded-2xl border border-yann-gold/20 p-8 sm:p-12 text-center">
        <GraduationCap className="w-16 h-16 text-yann-gold mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Besoin d'un Coach ?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Rejoignez le programme de mentorat Yann's Note. Des sessions de groupe hebdomadaires pour structurer votre méthode de travail et préparer vos examens avec sérénité.
        </p>
        <Button className="animate-pulse" onClick={() => alert("Votre demande a été enregistrée ! Un mentor vous contactera bientôt.")}>
          Rejoindre la liste d'attente
        </Button>
      </div>

      {/* Course Detail Modal */}
      <Modal
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
        title={`Détails du module : Droit Civil #${selectedCourse}`}
      >
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
             <h4 className="font-bold text-yann-gold mb-2">Contenu du pack :</h4>
             <ul className="list-disc list-inside text-gray-300 space-y-1">
               <li>Audio compressé (MP3) - 5MB</li>
               <li>Fiche récapitulative (PDF) - 200KB</li>
               <li>Quiz d'auto-évaluation</li>
             </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Syllabus :</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ce module couvre les fondamentaux des obligations contractuelles, la responsabilité civile délictuelle et les quasi-contrats. Idéal pour les étudiants de Licence 2.
            </p>
          </div>
          <Button fullWidth onClick={() => {
            if (selectedCourse) startDownload(selectedCourse);
            setSelectedCourse(null);
          }}>
            Lancer le téléchargement gratuit
          </Button>
        </div>
      </Modal>

      {/* AI Guide Result Modal */}
      <Modal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
        title="Guide d'Étude Intelligent"
      >
        <div className="space-y-6">
            {isGeneratingGuide ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="relative w-16 h-16 mb-4">
                         <div className="absolute inset-0 border-4 border-yann-gold/30 rounded-full"></div>
                         <div className="absolute inset-0 border-4 border-t-yann-gold rounded-full animate-spin"></div>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Le Cerveau Numérique réfléchit...</h4>
                    <p className="text-gray-400 text-sm max-w-xs">Analyse du sujet, structuration des concepts clés et génération du quiz.</p>
                </div>
            ) : (
                <>
                    <div className="prose prose-invert prose-sm max-w-none">
                         <div className="whitespace-pre-wrap font-sans text-gray-200 leading-relaxed">
                            {generatedGuide}
                         </div>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-end">
                        <Button onClick={() => setShowGuideModal(false)}>Fermer</Button>
                    </div>
                </>
            )}
        </div>
      </Modal>
    </div>
  );
};

export default Students;