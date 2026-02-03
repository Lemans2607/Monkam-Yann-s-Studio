import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileAudio, FileVideo, FileText, Image as ImageIcon, Trash2, LogOut, CheckCircle, Database, LayoutDashboard, Wifi, Activity, Search, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Modal from '../components/Modal';
import FileUploader from '../components/FileUploader';
import { ContentCategory, ContentItem } from '../types';
import { db } from '../services/databaseService';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ContentCategory>(ContentCategory.AUDIO);
  const navigate = useNavigate();
  
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [newItemMetadata, setNewItemMetadata] = useState({
    title: '',
    description: '',
    category: ContentCategory.AUDIO,
    isZeroData: true
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const data = await db.sql.getAllContent();
        setContentList(data);
        db.nosql.insertLog('ADMIN_ACCESS', { user: 'admin' });
      } catch (e) {
        console.error("DB Error", e);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément définitivement ?")) {
      await db.sql.deleteContent(id);
      setContentList(prev => prev.filter(item => item.id !== id));
      db.nosql.insertLog('DELETE', { id });
    }
  };

  const handlePublish = async () => {
    if (!uploadFiles.length || !newItemMetadata.title) return;
    setIsUploading(true);
    
    // Simulation upload
    await new Promise(r => setTimeout(r, 800));
    
    const newItems: ContentItem[] = [];
    for (let i = 0; i < uploadFiles.length; i++) {
        const item: ContentItem = {
            id: Date.now().toString() + i,
            title: newItemMetadata.title + (uploadFiles.length > 1 ? ` (${i+1})` : ''),
            description: newItemMetadata.description,
            category: newItemMetadata.category,
            url: '#',
            isZeroData: newItemMetadata.isZeroData,
            date: new Date().toISOString().split('T')[0]
        };
        await db.sql.insertContent(item);
        newItems.push(item);
    }
    
    setContentList(prev => [...newItems, ...prev]);
    setIsUploading(false);
    setIsUploadModalOpen(false);
    setUploadFiles([]);
    setNewItemMetadata({ title: '', description: '', category: ContentCategory.AUDIO, isZeroData: true });
  };

  const getIcon = (cat: ContentCategory) => {
    switch(cat) {
        case ContentCategory.AUDIO: return <FileAudio className="text-yann-gold" />;
        case ContentCategory.VIDEO: return <FileVideo className="text-blue-400" />;
        case ContentCategory.SLIDE: return <FileText className="text-orange-400" />;
        case ContentCategory.INFOGRAPHIC: return <ImageIcon className="text-purple-400" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#001220] text-gray-100 font-sans overflow-hidden">
      
      {/* --- Background Abstract Animation (Lion Constellation) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-yann-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Top Header */}
        <header className="bg-[#001529]/80 backdrop-blur-md border-b border-yann-gold/10 px-6 py-4 flex justify-between items-center shadow-lg">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yann-gold to-yellow-700 rounded-lg flex items-center justify-center shadow-lg shadow-yann-gold/20">
                 <LayoutDashboard className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-wide leading-tight">CONSOLE <span className="text-yann-gold">ADMIN</span></h1>
                <p className="text-[10px] text-gray-400 tracking-widest uppercase">Hub de Clarté v1.0</p>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              {/* Status Indicators */}
              <div className="hidden md:flex items-center gap-4 bg-black/20 px-4 py-2 rounded-full border border-white/5">
                 <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-gray-300 font-mono">SQL: Online</span>
                 </div>
                 <div className="w-px h-3 bg-white/10"></div>
                 <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-xs text-gray-300 font-mono">NoSQL: Active</span>
                 </div>
              </div>

              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-400 hover:text-red-400 hover:bg-red-900/20 border border-transparent hover:border-red-500/30">
                  <LogOut size={16} className="mr-2" /> <span className="hidden sm:inline">Déconnexion</span>
              </Button>
           </div>
        </header>

        {/* Main Content Area (Grid Layout) */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full max-w-7xl mx-auto flex flex-col lg:flex-row">
            
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 p-6 lg:border-r border-white/5 flex flex-col gap-2 bg-[#001220]/50 lg:bg-transparent overflow-x-auto lg:overflow-visible flex-shrink-0">
               <div className="mb-4 px-2">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Médiathèque</h3>
               </div>
               {Object.values(ContentCategory).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 border ${
                      activeTab === cat 
                        ? 'bg-gradient-to-r from-yann-gold/20 to-transparent border-yann-gold/50 text-yann-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {getIcon(cat)}
                    <span>{cat}</span>
                    {contentList.filter(i => i.category === cat).length > 0 && (
                       <span className="ml-auto text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-gray-300">
                         {contentList.filter(i => i.category === cat).length}
                       </span>
                    )}
                  </button>
               ))}
               
               <div className="mt-8 px-2">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Actions Rapides</h3>
                  <Button onClick={() => setIsUploadModalOpen(true)} fullWidth className="bg-yann-gold hover:bg-yellow-500 text-yann-dark border-none shadow-lg shadow-yann-gold/10 group">
                    <Upload size={18} className="mr-2 group-hover:-translate-y-1 transition-transform" /> Upload
                  </Button>
               </div>
            </aside>

            {/* Content List Area */}
            <main className="flex-1 p-6 lg:p-8 overflow-y-auto custom-scrollbar">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                     <span className="w-1.5 h-8 bg-yann-gold rounded-full"></span>
                     Gestion: <span className="text-yann-gold">{activeTab}</span>
                  </h2>
                  <div className="relative hidden sm:block">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                     <input 
                        type="text" 
                        placeholder="Rechercher un fichier..." 
                        className="bg-black/20 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:border-yann-gold focus:ring-1 focus:ring-yann-gold outline-none w-64 transition-all"
                     />
                  </div>
               </div>

               {isLoadingData ? (
                  <div className="h-64 flex flex-col items-center justify-center text-yann-gold/50 gap-4">
                     <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
                     <span className="animate-pulse text-sm">Synchronisation avec le Cerveau Central...</span>
                  </div>
               ) : contentList.filter(i => i.category === activeTab).length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-gray-500 gap-4 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                     <Server size={48} className="opacity-20"/>
                     <p>Aucun fichier trouvé dans le secteur {activeTab}.</p>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 gap-4">
                     {contentList.filter(i => i.category === activeTab).map((item) => (
                        <motion.div 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           key={item.id} 
                           className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#001529] border border-white/5 rounded-xl hover:border-yann-gold/30 hover:bg-[#001A33] transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-black/20"
                        >
                           <div className="flex items-center gap-4 w-full sm:w-auto overflow-hidden">
                              <div className="w-12 h-12 rounded-lg bg-black/30 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                 {getIcon(item.category)}
                              </div>
                              <div className="min-w-0">
                                 <h4 className="font-semibold text-gray-200 group-hover:text-yann-gold transition-colors truncate">{item.title}</h4>
                                 <p className="text-xs text-gray-500 truncate max-w-md">{item.description}</p>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                              {item.isZeroData && (
                                 <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wide">
                                    <Wifi size={10} strokeWidth={3} /> Zéro Data
                                 </span>
                              )}
                              <span className="text-xs text-gray-600 font-mono">{item.date}</span>
                              <div className="w-px h-4 bg-white/10 hidden sm:block"></div>
                              <button 
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                                title="Supprimer"
                              >
                                 <Trash2 size={18} />
                              </button>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               )}
            </main>
          </div>
        </div>
      </div>

      {/* Upload Modal (Premium Style) */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload de Contenu Sécurisé">
         <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900/20 to-transparent border-l-4 border-blue-500 p-4 rounded-r-lg flex gap-3 text-sm text-blue-200/80">
               <Database size={20} className="shrink-0 text-blue-400" />
               <p>Les fichiers sont cryptés et stockés sur le serveur sécurisé. Assurez-vous de détenir les droits de propriété intellectuelle.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Catégorie</label>
                   <div className="relative">
                      <select 
                          className="w-full bg-[#001220] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-yann-gold focus:ring-1 focus:ring-yann-gold appearance-none transition-all"
                          value={newItemMetadata.category}
                          onChange={(e) => setNewItemMetadata({...newItemMetadata, category: e.target.value as ContentCategory})}
                      >
                          {Object.values(ContentCategory).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                   </div>
                </div>
                
                <div className="flex items-end">
                   <label className="flex items-center gap-3 cursor-pointer bg-[#001220] border border-white/10 rounded-lg p-3 w-full hover:border-green-500/30 hover:bg-green-900/5 transition-all group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          checked={newItemMetadata.isZeroData}
                          onChange={(e) => setNewItemMetadata({...newItemMetadata, isZeroData: e.target.checked})}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-600 transition-all checked:border-yann-gold checked:bg-yann-gold"
                        />
                        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-yann-dark opacity-0 peer-checked:opacity-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">Tag "Zéro Data"</span>
                         <span className="text-[10px] text-gray-500">Optimisation compression</span>
                      </div>
                   </label>
                </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Méta-données</label>
               <input 
                  type="text" 
                  placeholder="Titre du fichier" 
                  className="w-full bg-[#001220] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-yann-gold focus:ring-1 focus:ring-yann-gold transition-all placeholder-gray-600"
                  value={newItemMetadata.title}
                  onChange={(e) => setNewItemMetadata({...newItemMetadata, title: e.target.value})}
               />
               <textarea 
                  placeholder="Description courte pour les utilisateurs..." 
                  className="w-full bg-[#001220] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-yann-gold focus:ring-1 focus:ring-yann-gold transition-all h-24 resize-none placeholder-gray-600 custom-scrollbar"
                  value={newItemMetadata.description}
                  onChange={(e) => setNewItemMetadata({...newItemMetadata, description: e.target.value})}
               />
            </div>

            <div className="border-t border-white/10 pt-6">
                <FileUploader onFilesSelected={setUploadFiles} />
            </div>

            <div className="pt-2 flex justify-end gap-3">
               <Button variant="ghost" onClick={() => setIsUploadModalOpen(false)}>Annuler</Button>
               <Button onClick={handlePublish} disabled={isUploading || !newItemMetadata.title || !uploadFiles.length} className={isUploading ? "animate-pulse" : "shadow-lg shadow-yann-gold/20"}>
                  {isUploading ? "Traitement..." : <><CheckCircle size={18} className="mr-2"/> Publier sur le Hub</>}
               </Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;