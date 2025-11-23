import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// MOCK HISTORY DATA
const MOCK_HISTORY = [
  {
    id: '#4521',
    items: 'Smash Duplo + Fritas',
    date: '12/01',
    status: 'Entregue',
    total: 42.90
  },
  {
    id: '#4402',
    items: 'Nammos Classic + Coca-Cola',
    date: '08/01',
    status: 'Entregue',
    total: 38.90
  },
  {
    id: '#3991',
    items: '2x Truffle Burger',
    date: '20/12',
    status: 'Entregue',
    total: 84.00
  }
];

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, deliveryAddress } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Format phone for display
  const displayPhone = user?.phone 
    ? user.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    : '(00) 00000-0000';

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-10 font-sans relative">
      
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
            <h1 className="text-lg font-bold text-gray-900">Meu Perfil</h1>
          </div>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-2xl mx-auto pt-24 px-4 sm:px-6 space-y-6 animate-fade-in-down">
        
        {/* 2. USER INFO CARD */}
        <section className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10">
            {/* Avatar Mock */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 border-4 border-white shadow-md overflow-hidden flex-shrink-0">
               <div className="w-full h-full flex items-center justify-center bg-brand-black text-white text-2xl font-bold">
                 {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
               </div>
            </div>
            
            <div className="flex-grow">
              <h2 className="text-xl font-extrabold text-gray-900 leading-tight mb-1">
                {user?.name || 'Visitante'}
              </h2>
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {displayPhone}
              </div>
              
              <button className="text-xs font-bold text-brand-orange bg-orange-50 px-3 py-1.5 rounded-full hover:bg-brand-orange hover:text-white transition-all">
                Editar dados
              </button>
            </div>
          </div>
          
          {/* Edit Icon Top Right */}
          <button className="absolute top-6 right-6 text-gray-300 hover:text-brand-orange transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </section>

        {/* 3. ADDRESS CARD */}
        <section className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Endereço de Entrega</h3>
            <button 
              onClick={() => navigate('/address')}
              className="text-xs font-bold text-brand-orange hover:text-orange-600 transition-colors"
            >
              Alterar endereço
            </button>
          </div>

          <div className="flex items-start gap-4">
             <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-brand-orange shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
             </div>
             
             {deliveryAddress ? (
               <div className="space-y-1">
                 <p className="font-bold text-gray-900 text-base leading-tight">
                   {deliveryAddress.street}, {deliveryAddress.number}
                 </p>
                 <p className="text-sm text-gray-500">
                   {deliveryAddress.neighborhood} - {deliveryAddress.city}
                 </p>
                 {deliveryAddress.reference && (
                   <p className="text-xs text-gray-400 italic">Ref: {deliveryAddress.reference}</p>
                 )}
               </div>
             ) : (
               <div className="space-y-1">
                 <p className="text-sm text-gray-500">Nenhum endereço cadastrado.</p>
                 <button onClick={() => navigate('/address')} className="text-sm font-bold text-brand-orange underline decoration-orange-300 decoration-2 underline-offset-2">
                   Adicionar agora
                 </button>
               </div>
             )}
          </div>
        </section>

        {/* 4. ORDER HISTORY CARD */}
        <section className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-5">Histórico de Pedidos</h3>
          
          <div className="space-y-4">
            {MOCK_HISTORY.map((order, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{order.items}</p>
                    <p className="text-xs text-gray-500 font-medium">
                      <span className="text-green-600">{order.status}</span> • {order.date} • {order.id}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300 ml-auto mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 text-sm font-bold text-brand-orange border border-orange-100 rounded-xl hover:bg-orange-50 transition-colors">
            Ver todos os pedidos
          </button>
        </section>

        {/* 5. SETTINGS / HELP CARD */}
        <section className="bg-white rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
          <div className="p-2">
            {[
              { label: 'Notificações', icon: 'bell' },
              { label: 'Preferências', icon: 'cog' },
              { label: 'Dúvidas Frequentes (FAQ)', icon: 'question' },
              { label: 'Política de Privacidade', icon: 'shield' },
              { label: 'Termos de Uso', icon: 'doc' },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                <div className="flex items-center gap-4">
                  <SettingsIcon name={item.icon} />
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.label}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300 group-hover:text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </section>

        {/* 6. LOGOUT BUTTON */}
        <div className="pt-2 pb-8">
          <button className="w-full bg-white border border-gray-200 text-red-500 py-4 rounded-2xl font-bold text-lg hover:bg-red-50 hover:border-red-100 transition-all shadow-sm">
            Sair da Conta
          </button>
          <p className="text-center text-xs text-gray-300 mt-4">Versão 1.0.2</p>
        </div>

      </main>
    </div>
  );
};

// Helper for Settings Icons
const SettingsIcon: React.FC<{ name: string }> = ({ name }) => {
  const className = "h-5 w-5 text-gray-400";
  
  if (name === 'bell') {
    return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
  }
  if (name === 'cog') {
    return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
  }
  if (name === 'question') {
    return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  }
  if (name === 'shield') {
    return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
  }
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
};

export default UserProfilePage;