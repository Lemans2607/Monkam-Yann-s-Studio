import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Download, ArrowRight, Wand2, RefreshCw } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import Button from '../components/Button';
import { editImageWithGenAI } from '../services/geminiService';

const ImageStudio: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setGeneratedImage(null); // Reset previous generation
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data:image/xxx;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleGenerate = async () => {
    if (!selectedFile || !prompt) return;

    setIsProcessing(true);
    setGeneratedImage(null);

    try {
      const base64 = await fileToBase64(selectedFile);
      const mimeType = selectedFile.type;
      
      const resultBase64 = await editImageWithGenAI(base64, mimeType, prompt);
      
      if (resultBase64) {
        setGeneratedImage(`data:image/png;base64,${resultBase64}`);
      } else {
        alert("La génération a échoué. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Une erreur est survenue.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yann-gold to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-yann-gold/20">
             <Wand2 className="text-yann-dark w-8 h-8" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Studio <span className="text-yann-gold">Graphique IA</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Transformez vos images par la simple force des mots. Propulsé par Gemini Flash Image.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            Image source
          </h3>
          
          {!previewUrl ? (
            <FileUploader 
              acceptedTypes={['.jpg', '.jpeg', '.png']}
              maxSizeInMB={5}
              onFilesSelected={handleFileSelect}
            />
          ) : (
            <div className="relative group">
              <img 
                src={previewUrl} 
                alt="Original" 
                className="w-full h-64 object-cover rounded-xl border border-white/10"
              />
              <button 
                onClick={() => {
                  setPreviewUrl(null);
                  setSelectedFile(null);
                  setGeneratedImage(null);
                }}
                className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-red-600/80 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          )}

          <div className="space-y-3">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Votre vision
             </h3>
             <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Transforme cette photo en dessin animé, ajoute des lunettes de soleil, rend l'arrière-plan cyber-punk..."
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-yann-gold focus:ring-1 focus:ring-yann-gold outline-none resize-none h-32 transition-all"
             />
          </div>

          <Button 
            fullWidth 
            onClick={handleGenerate}
            disabled={!selectedFile || !prompt || isProcessing}
            className={isProcessing ? "opacity-90 cursor-wait" : ""}
          >
            {isProcessing ? (
               <span className="flex items-center gap-2">
                 <RefreshCw className="animate-spin" /> Magie en cours...
               </span>
            ) : (
               <span className="flex items-center gap-2">
                 <Sparkles /> Générer la transformation
               </span>
            )}
          </Button>
        </div>

        {/* Output Section */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 sm:p-8 min-h-[500px] flex flex-col">
           <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
              <span className="bg-yann-gold text-yann-dark w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Résultat
           </h3>

           <div className="flex-grow flex items-center justify-center bg-black/20 rounded-xl border border-white/5 relative overflow-hidden group">
              {generatedImage ? (
                 <>
                   <img 
                     src={generatedImage} 
                     alt="Generated Result" 
                     className="w-full h-full object-contain max-h-[500px] animate-in fade-in duration-700"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                      <a href={generatedImage} download="yanns-note-creation.png">
                        <Button variant="primary">
                           <Download className="mr-2" size={18} /> Télécharger
                        </Button>
                      </a>
                   </div>
                 </>
              ) : (
                 <div className="text-center p-8">
                    {isProcessing ? (
                        <div className="space-y-4">
                            <div className="w-16 h-16 border-4 border-yann-gold/30 border-t-yann-gold rounded-full animate-spin mx-auto"></div>
                            <p className="text-yann-gold font-medium animate-pulse">L'IA redessine votre image...</p>
                        </div>
                    ) : (
                        <div className="space-y-2 text-gray-500">
                            <ImageIcon className="w-16 h-16 mx-auto opacity-30" />
                            <p>Le résultat apparaîtra ici</p>
                        </div>
                    )}
                 </div>
              )}
           </div>
           
           {generatedImage && (
             <div className="mt-6 p-4 bg-green-900/10 border border-green-500/20 rounded-lg flex items-start gap-3">
                <Sparkles className="text-green-400 mt-1 shrink-0" size={18} />
                <div>
                  <p className="text-green-400 font-medium text-sm">Création terminée !</p>
                  <p className="text-gray-400 text-xs mt-1">Généré par Gemini 2.5 Flash Image. Vous pouvez télécharger l'image ou modifier votre prompt pour essayer un autre style.</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ImageStudio;