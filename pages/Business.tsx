import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileCheck, Mic, TrendingUp, ArrowRight, Download, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import FileUploader from '../components/FileUploader';
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
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-yann-dark min-h-screen">
       <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-yann-gold font-bold tracking-widest uppercase text-xs mb-2 block">PME & Leaders</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
          Dominez votre <span className="text-yann-gold">Marché</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Des outils d'intelligence économique conçus pour le contexte camerounais. Gagnez du temps, gagnez des marchés.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {services.map((service) => (
          <div key={service.id} className="group relative bg-[#001529] rounded-2xl p-8 border border-white/5 hover:border-yann-gold/50 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yann-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-yann-gold to-yellow-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-yann-gold/10 group-hover:shadow-yann-gold/20 transition-all">
               {service.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 h-20">{service.desc}</p>
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
      <div className="bg-[#001529]/80 backdrop-blur border border-white/10 rounded-3xl p-8 md:p-12">
         <h2 className="text-3xl font-bold text-white text-center mb-12">Investissement Stratégique</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_DATA.map((plan) => (
               <div key={plan.id} className={`relative p-8 rounded-2xl border flex flex-col ${plan.id === 'ENTREPRENEUR' ? 'bg-white/5 border-yann-gold scale-105 shadow-2xl shadow-black' : 'bg-transparent border-white/10'}`}>
                  {plan.id === 'ENTREPRENEUR' && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yann-gold text-yann-dark font-bold text-xs px-3 py-1 rounded-full">RECOMMANDÉ</div>}
                  <h3 className="text-lg font-bold text-white mb-2">{plan.title}</h3>
                  <div className="text-3xl font-bold text-yann-gold mb-6">{plan.price}</div>
                  <ul className="space-y-4 mb-8 flex-grow">
                     {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
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
            <p className="text-sm text-gray-400">Collez les détails de l'appel d'offres pour identifier les pièges.</p>
            <div className="grid grid-cols-2 gap-4">
               <input type="text" placeholder="Secteur" className="bg-black/30 border border-white/10 rounded p-3 text-white w-full" value={daoData.keywords} onChange={e => setDaoData({...daoData, keywords: e.target.value})} />
               <input type="text" placeholder="Budget" className="bg-black/30 border border-white/10 rounded p-3 text-white w-full" value={daoData.budget} onChange={e => setDaoData({...daoData, budget: e.target.value})} />
            </div>
            <textarea placeholder="Contexte..." className="w-full bg-black/30 border border-white/10 rounded p-3 text-white h-24" value={daoData.context} onChange={e => setDaoData({...daoData, context: e.target.value})} />
            <FileUploader acceptedTypes={['.pdf']} onFilesSelected={f => f.length && setDaoData({...daoData, context: daoData.context + ` [Fichier: ${f[0].name}]`})} />
            
            {!aiResult ? (
               <Button fullWidth onClick={handleRunDaoAnalysis} disabled={isAiProcessing}>
                  {isAiProcessing ? <span className="flex gap-2 items-center"><Loader2 className="animate-spin"/> Analyse...</span> : "Analyser"}
               </Button>
            ) : (
               <div className="p-4 bg-black/30 rounded border border-yann-gold/30 text-gray-300 text-sm whitespace-pre-wrap">{aiResult}</div>
            )}
         </div>
      </Modal>

      <Modal isOpen={activeModal === 'pitch'} onClose={resetModal} title="Générateur de Pitch">
          <div className="space-y-4">
              <input type="text" placeholder="Nom du Projet" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" value={pitchData.projectName} onChange={e => setPitchData({...pitchData, projectName: e.target.value})} />
              <textarea placeholder="Problème" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white h-20" value={pitchData.problem} onChange={e => setPitchData({...pitchData, problem: e.target.value})} />
              <textarea placeholder="Solution" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white h-20" value={pitchData.solution} onChange={e => setPitchData({...pitchData, solution: e.target.value})} />
              {!aiResult ? (
                 <Button fullWidth onClick={handleGeneratePitch} disabled={isAiProcessing || !pitchData.projectName}>
                    {isAiProcessing ? <span className="flex gap-2 items-center"><Loader2 className="animate-spin"/> Structuration...</span> : "Générer Structure"}
                 </Button>
              ) : (
                 <div className="p-4 bg-black/30 rounded border border-yann-gold/30 text-gray-300 text-sm whitespace-pre-wrap">{aiResult}</div>
              )}
          </div>
      </Modal>

      <Modal isOpen={activeModal === 'podcast'} onClose={resetModal} title="Scénariste Podcast">
          <div className="space-y-4">
              <input type="text" placeholder="Sujet du Podcast" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" value={podcastTopic} onChange={e => setPodcastTopic(e.target.value)} />
              {!aiResult ? (
                 <Button fullWidth onClick={handleGeneratePodcast} disabled={isAiProcessing || !podcastTopic}>
                    {isAiProcessing ? <span className="flex gap-2 items-center"><Loader2 className="animate-spin"/> Rédaction...</span> : "Écrire le Script"}
                 </Button>
              ) : (
                 <div className="p-4 bg-black/30 rounded border border-yann-gold/30 text-gray-300 text-sm whitespace-pre-wrap">{aiResult}</div>
              )}
          </div>
      </Modal>

    </div>
  );
};

export default Business;