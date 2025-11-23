import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_ADDRESSES = [
  { label: 'Casa', street: 'Rua das Palmeiras, 120', detail: 'Centro - Apt 42', current: true },
  { label: 'Trabalho', street: 'Av. Paulista, 1000', detail: 'Bela Vista - Sala 501', current: false },
  { label: 'Namorada', street: 'Rua Augusta, 500', detail: 'Consolação - Casa verde', current: false },
];

const EnderecosPage: React.FC = () => {
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
            <h1 className="text-lg font-bold text-gray-900">Meus Endereços</h1>
          </div>
          <div className="w-10 h-10" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto pt-24 px-4 sm:px-6 space-y-6 animate-fade-in-down">
        
        {/* 2. ADDRESS LIST */}
        <div className="space-y-4">
          {MOCK_ADDRESSES.map((addr, idx) => (
            <div key={idx} className="bg-white p-5 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col gap-4 group">
               <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${addr.current ? 'bg-orange-50 text-brand-orange' : 'bg-gray-50 text-gray-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                     </div>
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <h3 className="font-bold text-gray-900 text-sm">{addr.label}</h3>
                           {addr.current && <span className="text-[10px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded-full">Principal</span>}
                        </div>
                        <p className="text-sm text-gray-600 font-medium">{addr.street}</p>
                        <p className="text-xs text-gray-400">{addr.detail}</p>
                     </div>
                  </div>
               </div>

               {/* Actions */}
               <div className="flex gap-3 pt-3 border-t border-gray-50">
                  <button className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    Editar
                  </button>
                  <button className="flex-1 py-2 rounded-xl border border-red-100 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors">
                    Excluir
                  </button>
               </div>
            </div>
          ))}
        </div>

        {/* 3. ADD NEW CARD */}
        <button 
          onClick={() => navigate('/address')}
          className="w-full bg-white border-2 border-dashed border-gray-200 rounded-[24px] p-6 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-brand-orange hover:text-brand-orange hover:bg-orange-50/30 transition-all group"
        >
           <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
           </div>
           <span className="font-bold text-sm">Adicionar novo endereço</span>
        </button>

      </main>
    </div>
  );
};

export default EnderecosPage;