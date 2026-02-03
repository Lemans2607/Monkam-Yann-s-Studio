import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import Spinner from '../components/Spinner';

const DigitalBrain: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Bonjour ! Je suis le Cerveau Numérique de Yann's Note. Je suis connecté à vos documents et au web pour vous donner des réponses précises et vérifiables. Comment puis-je vous aider aujourd'hui ?",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Call Gemini Service
    const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    
    const responseText = await generateChatResponse(input, history);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#001F3F] to-[#001529] border border-yann-gold/30 rounded-xl p-4 mb-6 flex items-start gap-4 shadow-lg shadow-black/40">
        <div className="p-2 bg-yann-gold/10 rounded-lg border border-yann-gold/10">
           <Sparkles className="text-yann-gold shrink-0" size={24} />
        </div>
        <div>
          <h3 className="text-yann-gold font-bold text-lg">Mode Ancrage Activé</h3>
          <p className="text-sm text-gray-300">0% Hallucination. Réponses basées sur le contexte académique et légal (OHADA, Lois Cameroun).</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 custom-scrollbar p-4 rounded-2xl bg-black/20 border border-white/5">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 shadow-lg ${msg.role === 'user' ? 'bg-yann-steel/80 border-gray-400' : 'bg-[#001F3F] border-yann-gold'}`}>
              {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-yann-gold" />}
            </div>
            
            <div className={`rounded-2xl p-5 max-w-[85%] shadow-md backdrop-blur-sm ${
              msg.role === 'user' 
                ? 'bg-yann-gold/10 border border-yann-gold/20 text-white rounded-tr-sm' 
                : 'bg-[#001F3F] border border-yann-steel/30 text-gray-200 rounded-tl-sm'
            }`}>
              {/* Force plain text display with pre-wrap */}
              <p className="whitespace-pre-wrap leading-relaxed font-sans text-[15px]">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-[#001F3F] border-2 border-yann-gold flex items-center justify-center shrink-0 shadow-lg">
              <Bot size={20} className="text-yann-gold" />
            </div>
            <div className="bg-[#001F3F] border border-yann-steel/30 rounded-2xl p-5 rounded-tl-sm shadow-md flex items-center">
               <Spinner size="sm" />
               <span className="ml-3 text-gray-400 text-sm animate-pulse">Le Cerveau réfléchit...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative bg-[#001529] rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-yann-gold/20 p-2 group focus-within:border-yann-gold/60 transition-colors">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Posez votre question au Cerveau Numérique..."
          className="w-full bg-transparent border-none text-gray-100 placeholder-gray-500 focus:ring-0 resize-none min-h-[50px] max-h-[120px] py-3 pl-3 pr-14 custom-scrollbar"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-3 bottom-3 p-2 bg-gradient-to-r from-yann-gold to-yellow-600 text-yann-dark rounded-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg shadow-yann-gold/20"
        >
          <Send size={20} />
        </button>
      </div>
      
      {!process.env.API_KEY && (
        <div className="mt-3 flex justify-center">
           <span className="flex items-center gap-2 text-xs text-yann-gold/70 bg-yann-gold/5 px-3 py-1 rounded-full border border-yann-gold/10">
              <AlertCircle size={12} />
              Mode Démo (API Key requise)
           </span>
        </div>
      )}
    </div>
  );
};

export default DigitalBrain;