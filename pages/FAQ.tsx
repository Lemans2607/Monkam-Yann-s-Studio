import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
      >
        <span className="font-medium text-gray-900 dark:text-white hover:text-yann-gold transition-colors">{question}</span>
        {isOpen ? <ChevronUp size={18} className="text-yann-gold" /> : <ChevronDown size={18} className="text-gray-500" />}
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Comment fonctionne l'IA 'Zéro Hallucination' ?",
      answer: "Contrairement à ChatGPT standard qui invente des faits, Yann's Note utilise une technologie d'ancrage (RAG). L'IA lit vos documents spécifiques (cours, lois, appels d'offres) et ne formule ses réponses qu'à partir de ces sources vérifiées. Si l'information n'est pas dans le document, elle vous le dira."
    },
    {
      question: "Qu'est-ce que le format 'Zéro Data' ?",
      answer: "C'est un format de compression propriétaire optimisé pour le Cameroun. Une heure de cours audio transformée par Yann's Note pèse environ 5Mo, contre 50-100Mo pour un MP3 standard, vous permettant de réviser sans épuiser votre forfait internet."
    },
    {
      question: "Les paiements via Mobile Money sont-ils sécurisés ?",
      answer: "Absolument. Nous utilisons des agrégateurs de paiement locaux certifiés. Yann's Note ne stocke jamais vos codes PIN ou informations sensibles. La transaction se fait directement entre vous et votre opérateur (MTN/Orange)."
    },
    {
      question: "Puis-je utiliser la plateforme pour des documents confidentiels d'entreprise ?",
      answer: "Oui. Notre module PME est conçu pour la confidentialité. Les Pitch Decks et analyses DAO sont traités dans des conteneurs isolés. Consultez notre politique de confidentialité pour plus de détails."
    },
    {
      question: "Est-ce gratuit pour les étudiants ?",
      answer: "L'accès aux résumés de base est gratuit. Les fonctionnalités avancées comme le 'Tuteur IA Personnalisé' ou le téléchargement illimité des packs 'Zéro Data' sont accessibles via un abonnement modique (2000 FCFA/mois)."
    }
  ];

  return (
    <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 bg-yann-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="text-yann-gold w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Questions Fréquentes</h1>
        <p className="text-gray-500 dark:text-gray-400">
            Tout ce que vous devez savoir sur le Hub de Clarté.
        </p>
      </motion.div>

      <div className="bg-white dark:bg-[#001529] rounded-2xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-xl">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;