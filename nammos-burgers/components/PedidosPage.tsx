import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---
const MOCK_ORDERS = [
  {
    id: '#4581',
    date: '12 Dez 2025 • 20:14',
    status: 'delivered', // delivered, in_progress, on_way, cancelled
    total: 54.90,
    items: [
      { qty: 2, name: 'Smash Duplo' },
      { qty: 1, name: 'Fritas Nammos' },
      { qty: 1, name: 'Coca-Cola Zero' }
    ]
  },
  {
    id: '#4520',
    date: '05 Dez 2025 • 19:30',
    status: 'delivered',
    total: 32.90,
    items: [
      { qty: 1, name: 'Nammos Classic' },
      { qty: 1, name: 'Milkshake Chocolate' }
    ]
  },
  {
    id: '#4492',
    date: 'Hoje • 19:15',
    status: 'on_way',
    total: 89.50,
    items: [
      { qty: 2, name: 'Combo Casal' },
      { qty: 1, name: 'Onion Rings' }
    ]
  },
  {
    id: '#4480',
    date: 'Hoje • 18:40',
    status: 'in_progress',
    total: 42.00,
    items: [
      { qty: 1, name: 'Truffle Burger' },
      { qty: 1, name: 'Fritas Rústicas' }
    ]
  },
  {
    id: '#4102',
    date: '20 Nov 2025 • 21:00',
    status: 'cancelled',
    total: 28.50,
    items: [
      { qty: 1, name: 'Double Smash' }
    ]
  },
  {
    id: '#3990',
    date: '10 Nov 2025 • 20:45',
    status: 'delivered',
    total: 112.90,
    items: [
      { qty: 4, name: 'Nammos Classic' },
      { qty: 4, name: 'Fritas' },
      { qty: 1, name: 'Refrigerante 2L' }
    ]
  }
];

const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'active', label: 'Em andamento' },
  { id: 'delivered', label: 'Entregues' },
  { id: 'cancelled', label: 'Cancelados' }
];

const PedidosPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoadingRepeat, setIsLoadingRepeat] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter Logic
  const filteredOrders = MOCK_ORDERS.filter(order => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return ['in_progress', 'on_way'].includes(order.status);
    return order.status === activeFilter;
  });

  const handleRepeatOrder = (orderId: string) => {
    setIsLoadingRepeat(orderId);
    // Simulate adding to cart
    setTimeout(() => {
      setIsLoadingRepeat(null);
      navigate('/cart');
    }, 800);
  };

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'delivered': 
        return { label: 'Entregue', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' };
      case 'cancelled': 
        return { label: 'Cancelado', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' };
      case 'in_progress': 
        return { label: 'Em preparo', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' };
      case 'on_way': 
        return { label: 'A caminho', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' };
      default: 
        return { label: 'Desconhecido', color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-100' };
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-12 font-sans relative">
      
      {/* 1. HEADER (Fixed) */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-700 hover:text-brand-orange transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">Meus Pedidos</h1>
            <p className="text-xs text-gray-500 font-medium">Histórico completo</p>
          </div>
          <div className="w-10 h-10" /> {/* Spacer */}
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
                px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border
                ${activeFilter === filter.id 
                  ? 'bg-brand-black text-white border-brand-black shadow-lg shadow-gray-200' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'}
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* 3. ORDER LIST */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              
              return (
                <div key={order.id} className="bg-white rounded-[24px] p-5 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                       </div>
                       <span className="font-bold text-gray-900 text-sm">{order.id}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{order.date}</span>
                  </div>

                  {/* Card Body (Items) */}
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-100">
                            {item.qty}
                          </span>
                          {item.name}
                        </li>
                      ))}
                      {order.items.length > 2 && (
                        <li className="text-xs text-gray-400 pl-7 font-medium">
                          +{order.items.length - 2} itens...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Card Info (Total & Status) */}
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Total</p>
                      <p className="font-extrabold text-lg text-gray-900">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                    </div>
                    
                    <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${statusConfig.bg} ${statusConfig.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.color.replace('text', 'bg')}`}></span>
                      <span className={`text-xs font-bold ${statusConfig.color}`}>{statusConfig.label}</span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="grid grid-cols-2 gap-3">
                     <button 
                       onClick={() => handleRepeatOrder(order.id)}
                       disabled={isLoadingRepeat === order.id}
                       className="bg-brand-orange text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-orange/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                     >
                       {isLoadingRepeat === order.id ? (
                         <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                       ) : (
                         <>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                           </svg>
                           Repetir
                         </>
                       )}
                     </button>
                     
                     <button 
                       onClick={() => ['in_progress', 'on_way'].includes(order.status) ? navigate('/tracking') : null}
                       className="bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                     >
                       Detalhes
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                       </svg>
                     </button>
                  </div>

                </div>
              );
            })
          ) : (
            /* 4. EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-down">
               <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
               </div>
               <h3 className="text-gray-900 font-bold text-lg mb-2">Nenhum pedido encontrado</h3>
               <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8">
                 Você ainda não fez nenhum pedido com esse filtro selecionado.
               </p>
               <button 
                 onClick={() => navigate('/menu')}
                 className="px-8 py-3 bg-brand-black text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all"
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

export default PedidosPage;