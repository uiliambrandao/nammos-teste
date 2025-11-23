import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// MOCK DATA
const AVAILABLE_COUPONS = [
  {
    id: 1,
    code: 'NAMMOS10',
    title: '10% de Desconto',
    desc: 'Em qualquer pedido acima de R$ 30,00',
    validity: 'Válido até 25/12',
    status: 'new', // new | expiring | normal
    minOrder: 30
  },
  {
    id: 2,
    code: 'FRETEGRATIS',
    title: 'Entrega Grátis',
    desc: 'Válido para a região central',
    validity: 'Válido hoje',
    status: 'expiring',
    minOrder: 50
  },
  {
    id: 3,
    code: 'BURGER5',
    title: 'R$ 5,00 OFF',
    desc: 'Desconto direto no Nammos Classic',
    validity: 'Válido até 30/12',
    status: 'normal',
    minOrder: 0
  },
  {
    id: 4,
    code: 'WELCOME',
    title: 'R$ 15,00 OFF',
    desc: 'Oferta de boas-vindas (1º pedido)',
    validity: 'Válido por 7 dias',
    status: 'new',
    minOrder: 40
  }
];

const EXPIRED_COUPONS = [
  {
    id: 10,
    code: 'BLACKFRIDAY',
    title: '50% OFF',
    desc: 'Promoção encerrada',
    validity: 'Expirou em 25/11',
  },
  {
    id: 11,
    code: 'NATAL23',
    title: 'R$ 20,00 OFF',
    desc: 'Válido apenas no natal',
    validity: 'Expirou em 26/12',
  }
];

const CuponsPage: React.FC = () => {
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApply = () => {
    if (!couponInput.trim()) return;

    // Mock validation logic
    const code = couponInput.toUpperCase().trim();
    if (AVAILABLE_COUPONS.some(c => c.code === code)) {
      setFeedback({ type: 'success', msg: `Cupom ${code} aplicado com sucesso!` });
      // Simulate action
      setTimeout(() => navigate('/menu'), 1500);
    } else {
      setFeedback({ type: 'error', msg: 'Cupom inválido ou expirado.' });
    }
  };

  const copyToClipboard = (code: string) => {
    setCouponInput(code);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-12 font-sans relative">
      
      {/* 1. HEADER (Fixed) */}
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
            <h1 className="text-lg font-bold text-gray-900">Cupons de Desconto</h1>
            <p className="text-xs text-gray-500 font-medium">Ofertas exclusivas para você</p>
          </div>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto pt-24 px-4 sm:px-6 space-y-8 animate-fade-in-down">
        
        {/* 2. INPUT SECTION */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
          <label className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 block">
            Adicionar Cupom
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
             <div className="relative flex-grow">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                 </svg>
               </div>
               <input 
                 type="text" 
                 value={couponInput}
                 onChange={(e) => {
                   setCouponInput(e.target.value);
                   setFeedback(null);
                 }}
                 placeholder="Digite seu cupom"
                 className={`
                    w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-xl outline-none font-bold text-gray-900 uppercase placeholder-gray-400 text-sm transition-all
                    ${feedback?.type === 'error' ? 'border-red-200 bg-red-50 focus:border-red-500' : 'border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange'}
                    ${feedback?.type === 'success' ? 'border-green-200 bg-green-50 focus:border-green-500' : ''}
                 `}
               />
             </div>
             <button 
               onClick={handleApply}
               disabled={!couponInput}
               className="bg-brand-orange text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-orange/30 hover:bg-orange-600 disabled:opacity-50 disabled:shadow-none transition-all"
             >
               Aplicar
             </button>
          </div>

          {/* Feedback Messages */}
          {feedback && (
            <div className={`mt-3 text-xs font-bold flex items-center gap-2 ${feedback.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
               {feedback.type === 'success' ? (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                 </svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                 </svg>
               )}
               {feedback.msg}
            </div>
          )}
        </div>

        {/* 3. AVAILABLE COUPONS */}
        <div>
           <div className="flex items-center gap-2 mb-4 px-2">
             <h3 className="text-lg font-bold text-gray-900">Cupons disponíveis</h3>
             <span className="bg-brand-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{AVAILABLE_COUPONS.length}</span>
           </div>

           <div className="space-y-4">
              {AVAILABLE_COUPONS.map((coupon) => (
                <div key={coupon.id} className="bg-white rounded-[24px] p-5 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 relative group overflow-hidden transition-transform hover:-translate-y-1 duration-300">
                  
                  {/* Perforated Line Decoration (Visual only) */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#F9F9F9] rounded-full"></div>
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#F9F9F9] rounded-full"></div>
                  
                  <div className="flex items-start gap-4">
                     {/* Icon Box */}
                     <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-brand-orange flex-shrink-0 border border-orange-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                     </div>

                     <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="font-extrabold text-gray-900 text-lg uppercase tracking-tight">{coupon.code}</h4>
                          
                          {coupon.status === 'new' && (
                            <span className="bg-orange-100 text-brand-orange text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Novo</span>
                          )}
                          {coupon.status === 'expiring' && (
                            <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Expira logo</span>
                          )}
                        </div>
                        
                        <p className="font-bold text-gray-800 text-sm leading-tight mb-1">{coupon.title}</p>
                        <p className="text-xs text-gray-500 mb-3">{coupon.desc}</p>
                        <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {coupon.validity}
                        </p>
                     </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex gap-3">
                     <button 
                       onClick={() => copyToClipboard(coupon.code)}
                       className="flex-grow py-2.5 rounded-xl border border-brand-orange text-brand-orange font-bold text-xs hover:bg-orange-50 transition-colors"
                     >
                       Usar Cupom
                     </button>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* 4. EXPIRED COUPONS */}
        <div className="opacity-70 grayscale-[50%]">
           <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 px-2">Expirados / Não disponíveis</h3>
           
           <div className="space-y-4">
             {EXPIRED_COUPONS.map((coupon) => (
               <div key={coupon.id} className="bg-gray-50 rounded-[20px] p-5 border border-gray-100 flex items-center gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                  </div>
                  <div className="flex-grow">
                     <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-500 line-through">{coupon.code}</span>
                        <span className="bg-red-50 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border border-red-100">Expirado</span>
                     </div>
                     <p className="text-xs text-gray-400">{coupon.desc}</p>
                     <p className="text-[10px] text-gray-400 mt-0.5">{coupon.validity}</p>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* 5. INFO CARD */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-8 rounded-full bg-brand-black flex items-center justify-center text-white">
               <span className="font-bold text-sm">?</span>
             </div>
             <h3 className="font-bold text-gray-900 text-sm">Como usar seus cupons</h3>
          </div>
          <ul className="space-y-3">
             {[
               "Digite o cupom ou selecione na lista antes de finalizar",
               "Apenas um cupom por pedido",
               "Alguns cupons possuem valor mínimo",
               "Sujeito às regras de cada promoção"
             ].map((rule, idx) => (
               <li key={idx} className="flex items-start gap-3 text-xs text-gray-600 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {rule}
               </li>
             ))}
          </ul>
        </div>

      </main>
    </div>
  );
};

export default CuponsPage;