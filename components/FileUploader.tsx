import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import Button from './Button';

interface FileUploaderProps {
  onFilesSelected?: (files: File[]) => void;
  maxSizeInMB?: number;
  acceptedTypes?: string[];
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFilesSelected, 
  maxSizeInMB = 10,
  acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png']
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    // Basic validation could be added here
    setFiles(prev => [...prev, ...newFiles]);
    if (onFilesSelected) {
      onFilesSelected(newFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full animate-in fade-in zoom-in duration-300">
      <div 
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ease-in-out cursor-pointer group
          ${isDragging 
            ? 'border-yann-gold bg-yann-gold/10 scale-[1.02]' 
            : 'border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 hover:border-yann-gold/50 hover:bg-gray-100 dark:hover:bg-white/10'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
        />
        
        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 
          ${isDragging ? 'bg-yann-gold text-yann-dark' : 'bg-gray-200 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:text-yann-gold group-hover:bg-yann-gold/20'}`}>
          <Upload size={32} className={isDragging ? 'animate-bounce' : ''} />
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 group-hover:text-yann-gold transition-colors">
          Glissez vos fichiers ici
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          ou cliquez n'importe où pour parcourir
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-6">
           {acceptedTypes.map(type => (
             <span key={type} className="px-2 py-1 rounded-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-500 uppercase font-mono">
               {type.replace('.', '')}
             </span>
           ))}
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          Taille maximale : {maxSizeInMB} MB par fichier
        </p>

        <div className="mt-6 pointer-events-none">
             <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
                Parcourir les fichiers
             </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Fichiers ({files.length})</span>
            <button onClick={() => setFiles([])} className="text-xs hover:text-red-500 dark:hover:text-red-400 transition-colors">Tout effacer</button>
          </div>
          
          <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-2 pr-1">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-colors animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-[#002b55] flex items-center justify-center shrink-0">
                    {file.type.includes('image') ? <ImageIcon size={20} className="text-blue-500 dark:text-blue-400"/> : <FileText size={20} className="text-orange-500 dark:text-orange-400"/>}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
             <Button fullWidth>
                <CheckCircle2 className="mr-2" size={18} />
                Lancer l'analyse ({files.length})
             </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;