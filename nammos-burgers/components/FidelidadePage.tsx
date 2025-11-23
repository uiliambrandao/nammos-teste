import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HISTORY = [
  { desc: 'Pedido #4581', points: '+20', date: 'Hoje' },
  { desc: 'Smash Duplo Extra', points: '+12', date: '12/12' },
  { desc: 'Cupom Aplicado', points: '0', date: '10/12' },
  { desc: 'Pedido #3991', points: '+35', date: '05/12' },
  { desc: 'Bônus de Nível', points: '+50', date: '01/12' },
];

const FidelidadePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <h1 className="text-lg font-bold text-gray-900">Programa de Fidelidade</h1>
          </div>
          <div className="w-10 h-10" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto pt-24 px-4 sm:px-6 space-y-6 animate-fade-in-down">
        
        {/* 2. LEVEL CARD */}
        <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-gray-200 border border-gray-100 relative overflow-hidden">
           <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Seu nível atual</p>
                <h2 className="text-3xl font-extrabold text-gray-900">Prata <span className="text-brand-orange">II</span></h2>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold border-2 border-white shadow-md">
                 Ag
              </div>
           </div>

           {/* Progress */}
           <div className="relative z-10 mb-2">
              <div className="flex justify-between text-sm font-bold mb-2">
                 <span className="text-brand-orange">240 pts</span>
                 <span className="text-gray-400">350 pts</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-brand-orange rounded-full w-[70%] shadow-[0_0_10px_rgba(255,106,0,0.5)]"></div>
              </div>
              <p className="text-xs text-gray-400 mt-2 font-medium">Faltam 110 pontos para o nível Ouro</p>
           </div>

           {/* Decor */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -mr-8 -mt-8 blur-2xl"></div>
        </div>

        {/* 3. BENEFITS */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
           <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Seus Benefícios - Prata</h3>
           <ul className="space-y-3">
             {[
               "Cashback de 5% em todos os pedidos",
               "Prioridade na fila de preparo",
               "Acesso antecipado a promoções",
               "Suporte dedicado via WhatsApp"
             ].map((benefit, i) => (
               <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{benefit}</span>
               </li>
             ))}
           </ul>
        </div>

        {/* 4. POINTS HISTORY */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
           <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide">Extrato de Pontos</h3>
           <div className="space-y-4">
             {HISTORY.map((item, idx) => (
               <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-brand-orange text-xs font-bold">
                        ★
                     </div>
                     <div>
                       <p className="font-bold text-gray-800 text-sm">{item.desc}</p>
                       <p className="text-[10px] text-gray-400 font-medium">{item.date}</p>
                     </div>
                  </div>
                  <span className={`font-bold text-sm ${item.points === '0' ? 'text-gray-300' : 'text-brand-orange'}`}>
                    {item.points} pts
                  </span>
               </div>
             ))}
           </div>
        </div>

      </main>
    </div>
  );
};

export default FidelidadePage;