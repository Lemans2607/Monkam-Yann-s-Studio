import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

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
      <div className="bg-[#001529] border border-yann-gold/30 rounded-xl p-4 mb-6 flex items-start gap-4 shadow-lg shadow-black/40">
        <div className="p-2 bg-yann-gold/10 rounded-lg">
           <Sparkles className="text-yann-gold shrink-0" size={24} />
        </div>
        <div>
          <h3 className="text-yann-gold font-bold text-lg">Mode Ancrage Activé</h3>
          <p className="text-sm text-gray-300">0% Hallucination. Réponses basées sur le contexte académique et légal (OHADA, Lois Cameroun).</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${msg.role === 'user' ? 'bg-yann-steel border-gray-500' : 'bg-yann-dark border-yann-gold'}`}>
              {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-yann-gold" />}
            </div>
            
            <div className={`rounded-2xl p-5 max-w-[85%] shadow-md ${
              msg.role === 'user' 
                ? 'bg-yann-steel/20 border border-white/10 text-white rounded-tr-sm' 
                : 'bg-[#001F3F] border border-yann-gold/20 text-gray-100 rounded-tl-sm'
            }`}>
              {/* Force plain text display with pre-wrap */}
              <p className="whitespace-pre-wrap leading-relaxed font-sans text-[15px]">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-yann-dark border-2 border-yann-gold flex items-center justify-center shrink-0">
              <Bot size={20} className="text-yann-gold" />
            </div>
            <div className="bg-[#001F3F] border border-yann-gold/20 rounded-2xl p-5 rounded-tl-sm">
              <div className="flex space-x-2 items-center h-6">
                <div className="w-2 h-2 bg-yann-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-yann-gold/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-yann-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative bg-yann-dark rounded-xl shadow-2xl border border-white/10 p-2">
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
          className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 resize-none min-h-[50px] max-h-[120px] py-3 pl-2 pr-12 custom-scrollbar"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-3 bottom-3 p-2 bg-yann-gold text-yann-dark rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
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