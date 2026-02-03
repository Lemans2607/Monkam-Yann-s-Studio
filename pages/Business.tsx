import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileCheck, Mic, TrendingUp, CheckCircle, ArrowRight, Download, Quote, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import FileUploader from '../components/FileUploader';
import { PRICING_DATA } from '../constants';
import { generateThinkingResponse } from '../services/geminiService';

const Business: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Common AI State
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  // Form State for DAO
  const [daoCriteria, setDaoCriteria] = useState({
    keywords: '',
    budget: '',
    context: '' // Changed deadline to context for better prompt
  });

  // Form State for Pitch
  const [pitchData, setPitchData] = useState({
    projectName: '',
    problem: '',
    solution: ''
  });

  // Form State for Podcast
  const [podcastTopic, setPodcastTopic] = useState('');

  const handleRunDaoAnalysis = async () => {
    setIsAiProcessing(true);
    setAiResult(null);

    const prompt = `Agis comme un expert en marchés publics et appels d'offres (DAO).
    Analyse le contexte suivant :
    Secteur/Mots-clés : ${daoCriteria.keywords}
    Budget : ${daoCriteria.budget}
    Contexte/Extraits du dossier : ${daoCriteria.context || "Non spécifié"}
    
    Tâche :
    1. Identifie 3 pièges potentiels ou risques courants pour ce type de marché.
    2. Liste les documents administratifs éliminatoires probables.
    3. Donne une recommandation stratégique pour gagner ce marché.
    
    Réponds sous forme de checklist d'alerte.`;

    const response = await generateThinkingResponse(prompt, "Tu es un consultant expert en marchés publics.");
    setAiResult(response);
    setIsAiProcessing(false);
  };

  const handleGeneratePitch = async () => {
    setIsAiProcessing(true);
    setAiResult(null);

    const prompt = `Agis comme un investisseur VC de la Silicon Valley qui connaît le contexte africain.
    Génère la structure textuelle d'un Pitch Deck percutant pour le projet : "${pitchData.projectName}".
    Problème identifié : ${pitchData.problem}
    Solution proposée : ${pitchData.solution}
    
    Structure attendue :
    1. Hook (L'accroche en une phrase)
    2. The Problem (Douleur client)
    3. The Solution (Proposition de valeur unique)
    4. Market Opportunity (Pourquoi maintenant ?)
    5. Business Model (Comment on gagne de l'argent)
    
    Ton : Convaincant, concis, orienté business.`;

    const response = await generateThinkingResponse(prompt, "Tu es un expert en levée de fonds et startups.");
    setAiResult(response);
    setIsAiProcessing(false);
  };

  const handleGeneratePodcastScript = async () => {
    setIsAiProcessing(true);
    setAiResult(null);

    const prompt = `Agis comme un scénariste de podcast professionnel.
    Écris le script d'un épisode court (2 minutes) sur le sujet : "${podcastTopic}".
    
    Format :
    - Intro (Musique fade in) : Accroche immédiate.
    - Corps : Développement de l'idée principale avec une analogie forte.
    - Outro : Appel à l'action.
    
    Ton : Dynamique, conversationnel, inspirant.`;

    const response = await generateThinkingResponse(prompt, "Tu es un créateur de contenu audio expert.");
    setAiResult(response);
    setIsAiProcessing(false);
  };

  const resetModal = () => {
      setActiveModal(null);
      setAiResult(null);
      setIsAiProcessing(false);
  };

  const renderAiResult = () => (
      <div className="mt-6 p-4 bg-black/30 rounded-xl border border-yann-gold/30 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-yann-gold font-bold mb-3 flex items-center gap-2">
              <Sparkles size={18} /> Résultat de l'analyse IA
          </h3>
          <div className="whitespace-pre-wrap text-sm text-gray-200 leading-relaxed font-sans max-h-60 overflow-y-auto custom-scrollbar">
              {aiResult}
          </div>
      </div>
  );

  const renderModalContent = () => {
    switch (activeModal) {
      case 'dao':
        return (
          <div className="space-y-6">
            <p className="text-gray-300 text-sm">
              Notre IA analyse vos critères pour extraire les pièges et les critères éliminatoires.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Mots-clés / Secteur</label>
                <input 
                  type="text" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-yann-gold outline-none"
                  placeholder="Ex: BTP, Fournitures de bureau..."
                  value={daoCriteria.keywords}
                  onChange={(e) => setDaoCriteria({...daoCriteria, keywords: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Budget Estimatif</label>
                <input 
                  type="text" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-yann-gold outline-none"
                  placeholder="Ex: 5M - 10M FCFA"
                  value={daoCriteria.budget}
                  onChange={(e) => setDaoCriteria({...daoCriteria, budget: e.target.value})}
                />
              </div>
            </div>

            <div>
                 <label className="block text-sm font-medium text-gray-400 mb-1">Contexte / Extrait du DAO</label>
                 <textarea 
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-yann-gold outline-none h-24 resize-none"
                    placeholder="Collez ici les exigences techniques ou les clauses particulières..."
                    value={daoCriteria.context}
                    onChange={(e) => setDaoCriteria({...daoCriteria, context: e.target.value})}
                 />
            </div>

            <div className="bg-white/5 rounded-xl border border-white/10 p-4">
               <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                 <Download size={18} className="text-yann-gold"/>
                 Pièce jointe (Optionnel)
               </h4>
               <FileUploader 
                 acceptedTypes={['.pdf']} 
                 onFilesSelected={(f) => {
                     if(f.length > 0) setDaoCriteria({...daoCriteria, context: daoCriteria.context + ` [Fichier joint: ${f[0].name}]`})
                 }} 
                 maxSizeInMB={50}
               />
            </div>

            {!aiResult && (
                <Button fullWidth onClick={handleRunDaoAnalysis} disabled={isAiProcessing || !daoCriteria.keywords} className={isAiProcessing ? 'animate-pulse' : ''}>
                {isAiProcessing ? (
                    <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Analyse des risques en cours...</span>
                ) : (
                    "Lancer l'Analyse DAO"
                )}
                </Button>
            )}

            {aiResult && renderAiResult()}
          </div>
        );
      case 'pitch':
        return (
          <div className="space-y-6">
            {!aiResult ? (
                <>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Nom du Projet</label>
                            <input 
                                type="text" 
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-yann-gold outline-none"
                                placeholder="Ex: AgriTech Cameroun"
                                value={pitchData.projectName}
                                onChange={(e) => setPitchData({...pitchData, projectName: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Le Problème (Pain Point)</label>
                            <textarea 
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-yann-gold outline-none h-20 resize-none"
                                placeholder="Quel problème résolvez-vous ?"
                                value={pitchData.problem}
                                onChange={(e) => setPitchData({...pitchData, problem: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Votre Solution</label>
                            <textarea 
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-yann-gold outline-none h-20 resize-none"
                                placeholder="Quelle est votre innovation ?"
                                value={pitchData.solution}
                                onChange={(e) => setPitchData({...pitchData, solution: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-yann-gold/10 rounded-lg border border-yann-gold/20 mt-4">
                        <TrendingUp className="text-yann-gold shrink-0 mt-1" size={24} />
                        <div>
                            <h4 className="text-yann-gold font-bold">Structure YC / Techstars</h4>
                            <p className="text-sm text-gray-300">L'IA va structurer vos idées selon les standards internationaux.</p>
                        </div>
                    </div>

                    <Button fullWidth onClick={handleGeneratePitch} disabled={isAiProcessing || !pitchData.projectName} className={isAiProcessing ? 'animate-pulse' : ''}>
                        {isAiProcessing ? (
                            <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Structuration du Pitch...</span>
                        ) : (
                            "Générer la Structure du Pitch"
                        )}
                    </Button>
                </>
            ) : renderAiResult()}
          </div>
        );
      case 'podcast':
        return (
          <div className="space-y-6">
            <p className="text-gray-300">
              Transformez vos idées en scripts audio prêts à être enregistrés.
            </p>
            
            {!aiResult ? (
                <>
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Sujet du Podcast</label>
                        <input 
                            type="text" 
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-yann-gold outline-none"
                            placeholder="Ex: L'impact de l'IA sur l'agriculture en Afrique"
                            value={podcastTopic}
                            onChange={(e) => setPodcastTopic(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-yann-gold/20 border border-yann-gold rounded-lg text-center cursor-pointer">
                        <div className="text-2xl mb-2">📝</div>
                        <div className="text-sm font-medium text-white">Générateur de Script</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center opacity-50 cursor-not-allowed" title="Bientôt disponible">
                        <div className="text-2xl mb-2">🎙️</div>
                        <div className="text-sm font-medium text-white">Clonage de Voix (Bêta)</div>
                    </div>
                    </div>
                    
                    <Button fullWidth onClick={handleGeneratePodcastScript} disabled={isAiProcessing || !podcastTopic} className={isAiProcessing ? 'animate-pulse' : ''}>
                        {isAiProcessing ? (
                            <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Écriture du script...</span>
                        ) : (
                            "Générer le Script"
                        )}
                    </Button>
                </>
            ) : renderAiResult()}
            
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Espace <span className="text-yann-gold">PME & Leaders</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Formalisation Flash. Gagnez des marchés publics. Impressionnez vos investisseurs.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {/* Service 1 */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group flex flex-col">
          <div className="w-12 h-12 bg-yann-gold rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-yann-gold/20">
            <FileCheck className="text-yann-dark" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Décodeur DAO</h3>
          <p className="text-gray-400 text-sm mb-6 flex-grow">
            Analyse automatique des Dossiers d'Appel d'Offres. Identifiez les pièges et les opportunités en quelques secondes.
          </p>
          <button 
            onClick={() => setActiveModal('dao')}
            className="text-yann-gold text-sm font-medium flex items-center hover:underline mt-auto"
          >
            Configurer l'analyse <ArrowRight size={14} className="ml-1" />
          </button>
        </div>

        {/* Service 2 */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group flex flex-col">
          <div className="w-12 h-12 bg-yann-gold rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-yann-gold/20">
            <TrendingUp className="text-yann-dark" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Pitch Deck 24h</h3>
          <p className="text-gray-400 text-sm mb-6 flex-grow">
            Obtenez une présentation investisseur professionnelle, structurée et designée en moins de 24 heures.
          </p>
          <button 
             onClick={() => setActiveModal('pitch')}
             className="text-yann-gold text-sm font-medium flex items-center hover:underline mt-auto"
          >
            Voir la structure <ArrowRight size={14} className="ml-1" />
          </button>
        </div>

        {/* Service 3 */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group flex flex-col">
          <div className="w-12 h-12 bg-yann-gold rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-yann-gold/20">
            <Mic className="text-yann-dark" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Sermon Podcast Express</h3>
          <p className="text-gray-400 text-sm mb-6 flex-grow">
            Pour les leaders d'opinion : transformez vos écrits ou idées en podcasts engageants pour votre audience.
          </p>
          <button 
             onClick={() => setActiveModal('podcast')}
             className="text-yann-gold text-sm font-medium flex items-center hover:underline mt-auto"
          >
            Écrire un script <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Pricing */}
      <h2 className="text-3xl font-bold text-white text-center mb-10">Nos Tarifs Transparents</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRICING_DATA.map((plan) => (
          <div key={plan.id} className={`relative p-8 rounded-2xl border flex flex-col ${plan.id === 'ENTREPRENEUR' ? 'border-yann-gold bg-white/10 scale-105 z-10' : 'border-white/10 bg-white/5'}`}>
            {plan.id === 'ENTREPRENEUR' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yann-gold text-yann-dark text-xs font-bold px-3 py-1 rounded-full uppercase">
                Populaire
              </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
            <div className="text-3xl font-bold text-yann-gold mb-6">{plan.price}</div>
            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-yann-gold mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button 
              fullWidth 
              variant={plan.id === 'ENTREPRENEUR' ? 'primary' : 'outline'}
              className={plan.id === 'ENTREPRENEUR' ? 'animate-pulse' : ''}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'dao'} 
        onClose={resetModal} 
        title="Décodeur DAO - Analyseur de Risques"
      >
        {renderModalContent()}
      </Modal>
      
      <Modal 
        isOpen={activeModal === 'pitch'} 
        onClose={resetModal} 
        title="Pitch Deck Builder (Structure YC)"
      >
        {renderModalContent()}
      </Modal>

      <Modal 
        isOpen={activeModal === 'podcast'} 
        onClose={resetModal} 
        title="Studio Podcast Express"
      >
        {renderModalContent()}
      </Modal>

    </div>
  );
};

export default Business;