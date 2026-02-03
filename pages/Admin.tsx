import React, { useState, useEffect } from 'react';
import { Upload, FileAudio, FileVideo, FileText, Image as ImageIcon, Trash2, LogOut, CheckCircle, X, Activity, Database, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Modal from '../components/Modal';
import FileUploader from '../components/FileUploader';
import { ContentCategory, ContentItem } from '../types';
import { db } from '../services/databaseService';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ContentCategory>(ContentCategory.AUDIO);
  const navigate = useNavigate();
  
  // State pour les données
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Upload State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [newItemMetadata, setNewItemMetadata] = useState({
    title: '',
    description: '',
    category: ContentCategory.AUDIO,
    isZeroData: true
  });
  const [isUploading, setIsUploading] = useState(false);

  // Delete Confirmation State
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Initialisation et Chargement des données via SQL Service
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        // Appel simulé SQL
        const data = await db.sql.getAllContent();
        setContentList(data);
        // Log de connexion via NoSQL
        db.nosql.insertLog('ADMIN_ACCESS_DASHBOARD', { user: 'admin' });
      } catch (e) {
        console.error("Erreur DB:", e);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    db.nosql.insertLog('ADMIN_LOGOUT');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const requestDelete = (id: string) => {
    setItemToDelete(id);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    // Suppression SQL
    await db.sql.deleteContent(itemToDelete);
    // Log NoSQL
    db.nosql.insertLog('DELETE_CONTENT', { contentId: itemToDelete });
    
    // Mise à jour locale de l'UI
    setContentList(prev => prev.filter(item => item.id !== itemToDelete));
    
    // Close modal
    setItemToDelete(null);
  };

  const handlePublish = async () => {
    if (uploadFiles.length === 0 || !newItemMetadata.title) {
      alert("Veuillez ajouter un fichier et un titre.");
      return;
    }

    setIsUploading(true);

    try {
        // Simulation traitement fichiers...
        await new Promise(r => setTimeout(r, 1000));

        const newItems: ContentItem[] = [];

        for (let index = 0; index < uploadFiles.length; index++) {
            const newItem: ContentItem = {
                id: Date.now().toString() + index,
                title: newItemMetadata.title + (uploadFiles.length > 1 ? ` (${index + 1})` : ''),
                description: newItemMetadata.description || "Contenu ajouté par l'admin",
                category: newItemMetadata.category,
                url: '#',
                isZeroData: newItemMetadata.isZeroData,
                date: new Date().toISOString().split('T')[0]
            };
            
            // Insertion SQL
            await db.sql.insertContent(newItem);
            newItems.push(newItem);
        }

        // Log NoSQL global pour l'opération
        db.nosql.insertLog('UPLOAD_BATCH', { 
            count: uploadFiles.length, 
            category: newItemMetadata.category 
        });

        setContentList(prev => [...newItems, ...prev]);
        
        // Reset
        setIsUploadModalOpen(false);
        setUploadFiles([]);
        setNewItemMetadata({
            title: '',
            description: '',
            category: ContentCategory.AUDIO,
            isZeroData: true
        });

    } catch (error) {
        console.error("Upload failed", error);
    } finally {
        setIsUploading(false);
    }
  };

  const icons = {
    [ContentCategory.AUDIO]: <FileAudio className="text-yann-gold" />,
    [ContentCategory.VIDEO]: <FileVideo className="text-yann-gold" />,
    [ContentCategory.SLIDE]: <FileText className="text-yann-gold" />,
    [ContentCategory.INFOGRAPHIC]: <ImageIcon className="text-yann-gold" />
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* --- Lion de la Clarté Background Animation --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10"
            animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
                opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
        >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-yann-gold fill-none stroke-[0.5]">
                <path d="M100,20 L130,50 L160,40 L170,80 L150,110 L160,150 L100,180 L40,150 L50,110 L30,80 L40,40 L70,50 Z" />
                <path d="M70,50 L100,80 L130,50" />
                <path d="M40,150 L100,120 L160,150" />
                <path d="M100,80 L100,120" />
                <path d="M50,110 L100,120 L150,110" />
                <circle cx="100" cy="100" r="90" className="stroke-yann-gold/30" strokeDasharray="5,5" />
                <circle cx="100" cy="100" r="70" className="stroke-yann-gold/20" />
            </svg>
        </motion.div>
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute bg-yann-gold rounded-full"
                style={{
                    width: Math.random() * 4 + 2 + 'px',
                    height: Math.random() * 4 + 2 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%'
                }}
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2
                }}
            />
        ))}
      </div>

      <div className="relative z-10 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header with Lion Logo */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <img src="/logo.png" alt="Admin Logo" className="w-14 h-14 rounded-full object-cover shadow-lg shadow-yann-gold/20 border-2 border-yann-gold bg-black" />
            <div>
              <h1 className="text-2xl font-bold text-white">Console Admin</h1>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                 <span className="flex items-center gap-1 text-green-400"><Database size={10}/> SQL: Connecté</span>
                 <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                 <span className="flex items-center gap-1 text-blue-400"><Activity size={10}/> NoSQL: Actif</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="secondary" onClick={handleLogout} className="!px-4">
               <LogOut size={18} className="mr-2" /> Déconnexion
             </Button>
             <Button onClick={() => setIsUploadModalOpen(true)}>
              <Upload size={18} className="mr-2" />
              Nouveau Fichier
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            {Object.values(ContentCategory).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors backdrop-blur-sm ${activeTab === cat ? 'bg-yann-gold text-yann-dark font-medium shadow-md' : 'text-gray-400 hover:bg-white/5 bg-black/20'}`}
              >
                {icons[cat]}
                <span>{cat.charAt(0) + cat.slice(1).toLowerCase()}s</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden min-h-[400px] shadow-2xl">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                <h2 className="text-xl font-semibold text-white">Fichiers récents</h2>
                <div className="flex items-center gap-3">
                    {isLoadingData && <span className="text-yann-gold text-xs animate-pulse">Syncing DB...</span>}
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Total: {contentList.length}</span>
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {isLoadingData ? (
                    <div className="p-20 flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yann-gold"></div>
                    </div>
                ) : contentList.filter(item => activeTab === item.category).length === 0 ? (
                   <div className="p-12 text-center flex flex-col items-center text-gray-500">
                     <div className="mb-4 opacity-50 text-4xl grayscale">
                       {icons[activeTab]}
                     </div>
                     <p>Aucun fichier dans cette catégorie pour le moment.</p>
                     <Button variant="ghost" size="sm" className="mt-4" onClick={() => setIsUploadModalOpen(true)}>
                       Ajouter du contenu
                     </Button>
                   </div>
                ) : (
                  contentList.filter(item => activeTab === item.category).map((item) => (
                    <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-white/5 transition-colors gap-4 animate-in fade-in">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#001529] rounded-lg border border-white/5 shadow-inner">
                          {icons[item.category]}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-400 line-clamp-1">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 self-end sm:self-auto">
                        {item.isZeroData && (
                          <span className="px-2 py-1 rounded-full bg-green-900/30 text-green-400 text-xs font-medium border border-green-500/20 whitespace-nowrap">
                            Zéro Data
                          </span>
                        )}
                        <span className="text-sm text-gray-500 font-mono">{item.date}</span>
                        <button 
                          onClick={() => requestDelete(item.id)}
                          className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        <Modal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          title="Ajouter du nouveau contenu (SQL Insert)"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Titre du fichier</label>
                <input 
                  type="text" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-yann-gold outline-none placeholder-gray-600"
                  placeholder="Ex: Cours Droit Civil - Chap 1"
                  value={newItemMetadata.title}
                  onChange={(e) => setNewItemMetadata({...newItemMetadata, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Catégorie</label>
                <select 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-yann-gold outline-none"
                  value={newItemMetadata.category}
                  onChange={(e) => setNewItemMetadata({...newItemMetadata, category: e.target.value as ContentCategory})}
                >
                  {Object.values(ContentCategory).map(cat => (
                    <option key={cat} value={cat} className="bg-yann-dark">{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-400 mb-1">Description courte</label>
               <input 
                  type="text" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-yann-gold outline-none placeholder-gray-600"
                  placeholder="Description pour les étudiants..."
                  value={newItemMetadata.description}
                  onChange={(e) => setNewItemMetadata({...newItemMetadata, description: e.target.value})}
                />
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="zeroData"
                checked={newItemMetadata.isZeroData}
                onChange={(e) => setNewItemMetadata({...newItemMetadata, isZeroData: e.target.checked})}
                className="w-4 h-4 rounded border-gray-600 text-yann-gold focus:ring-yann-gold bg-gray-700"
              />
              <label htmlFor="zeroData" className="text-sm text-gray-300">Marquer comme contenu "Zéro Data" (Optimisé)</label>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h4 className="text-sm font-medium text-white mb-2">Fichiers à uploader</h4>
              <FileUploader 
                onFilesSelected={(files) => setUploadFiles(files)}
                maxSizeInMB={100}
              />
            </div>

            <div className="flex justify-end pt-2">
               <Button onClick={handlePublish} disabled={isUploading || !newItemMetadata.title || uploadFiles.length === 0} className={isUploading ? 'animate-pulse' : ''}>
                 {isUploading ? (
                   <>Envoi en cours...</>
                 ) : (
                   <>
                     <CheckCircle className="mr-2" size={18} />
                     Commit Transaction
                   </>
                 )}
               </Button>
            </div>
          </div>
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          isOpen={!!itemToDelete}
          onClose={() => setItemToDelete(null)}
          title="Confirmation requise"
        >
           <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-500 border-2 border-red-900/50">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Supprimer ce fichier ?</h3>
              <p className="text-gray-400 mb-8 max-w-sm">
                Cette action est irréversible. Le fichier sera définitivement retiré de la base de données SQL et des logs seront créés.
              </p>
              
              <div className="flex gap-4 w-full">
                <Button variant="secondary" fullWidth onClick={() => setItemToDelete(null)}>
                  Annuler
                </Button>
                <Button 
                  fullWidth 
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white border-none"
                >
                  Confirmer la suppression
                </Button>
              </div>
           </div>
        </Modal>
      </div>
    </div>
  );
};

export default Admin;