import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Address } from '../types';

// MOCK DATA FOR CART
const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: "Nammos Classic",
    price: 32.90,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80",
    addons: ["Bacon Crocante", "Cheddar Extra"],
    obs: "Sem picles, por favor."
  },
  {
    id: 2,
    name: "Fritas Rústicas",
    price: 14.90,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1573080496987-a199f8cd4054?auto=format&fit=crop&w=200&q=80",
    addons: [],
    obs: ""
  },
  {
    id: 3,
    name: "Coca-Cola Lata",
    price: 6.00,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=80",
    addons: [],
    obs: "Gelo e limão"
  }
];

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { deliveryAddress, setDeliveryAddress } = useAppContext();
  
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [isProcessing, setIsProcessing] = useState(false);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [tempAddress, setTempAddress] = useState<Address>({
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    reference: ''
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // CALCULATIONS
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = deliveryType === 'delivery' ? 5.00 : 0.00;
  const total = subtotal + deliveryFee;

  // HANDLERS
  const handleQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemove = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (deliveryType === 'delivery' && !deliveryAddress) {
      // Force address modal if not set
      handleOpenAddressModal();
      return;
    }

    setIsProcessing(true);
    // Simulate navigation delay
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/checkout');
    }, 500);
  };

  // Modal Handlers
  const handleOpenAddressModal = () => {
    if (deliveryAddress) {
      setTempAddress(deliveryAddress);
    }
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = () => {
    setDeliveryAddress(tempAddress);
    setIsAddressModalOpen(false);
  };

  const handleTempAddressChange = (field: keyof Address, value: string) => {
    setTempAddress(prev => ({ ...prev, [field]: value }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-8 max-w-xs mx-auto">Parece que você ainda não escolheu seu burger favorito.</p>
        <button 
          onClick={() => navigate('/menu')}
          className="bg-brand-orange text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-brand-orange/30 hover:bg-orange-600 transition-all"
        >
          Voltar ao Cardápio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-40 font-sans relative">
      
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
            <h1 className="text-lg font-bold text-gray-900">Seu Carrinho</h1>
            <p className="text-xs text-gray-500 font-medium">Revise seu pedido</p>
          </div>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-2xl mx-auto pt-24 px-4 sm:px-6 space-y-6 animate-fade-in-down">

        {/* 2. CART ITEMS LIST */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-4 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex gap-4 relative overflow-hidden group"
            >
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-2xl overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-grow flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 leading-tight pr-6">{item.name}</h3>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1 -mt-1 -mr-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Addons List */}
                  {item.addons.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      + {item.addons.join(", ")}
                    </p>
                  )}
                  
                  {/* Obs */}
                  {item.obs && (
                    <p className="text-[10px] text-gray-400 italic mt-1 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      "{item.obs}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-brand-orange">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </span>
                  
                  {/* Quantity Control Small */}
                  <div className="flex items-center bg-gray-50 rounded-lg p-1 gap-3 border border-gray-100">
                    <button 
                      onClick={() => handleQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-gray-600 shadow-sm hover:text-brand-orange"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-gray-900 w-3 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-md bg-brand-black text-white shadow-sm hover:bg-brand-orange"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
          <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Resumo do Pedido</h3>
          
          <div className="space-y-3 text-sm text-gray-600 mb-4 border-b border-gray-100 pb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de entrega</span>
              <span className="font-medium text-gray-900">
                {deliveryType === 'delivery' ? `R$ ${deliveryFee.toFixed(2).replace('.', ',')}` : 'Grátis'}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-gray-900">Total</span>
            <span className="font-extrabold text-2xl text-brand-orange">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        {/* 4. ADDRESS / DELIVERY */}
        <div className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Entrega</h3>
             {deliveryType === 'delivery' && (
               <button 
                onClick={handleOpenAddressModal}
                className="text-xs font-bold text-brand-orange hover:text-orange-600 bg-orange-50 px-3 py-1 rounded-full"
              >
                 {deliveryAddress ? 'Editar / Confirmar' : 'Adicionar Endereço'}
               </button>
             )}
          </div>

          <div className="flex gap-4 mb-4">
            <button 
              onClick={() => setDeliveryType('delivery')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${deliveryType === 'delivery' ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/20' : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100'}`}
            >
              Entrega
            </button>
            <button 
              onClick={() => setDeliveryType('pickup')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${deliveryType === 'pickup' ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/20' : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100'}`}
            >
              Retirada
            </button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-orange mt-0.5">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
             </div>
             <div className="flex-grow">
                {deliveryType === 'delivery' ? (
                  <>
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-gray-900 text-sm">Entregar em:</p>
                    </div>
                    {deliveryAddress ? (
                      <>
                        <p className="text-sm text-gray-700 font-medium leading-relaxed mt-1">
                          {deliveryAddress.street}, {deliveryAddress.number}
                        </p>
                        <p className="text-xs text-gray-500">{deliveryAddress.neighborhood} - {deliveryAddress.city}</p>
                        {deliveryAddress.reference && <p className="text-xs text-gray-400 mt-1 italic">Ref: {deliveryAddress.reference}</p>}
                      </>
                    ) : (
                      <p className="text-sm text-gray-400 mt-1">Nenhum endereço selecionado.</p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="font-bold text-gray-900 text-sm">Retirar em:</p>
                    <p className="text-sm text-gray-500 leading-relaxed">Rua Nammos Burger, 1000</p>
                    <p className="text-xs text-gray-400">Centro - 15-20 min</p>
                  </>
                )}
             </div>
          </div>
        </div>

      </main>

      {/* 5. FIXED CHECKOUT CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 sm:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-20">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={handleCheckout}
            disabled={isProcessing}
            className={`
              w-full bg-brand-orange text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-brand-orange/30 
              transform transition-all duration-300 hover:bg-orange-600 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2
              ${isProcessing ? 'opacity-80 cursor-wait' : ''}
            `}
          >
             {isProcessing ? (
               <>
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                 Processando...
               </>
             ) : (
               "Continuar para Pagamento"
             )}
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-3 font-medium">
            Você poderá revisar a forma de pagamento na próxima etapa.
          </p>
        </div>
      </div>

      {/* --- ADDRESS MODAL --- */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsAddressModalOpen(false)}></div>
          
          <div className="bg-white rounded-[24px] w-full max-w-md p-6 relative z-10 shadow-2xl animate-fade-in-down">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Confirmar Endereço</h3>
              <button 
                onClick={() => setIsAddressModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto hide-scrollbar">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Rua</label>
                <input 
                  type="text" 
                  value={tempAddress.street}
                  onChange={(e) => handleTempAddressChange('street', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none font-medium text-gray-900"
                  placeholder="Nome da rua"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Número</label>
                  <input 
                    type="text" 
                    value={tempAddress.number}
                    onChange={(e) => handleTempAddressChange('number', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none font-medium text-gray-900"
                    placeholder="123"
                  />
                </div>
                 <div className="col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Bairro</label>
                  <input 
                    type="text" 
                    value={tempAddress.neighborhood}
                    onChange={(e) => handleTempAddressChange('neighborhood', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none font-medium text-gray-900"
                    placeholder="Bairro"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Referência</label>
                <input 
                  type="text" 
                  value={tempAddress.reference}
                  onChange={(e) => handleTempAddressChange('reference', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none font-medium text-gray-900"
                  placeholder="Ao lado de..."
                />
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleSaveAddress}
                  className="w-full bg-brand-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg"
                >
                  Confirmar Endereço
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CartPage;