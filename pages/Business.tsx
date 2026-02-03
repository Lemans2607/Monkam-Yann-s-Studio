import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileCheck, Mic, TrendingUp, ArrowRight, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import FileUploader from '../components/FileUploader';
import Tooltip from '../components/Tooltip';
import Spinner from '../components/Spinner';
import { PRICING_DATA } from '../constants';
import { generateThinkingResponse } from '../services/geminiService';

const Business: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  // Forms States
  const [daoData, setDaoData] = useState({ keywords: '', budget: '', context: '' });
  const [pitchData, setPitchData] = useState({ projectName: '', problem: '', solution: '' });
  const [podcastTopic, setPodcastTopic] = useState('');

  const handleRunDaoAnalysis = async () => {
    setIsAiProcessing(true);
    const prompt = `Agis comme un expert marchés publics. Analyse: Secteur ${daoData.keywords}, Budget ${daoData.budget}, Contexte ${daoData.context}. Identifie 3 risques et 1 stratégie gagnante.`;
    const response = await generateThinkingResponse(prompt);
    setAiResult(response);
    setIsAiProcessing(false);
  };

  const handleGeneratePitch = async () => {
    setIsAiProcessing(true);
    const prompt = `Structure Pitch Deck YC pour ${pitchData.projectName}. Problème: ${pitchData.problem}. Solution: ${pitchData.solution}. Hook, Problème, Solution, Marché, Business Model.`;
    const response = await generateThinkingResponse(prompt);
    setAiResult(response);
    setIsAiProcessing(false);
  };

  const handleGeneratePodcast = async () => {
    setIsAiProcessing(true);
    const prompt = `Script podcast 2min sur "${podcastTopic}". Intro percutante, Corps avec analogie, Outro Call-to-action.`;
    const response = await generateThinkingResponse(prompt);
    setAiResult(response);
    setIsAiProcessing(false);
  };

  const resetModal = () => { setActiveModal(null); setAiResult(null); setIsAiProcessing(false); };

  const services = [
    {
      id: 'dao',
      icon: <FileCheck className="text-yann-dark w-8 h-8" />,
      title: "Décodeur DAO",
      desc: "Analyse automatique des Dossiers d'Appel d'Offres. Identifiez les critères éliminatoires et les risques cachés en 30 secondes.",
      cta: "Analyser un marché"
    },
    {
      id: 'pitch',
      icon: <TrendingUp className="text-yann-dark w-8 h-8" />,
      title: "Pitch Deck 24h",
      desc: "Structurez votre idée selon les standards internationaux (Y Combinator). Générez le squelette narratif de votre levée de fonds.",
      cta: "Créer mon Pitch"
    },
    {
      id: 'podcast',
      icon: <Mic className="text-yann-dark w-8 h-8" />,
      title: "Sermon Podcast Express",
      desc: "Transformez votre leadership en contenu audio. Générez des scripts de podcasts percutants pour LinkedIn ou WhatsApp.",
      cta: "Écrire un script"
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-yann-dark min-h-screen transition-colors duration-300">
       <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-yann-gold font-bold tracking-widest uppercase text-xs mb-2 block">PME & Leaders</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          Dominez votre <span className="text-yann-gold">Marché</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Des outils d'intelligence économique conçus pour le contexte camerounais. Gagnez du temps, gagnez des marchés.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {services.map((service) => (
          <div key={service.id} className="group relative bg-white dark:bg-[#001529] rounded-2xl p-8 border border-gray-200 dark:border-white/5 hover:border-yann-gold/50 transition-all duration-300 hover:-translate-y-1 shadow-lg dark:shadow-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yann-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Tooltip text="Cliquez pour lancer l'outil">
                <div className="w-16 h-16 bg-gradient-to-br from-yann-gold to-yellow-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-yann-gold/10 group-hover:shadow-yann-gold/20 transition-all cursor-pointer">
                   {service.icon}
                </div>
            </Tooltip>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 h-20">{service.desc}</p>
            <button 
              onClick={() => setActiveModal(service.id)}
              className="flex items-center gap-2 text-yann-gold font-bold text-sm hover:gap-3 transition-all"
            >
              {service.cta} <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Pricing Section */}
      <div className="bg-white/80 dark:bg-[#001529]/80 backdrop-blur border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-xl dark:shadow-none transition-colors">
         <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Investissement Stratégique</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_DATA.map((plan) => (
               <div key={plan.id} className={`relative p-8 rounded-2xl border flex flex-col ${plan.id === 'ENTREPRENEUR' ? 'bg-gray-50 dark:bg-white/5 border-yann-gold scale-105 shadow-2xl dark:shadow-black' : 'bg-transparent border-gray-200 dark:border-white/10'}`}>
                  {plan.id === 'ENTREPRENEUR' && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yann-gold text-yann-dark font-bold text-xs px-3 py-1 rounded-full">RECOMMANDÉ</div>}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{plan.title}</h3>
                  <div className="text-3xl font-bold text-yann-gold mb-6">{plan.price}</div>
                  <ul className="space-y-4 mb-8 flex-grow">
                     {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                           <CheckCircle2 size={16} className="text-yann-gold mt-0.5 shrink-0" />
                           {feat}
                        </li>
                     ))}
                  </ul>
                  <Button 
                    variant={plan.id === 'ENTREPRENEUR' ? 'primary' : 'outline'} 
                    fullWidth
                    pulsing={plan.id === 'ENTREPRENEUR'}
                  >
                    Choisir ce plan
                  </Button>
               </div>
            ))}
         </div>
      </div>

      {/* Modals Logic */}
      <Modal isOpen={activeModal === 'dao'} onClose={resetModal} title="Analyseur DAO">
         <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Collez les détails de l'appel d'offres pour identifier les pièges.</p>
            <div className="grid grid-cols-2 gap-4">
               <input type="text" placeholder="Secteur" className="bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white w-full outline-none focus:border-yann-gold" value={daoData.keywords} onChange={e => setDaoData({...daoData, keywords: e.target.value})} />
               <input type="text" placeholder="Budget" className="bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white w-full outline-none focus:border-yann-gold" value={daoData.budget} onChange={e => setDaoData({...daoData, budget: e.target.value})} />
            </div>
            <textarea placeholder="Contexte..." className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white h-24 outline-none focus:border-yann-gold" value={daoData.context} onChange={e => setDaoData({...daoData, context: e.target.value})} />
            <FileUploader acceptedTypes={['.pdf']} onFilesSelected={f => f.length && setDaoData({...daoData, context: daoData.context + ` [Fichier: ${f[0].name}]`})} />
            
            {!aiResult ? (
               <Button fullWidth onClick={handleRunDaoAnalysis} disabled={isAiProcessing}>
                  {isAiProcessing ? <span className="flex gap-2 items-center"><Spinner size="sm" className="mr-2"/> Analyse...</span> : "Analyser"}
               </Button>
            ) : (
               <div className="p-4 bg-gray-50 dark:bg-black/30 rounded border border-gray-200 dark:border-yann-gold/30 text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">{aiResult}</div>
            )}
         </div>
      </Modal>

      <Modal isOpen={activeModal === 'pitch'} onClose={resetModal} title="Générateur de Pitch">
          <div className="space-y-4">
              <input type="text" placeholder="Nom du Projet" className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white outline-none focus:border-yann-gold" value={pitchData.projectName} onChange={e => setPitchData({...pitchData, projectName: e.target.value})} />
              <textarea placeholder="Problème" className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white h-20 outline-none focus:border-yann-gold" value={pitchData.problem} onChange={e => setPitchData({...pitchData, problem: e.target.value})} />
              <textarea placeholder="Solution" className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white h-20 outline-none focus:border-yann-gold" value={pitchData.solution} onChange={e => setPitchData({...pitchData, solution: e.target.value})} />
              {!aiResult ? (
                 <Button fullWidth onClick={handleGeneratePitch} disabled={isAiProcessing || !pitchData.projectName}>
                    {isAiProcessing ? <span className="flex gap-2 items-center"><Spinner size="sm" className="mr-2"/> Structuration...</span> : "Générer Structure"}
                 </Button>
              ) : (
                 <div className="p-4 bg-gray-50 dark:bg-black/30 rounded border border-gray-200 dark:border-yann-gold/30 text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">{aiResult}</div>
              )}
          </div>
      </Modal>

      <Modal isOpen={activeModal === 'podcast'} onClose={resetModal} title="Scénariste Podcast">
          <div className="space-y-4">
              <input type="text" placeholder="Sujet du Podcast" className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded p-3 text-gray-900 dark:text-white outline-none focus:border-yann-gold" value={podcastTopic} onChange={e => setPodcastTopic(e.target.value)} />
              {!aiResult ? (
                 <Button fullWidth onClick={handleGeneratePodcast} disabled={isAiProcessing || !podcastTopic}>
                    {isAiProcessing ? <span className="flex gap-2 items-center"><Spinner size="sm" className="mr-2"/> Rédaction...</span> : "Écrire le Script"}
                 </Button>
              ) : (
                 <div className="p-4 bg-gray-50 dark:bg-black/30 rounded border border-gray-200 dark:border-yann-gold/30 text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">{aiResult}</div>
              )}
          </div>
      </Modal>

    </div>
  );
};

export default Business;