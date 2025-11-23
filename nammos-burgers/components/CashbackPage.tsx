import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_HISTORY = [
  { id: 1, type: 'credit', amount: 3.20, date: 'Hoje, 19:45', desc: 'Pedido #4521 - Smash Duplo' },
  { id: 2, type: 'debit', amount: 5.00, date: '15/01', desc: 'Usado no pedido #4490' },
  { id: 3, type: 'credit', amount: 8.40, date: '12/01', desc: 'Pedido #4402 - Clássico' },
  { id: 4, type: 'credit', amount: 4.50, date: '20/12', desc: 'Pedido #3991 - Combo Casal' },
  { id: 5, type: 'debit', amount: 12.00, date: '10/12', desc: 'Usado no pedido #3850' },
  { id: 6, type: 'credit', amount: 2.50, date: '05/12', desc: 'Pedido #3701 - Shake' },
];

const CashbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-12 font-sans relative">
      
      {/* 1. Header (Fixed) */}
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
            <h1 className="text-lg font-bold text-gray-900">Cashback</h1>
          </div>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto pt-24 px-4 sm:px-6 space-y-6 animate-fade-in-down">
        
        {/* Intro Text */}
        <div className="text-center px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Cashback Nammos</h2>
          <p className="text-sm text-gray-500 font-medium mt-1">Ganhe enquanto aproveita mais sabor.</p>
        </div>

        {/* 2. Main Balance Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_15px_50px_-15px_rgba(255,106,0,0.15)] border border-orange-50 relative overflow-hidden text-center group transform-gpu">
           <div className="relative z-10">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Seu saldo disponível</p>
              <h3 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight flex items-start justify-center">
                <span className="text-2xl mt-1 text-gray-400 font-bold mr-1">R$</span>
                18,50
              </h3>
              
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Pronto para usar
              </div>

              <button 
                onClick={() => navigate('/menu')}
                className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-brand-orange/30 transform transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-500/40"
              >
                Usar saldo agora
              </button>
           </div>
           
           {/* Decor Elements */}
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-100/40 to-transparent rounded-full blur-2xl pointer-events-none"></div>
           <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-orange-50 to-transparent rounded-full blur-xl pointer-events-none"></div>
        </div>

        {/* 3. How it works */}
        <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-50 flex items-start gap-4">
           <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
           </div>
           <div>
              <p className="text-sm font-bold text-gray-900 mb-1">Como funciona?</p>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Você ganha <span className="text-brand-orange font-bold">5% de volta</span> em todos os pedidos. Seu saldo é creditado automaticamente após a entrega.
              </p>
           </div>
        </div>

        {/* 4. History */}
        <div>
           <div className="flex justify-between items-end mb-4 px-2">
             <h3 className="text-lg font-bold text-gray-900">Movimentações</h3>
             <span className="text-xs text-gray-400 font-medium">Últimos 30 dias</span>
           </div>

           <div className="space-y-3">
              {MOCK_HISTORY.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-[20px] shadow-sm border border-gray-50 flex justify-between items-center transition-colors hover:border-gray-100">
                   <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center 
                        ${item.type === 'credit' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-400'}
                      `}>
                         {item.type === 'credit' ? (
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                           </svg>
                         ) : (
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                           </svg>
                         )}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-gray-900">
                           {item.type === 'credit' ? 'Cashback recebido' : 'Cashback utilizado'}
                         </p>
                         <p className="text-xs text-gray-400 font-medium">{item.desc}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className={`font-bold text-sm ${item.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                        {item.type === 'credit' ? '+' : '–'} R$ {item.amount.toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">{item.date}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 5. Benefits */}
        <div className="bg-brand-black text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden mt-2">
            <div className="relative z-10">
               <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                 <span className="text-brand-orange">★</span> Por que usar Cashback?
               </h3>
               <ul className="space-y-4">
                 {[
                   "Economize em cada pedido",
                   "Saldo nunca expira",
                   "Pode usar com qualquer forma de pagamento",
                   "Ativa automaticamente"
                 ].map((benefit, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                     <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                     </div>
                     {benefit}
                   </li>
                 ))}
               </ul>
            </div>
            {/* Abstract Background */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl"></div>
        </div>

      </main>
    </div>
  );
};

export default CashbackPage;