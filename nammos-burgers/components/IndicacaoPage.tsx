import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const REFERRALS = [
  { name: 'João Silva', status: 'completed', reward: 'R$ 10,00' },
  { name: 'Maria Souza', status: 'pending', reward: 'Pendente' },
  { name: 'Pedro Costa', status: 'completed', reward: 'R$ 10,00' },
  { name: 'Ana Clara', status: 'pending', reward: 'Pendente' },
];

const IndicacaoPage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const CODE = "NAMMOS-4581";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-12 font-sans relative">
      
      {/* 1. HEADER */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-700 hover:text-brand-orange transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">Indique e Ganhe</h1>
          </div>
          <div className="w-10 h-10" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto pt-24 px-4 sm:px-6 space-y-8 animate-fade-in-down">
        
        {/* 2. HERO CARD */}
        <div className="bg-gradient-to-br from-brand-orange to-orange-500 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-orange-500/20 text-center">
           <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                 </svg>
              </div>
              <h2 className="text-3xl font-extrabold leading-tight mb-2">
                R$ 10 para você <br/> + R$ 10 para o amigo
              </h2>
              <p className="text-white/90 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                Compartilhe seu código exclusivo. Quando seu amigo fizer o primeiro pedido, vocês dois ganham!
              </p>
           </div>
           
           {/* Abstract Shapes */}
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-600/30 rounded-full blur-xl -ml-10 -mb-10"></div>
        </div>

        {/* 3. CODE & SHARE */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 text-center">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Seu código exclusivo</p>
           
           <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-2 pl-6 mb-6">
              <span className="flex-grow font-mono text-xl font-bold text-gray-900 tracking-wider text-center">
                {CODE}
              </span>
              <button 
                onClick={handleCopy}
                className="bg-brand-black text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-95"
              >
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
           </div>

           <div className="flex justify-center gap-4">
              <button className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/></svg>
              </button>
              <button className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </button>
              <button className="w-14 h-14 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shadow-sm hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
           </div>
        </div>

        {/* 4. HISTORY LIST */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
           <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide">Suas Indicações</h3>
           
           <div className="space-y-4">
             {REFERRALS.map((ref, idx) => (
               <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-sm">
                       {ref.name.charAt(0)}
                     </div>
                     <div>
                       <p className="font-bold text-gray-900 text-sm">{ref.name}</p>
                       <p className="text-xs text-gray-400 font-medium">
                         {ref.status === 'completed' ? 'Completou o pedido' : 'Ainda não pediu'}
                       </p>
                     </div>
                  </div>
                  
                  {ref.status === 'completed' ? (
                    <div className="text-right">
                       <span className="block font-bold text-green-600 text-sm">+{ref.reward}</span>
                       <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">Ganho</span>
                    </div>
                  ) : (
                    <div className="text-right">
                       <span className="block font-bold text-gray-300 text-sm">{ref.reward}</span>
                       <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-bold">Pendente</span>
                    </div>
                  )}
               </div>
             ))}
           </div>
        </div>

      </main>
    </div>
  );
};

export default IndicacaoPage;