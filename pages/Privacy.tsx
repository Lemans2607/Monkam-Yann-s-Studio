import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Wifi, FileCheck, EyeOff } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="w-16 h-16 bg-yann-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yann-gold/20">
            <Shield className="text-yann-gold w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Politique de Confidentialité</h1>
        <p className="text-gray-500 dark:text-gray-400">
            Chez Yann's Note, la clarté commence par la transparence sur vos données.
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Section 1: Introduction */}
        <section className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Lock size={20} className="text-yann-gold" /> Protection des Données
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Nous prenons la confidentialité au sérieux. Toutes les données transmises sur la plateforme (documents, notes, informations personnelles) sont cryptées de bout en bout. Nous respectons les normes de protection des données en vigueur au Cameroun et dans la zone CEMAC.
            </p>
        </section>

        {/* Section 2: Zero Data Aspect */}
        <section className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Wifi size={20} className="text-green-500" /> L'Approche "Zéro Data"
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                    Notre philosophie "Zéro Data" a un double sens :
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>
                        <strong>Économie de bande passante :</strong> Nos algorithmes compressent les flux audio et textuels pour minimiser votre consommation internet (optimisé pour les réseaux 3G/4G instables).
                    </li>
                    <li>
                        <strong>Minimisation de la collecte :</strong> Nous ne collectons que le strict nécessaire. Si vous utilisez nos outils d'IA pour analyser un document, ce document est traité de manière éphémère dans notre "Cerveau Numérique" et n'est pas utilisé pour entraîner des modèles publics sans votre consentement explicite.
                    </li>
                </ul>
            </div>
        </section>

        {/* Section 3: AI & Hallucinations */}
        <section className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileCheck size={20} className="text-blue-400" /> Intégrité des Documents
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Lorsque vous téléversez un fichier (PDF de cours, Appel d'offres), celui-ci reste votre propriété exclusive. L'IA de Yann's Note agit comme un lecteur sécurisé. Nous garantissons que vos documents stratégiques ne fuiteront pas vers d'autres utilisateurs.
            </p>
        </section>

        {/* Section 4: User Rights */}
        <section className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <EyeOff size={20} className="text-red-400" /> Vos Droits
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit ou demander la suppression complète de votre compte :
            </p>
            <div className="bg-gray-100 dark:bg-black/30 p-4 rounded-lg text-sm font-mono text-gray-600 dark:text-gray-400">
                Email : privacy@yannsnote.cm <br/>
                Objet : Droit à l'oubli
            </div>
        </section>
      </div>
    </div>
  );
};

export default Privacy;