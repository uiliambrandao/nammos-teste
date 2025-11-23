import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// MOCK DATA
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'order_shipping',
    title: 'Seu pedido #4581 saiu para entrega!',
    desc: 'O entregador Carlos está a caminho com seu burger quentinho 🛵',
    time: 'há 5 min',
    isNew: true,
  },
  {
    id: 2,
    type: 'promo_fire',
    title: '🔥 Oferta especial hoje!',
    desc: 'Ganhe 20% OFF no Smash Bacon. Corra antes que acabe!',
    time: 'há 3 horas',
    isNew: true,
  },
  {
    id: 3,
    type: 'order_delivered',
    title: 'Pedido #4402 entregue',
    desc: 'Agradecemos por escolher a Nammos! Avalie sua experiência.',
    time: 'Ontem',
    isNew: false,
  },
  {
    id: 4,
    type: 'promo',
    title: 'Saldão de Fritas 🍟',
    desc: 'Fritas Rústicas por apenas R$ 9,90. Só hoje no app.',
    time: 'há 1 dia',
    isNew: false,
  },
  {
    id: 5,
    type: 'system',
    title: 'Atualização no cardápio',
    desc: 'Novos milkshakes chegaram! Venha conferir os sabores.',
    time: 'há 2 dias',
    isNew: false,
  },
  {
    id: 6,
    type: 'order_cancelled',
    title: 'Pedido #4102 cancelado',
    desc: 'O reembolso foi processado na sua carteira.',
    time: '20 Nov',
    isNew: false,
  },
  {
    id: 7,
    type: 'promo',
    title: 'Cupom de saudade 🎫',
    desc: 'Faz tempo que não te vemos! Use VOLTA10 para 10% OFF.',
    time: '15 Nov',
    isNew: false,
  },
  {
    id: 8,
    type: 'system',
    title: 'Bem-vindo ao Nammos!',
    desc: 'Obrigado por criar sua conta. Aproveite nosso burger premium.',
    time: '01 Nov',
    isNew: false,
  }
];

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'orders', label: 'Pedidos' },
  { id: 'promos', label: 'Promoções' },
];

const NotificacoesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isNew: false })));
  };

  // Filter Logic (Visual only based on type grouping for mock)
  const filteredList = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'orders') return n.type.startsWith('order');
    if (activeFilter === 'promos') return n.type.startsWith('promo');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-12 font-sans relative">
      
      {/* 1. HEADER (Fixed) */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => navigate(-1)}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-700 hover:text-brand-orange transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </button>
            <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">Notificações</h1>
                <p className="text-xs text-gray-500 font-medium">Fique por dentro das novidades</p>
            </div>
          </div>

          <button 
            onClick={handleMarkAllRead}
            className="text-xs font-bold text-brand-orange hover:text-orange-600 transition-colors"
          >
            Marcar lidas
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto pt-24 px-4 sm:px-6 space-y-6 animate-fade-in-down">
        
        {/* 2. FILTERS */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {FILTERS.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border
                ${activeFilter === filter.id 
                  ? 'bg-brand-black text-white border-brand-black shadow-lg shadow-gray-200' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'}
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* 3. NOTIFICATION LIST */}
        <div className="space-y-4">
          {filteredList.length > 0 ? (
            filteredList.map((item) => (
              <NotificationItem key={item.id} data={item} />
            ))
          ) : (
            /* 4. EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-16 text-center">
               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
               </div>
               <h3 className="text-gray-900 font-bold text-lg mb-2">Sem notificações</h3>
               <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8">
                 Você não tem novas notificações nesta categoria no momento.
               </p>
               <button 
                 onClick={() => navigate('/menu')}
                 className="px-8 py-3 bg-brand-orange text-white rounded-xl font-bold shadow-lg shadow-brand-orange/30 hover:bg-orange-600 transition-all"
               >
                 Ver Cardápio
               </button>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

// --- HELPER COMPONENT: Notification Item ---
const NotificationItem: React.FC<{ data: any }> = ({ data }) => {
  const getIconConfig = (type: string) => {
    switch (type) {
      case 'order_shipping':
        return { icon: 'bike', bg: 'bg-blue-50', text: 'text-blue-600' };
      case 'order_delivered':
        return { icon: 'check', bg: 'bg-green-50', text: 'text-green-600' };
      case 'order_cancelled':
        return { icon: 'x', bg: 'bg-red-50', text: 'text-red-500' };
      case 'promo_fire':
        return { icon: 'fire', bg: 'bg-orange-50', text: 'text-brand-orange' };
      case 'promo':
        return { icon: 'tag', bg: 'bg-purple-50', text: 'text-purple-600' };
      default:
        return { icon: 'bell', bg: 'bg-gray-100', text: 'text-gray-500' };
    }
  };

  const config = getIconConfig(data.type);

  return (
    <div className={`
        bg-white p-5 rounded-[24px] shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 flex gap-4 relative group transition-all hover:bg-gray-50/50
        ${data.isNew ? 'border-l-4 border-l-brand-orange' : ''}
    `}>
      {/* Icon */}
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.bg} ${config.text}`}>
        <Icon name={config.icon} />
      </div>

      {/* Content */}
      <div className="flex-grow">
         <div className="flex justify-between items-start mb-1">
            <h3 className={`text-sm font-bold ${data.isNew ? 'text-gray-900' : 'text-gray-700'}`}>
                {data.title}
            </h3>
            {data.isNew && (
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse mt-1.5"></span>
            )}
         </div>
         <p className="text-xs text-gray-500 leading-relaxed mb-2">{data.desc}</p>
         <p className="text-[10px] text-gray-400 font-medium">{data.time}</p>
      </div>
    </div>
  );
};

// --- HELPER: Icons ---
const Icon: React.FC<{ name: string }> = ({ name }) => {
  if (name === 'bike') {
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>; // Using lightning for speed/delivery
  }
  if (name === 'fire') {
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.45-.412-1.79a1 1 0 00-1.996-.067c-.005.155-.008.337.005.54.025.378.093.84.28 1.344.18.486.47 1.05.955 1.574a7.994 7.994 0 002.485 1.957 7.989 7.989 0 004.836.31 8.003 8.003 0 004.305-3.084 7.973 7.973 0 001.373-4.045c.032-.705.01-1.353-.05-1.92a7.71 7.71 0 00-.317-1.897 1 1 0 00-1.285-.688 6.643 6.643 0 01-1.875.605 1 1 0 00-.77.585 5.56 5.56 0 01-1.336 1.836 1 1 0 01-1.22 1.002 5.56 5.56 0 01-1.742.668 1 1 0 00-.71.558 1 1 0 00.177 1.074 1.572 1.572 0 002.404.316 1.574 1.574 0 00.322-2.31 4.58 4.58 0 00-.547-.696 4.568 4.568 0 00-1.07-.817 1 1 0 00-.03-1.638z" clipRule="evenodd" /></svg>;
  }
  if (name === 'check') {
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
  }
  if (name === 'x') {
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
  }
  if (name === 'tag') {
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>;
  }
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
};

export default NotificacoesPage;