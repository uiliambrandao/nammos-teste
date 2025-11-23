import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// MOCK CONSTANTS
const ORDER_STEPS = [
  { id: 'received', label: 'Pedido Recebido', time: '19:30', icon: 'check' },
  { id: 'accepted', label: 'Pedido Aceito', time: '19:32', icon: 'store' },
  { id: 'preparing', label: 'Preparando', time: '19:35', icon: 'chef' },
  { id: 'delivery', label: 'Saiu para Entrega', time: '19:55', icon: 'bike' },
  { id: 'delivered', label: 'Entregue', time: '--:--', icon: 'flag' },
];

const MOCK_ORDER = {
  id: '#1234',
  createdAt: '19:30',
  type: 'delivery', // 'delivery' | 'pickup'
  items: [
    { name: '1x Nammos Classic', detail: '+ Bacon' },
    { name: '1x Fritas Rústicas', detail: '' },
    { name: '2x Coca-Cola Lata', detail: '' }
  ],
  total: 84.80,
  driver: {
    name: 'Carlos Almeida',
    plate: 'ABC-1234',
    bikeModel: 'Honda CG 160',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&q=80',
    eta: '10-15 min'
  }
};

const TrackingPage: React.FC = () => {
  const navigate = useNavigate();
  // Simulate current status. In a real app, this comes from backend/socket.
  const [currentStatusIndex, setCurrentStatusIndex] = useState(2); // Start at 'preparing'

  // Mock progression for demo purposes
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setInterval(() => {
      setCurrentStatusIndex(prev => (prev < 3 ? prev + 1 : prev));
    }, 10000); // Advance step every 10s for demo
    return () => clearInterval(timer);
  }, []);

  const currentStep = ORDER_STEPS[currentStatusIndex];
  const isDelivered = currentStatusIndex === ORDER_STEPS.length - 1;

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32 font-sans relative">
      
      {/* 1. HEADER (Fixed) */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-700 hover:text-brand-orange transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">Acompanhar Pedido</h1>
            <p className="text-xs text-brand-orange font-bold animate-pulse">
               ● Atualizado em tempo real
            </p>
          </div>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-down">
        
        {/* LEFT COLUMN: STATUS & INFO */}
        <div className="space-y-6">
          
          {/* 2. Order Info Card */}
          <div className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex justify-between items-center">
             <div>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Número do Pedido</p>
               <h2 className="text-2xl font-extrabold text-gray-900">{MOCK_ORDER.id}</h2>
             </div>
             <div className="text-right">
               <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Horário</p>
               <p className="text-gray-700 font-medium">{MOCK_ORDER.createdAt}</p>
             </div>
          </div>

          {/* 3. Timeline */}
          <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
            <h3 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Status do Pedido</h3>
            
            <div className="relative pl-2">
              {/* Vertical Line Background */}
              <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-100 z-0"></div>

              <div className="space-y-8 relative z-10">
                {ORDER_STEPS.map((step, index) => {
                  const isCompleted = index < currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;
                  const isFuture = index > currentStatusIndex;

                  return (
                    <div key={step.id} className="flex gap-4 items-start">
                      {/* Icon Bubble */}
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 flex-shrink-0 z-10
                        ${isCompleted ? 'bg-brand-orange border-brand-orange text-white' : ''}
                        ${isCurrent ? 'bg-white border-brand-orange text-brand-orange shadow-lg shadow-brand-orange/20 scale-110' : ''}
                        ${isFuture ? 'bg-white border-gray-200 text-gray-300' : ''}
                      `}>
                        <StepIcon name={step.icon} />
                      </div>

                      {/* Text */}
                      <div className={`pt-2 transition-all duration-500 ${isFuture ? 'opacity-40 blur-[0.5px]' : 'opacity-100'}`}>
                        <h4 className={`font-bold leading-none ${isCurrent ? 'text-brand-orange text-lg' : 'text-gray-900'}`}>
                          {step.label}
                        </h4>
                        {(!isFuture || step.time !== '--:--') && (
                          <p className="text-xs text-gray-400 mt-1 font-medium">{step.time}</p>
                        )}
                        {isCurrent && (
                          <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-[200px]">
                            {getStatusMessage(step.id)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DRIVER & SUMMARY */}
        <div className="space-y-6">

          {/* 4. Driver / Pickup Info */}
          {MOCK_ORDER.type === 'delivery' ? (
             <div className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden relative">
                {/* Decorative Background Blob */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>

                <div className="relative z-10">
                  <h3 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">
                    {currentStatusIndex >= 3 ? "Entregador a caminho" : "Dados da Entrega"}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img 
                        src={MOCK_ORDER.driver.image} 
                        alt="Driver" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-white">
                        ★ {MOCK_ORDER.driver.rating}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-900">{MOCK_ORDER.driver.name}</p>
                      <p className="text-sm text-gray-500">{MOCK_ORDER.driver.bikeModel} • {MOCK_ORDER.driver.plate}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center border border-gray-100">
                     <div>
                       <p className="text-xs text-gray-500 font-medium">Tempo estimado</p>
                       <p className="text-lg font-bold text-gray-900">{MOCK_ORDER.driver.eta}</p>
                     </div>
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-orange shadow-sm">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                     </div>
                  </div>
                </div>
             </div>
          ) : (
            <div className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
               <div className="text-center py-6">
                 <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-orange">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                   </svg>
                 </div>
                 <h3 className="font-bold text-lg text-gray-900 mb-2">Retirada no Balcão</h3>
                 <p className="text-gray-500 text-sm max-w-xs mx-auto">
                   Assim que seu pedido estiver pronto, chamaremos pelo seu nome ou número no painel.
                 </p>
               </div>
            </div>
          )}

          {/* 5. Order Summary */}
          <div className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
             <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Resumo do Pedido</h3>
             <ul className="space-y-4 mb-4">
               {MOCK_ORDER.items.map((item, idx) => (
                 <li key={idx} className="flex justify-between items-start text-sm">
                   <div>
                     <span className="font-bold text-gray-800">{item.name}</span>
                     {item.detail && <p className="text-xs text-gray-400 mt-0.5">{item.detail}</p>}
                   </div>
                 </li>
               ))}
             </ul>
             <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-brand-orange">R$ {MOCK_ORDER.total.toFixed(2).replace('.', ',')}</span>
             </div>
          </div>

        </div>

      </main>

      {/* 6. FIXED BOTTOM BAR */}
      {!isDelivered && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 sm:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-30">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3">
             <button className="flex-1 bg-[#25D366] text-white py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-green-500/20 hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Falar no WhatsApp
             </button>
             <button className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold text-sm sm:text-base hover:bg-gray-200 transition-colors">
                Preciso de Ajuda
             </button>
          </div>
        </div>
      )}

    </div>
  );
};

// HELPER: Dynamic Status Messages
function getStatusMessage(statusId: string) {
  switch(statusId) {
    case 'received': return 'Recebemos seu pedido e estamos conferindo.';
    case 'accepted': return 'O restaurante começou a organizar seu pedido.';
    case 'preparing': return 'A chapa está quente! Seu hambúrguer está sendo feito com carinho.';
    case 'delivery': return 'Tudo pronto. O entregador já está indo até você.';
    case 'delivered': return 'Pedido entregue. Bom apetite!';
    default: return '';
  }
}

// HELPER: Icons
const StepIcon: React.FC<{ name: string }> = ({ name }) => {
  if (name === 'check') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (name === 'store') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  }
  if (name === 'chef') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ); // Placeholder for Chef/Cooking, using book/menu style or we can use custom path
  }
  if (name === 'bike') {
    return (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg> 
      // Using lightning/speed for "Out for Delivery" or we can try a bike approximate
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8M10 9H8v4h2V9z" />
    </svg>
  );
};

export default TrackingPage;