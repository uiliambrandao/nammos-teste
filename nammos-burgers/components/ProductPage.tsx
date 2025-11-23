import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// MOCK ADD-ONS DATA
const ADDONS = [
  { id: 1, name: "Bacon Crocante", price: 4.00 },
  { id: 2, name: "Cheddar Extra", price: 3.00 },
  { id: 3, name: "Ovo Frito", price: 2.50 },
  { id: 4, name: "Molho Especial", price: 2.00 },
  { id: 5, name: "Cebola Caramelizada", price: 2.00 },
];

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [observation, setObservation] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize product data (from navigation state or fallback)
  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
    } else {
      // Fallback mock if accessed directly
      setProduct({
        id: 1,
        name: "Nammos Classic",
        desc: "Blend 180g, cheddar inglês, cebola caramelizada, picles e maionese da casa no brioche.",
        price: 32.90,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
      });
    }
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [location]);

  // Handlers
  const handleToggleAddon = (id: number) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleQuantity = (type: 'inc' | 'dec') => {
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    if (type === 'inc') setQuantity(q => q + 1);
  };

  const calculateTotal = () => {
    if (!product) return 0;
    const addonsTotal = selectedAddons.reduce((acc, id) => {
      const addon = ADDONS.find(a => a.id === id);
      return acc + (addon ? addon.price : 0);
    }, 0);
    return (product.price + addonsTotal) * quantity;
  };

  const handleAddToCart = () => {
    setIsAnimating(true);
    // Simulate API call/Logic
    setTimeout(() => {
      navigate('/menu');
    }, 400);
  };

  if (!product) return <div className="min-h-screen bg-[#F9F9F9]" />;

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32 font-sans">
      
      {/* 1. Header (Fixed) */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-gray-700 hover:text-brand-orange hover:border-brand-orange transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <h1 className="text-lg font-bold text-gray-900 truncate max-w-[200px] sm:max-w-md text-center">
            {product.name}
          </h1>

          <div className="w-10 h-10 flex items-center justify-center text-gray-400">
             {/* Optional Share/Heart Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto pt-20 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-fade-in-down">
        
        {/* Left Column: Image (Desktop Sticky) */}
        <div className="relative">
          <div className="md:sticky md:top-24">
            <div className="aspect-[4/3] sm:aspect-square md:aspect-[4/3] w-full rounded-[32px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 bg-white relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Form */}
        <div className="space-y-8">
          
          {/* 3. Product Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                {product.name}
              </h2>
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-brand-orange">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              {product.desc}
            </p>
          </div>

          <div className="h-px bg-gray-200 w-full" />

          {/* 4. Add-ons Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Adicionais</h3>
            <div className="grid grid-cols-1 gap-3">
              {ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div 
                    key={addon.id}
                    onClick={() => handleToggleAddon(addon.id)}
                    className={`
                      cursor-pointer group flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-200 shadow-sm
                      ${isSelected 
                        ? 'bg-orange-50/50 border-brand-orange shadow-brand-orange/10' 
                        : 'bg-white border-gray-100 hover:border-brand-orange/50 hover:shadow-md'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                       {/* Custom Checkbox */}
                       <div className={`
                         w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                         ${isSelected ? 'bg-brand-orange border-brand-orange' : 'border-gray-300 bg-white group-hover:border-brand-orange'}
                       `}>
                         {isSelected && (
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                         )}
                       </div>
                       <span className={`font-semibold text-base ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                         {addon.name}
                       </span>
                    </div>
                    <span className="text-brand-orange font-bold text-sm">
                      + R$ {addon.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Observations */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Alguma observação?</h3>
            <div className="bg-white p-2 rounded-[24px] border border-gray-100 shadow-sm">
              <textarea 
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Ex: Tirar a cebola, ponto da carne bem passado, sem maionese..."
                className="w-full h-32 p-4 rounded-2xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/10 resize-none font-medium text-base"
              />
            </div>
          </div>

          {/* 6. Quantity Control (Inline for Desktop, part of Footer for Mobile sometimes, but let's keep it here) */}
          <div className="space-y-4 pb-4">
             <h3 className="text-xl font-bold text-gray-900">Quantidade</h3>
             <div className="flex items-center gap-6">
                <div className="flex items-center bg-white border border-gray-200 rounded-full px-2 py-2 shadow-sm">
                  <button 
                    onClick={() => handleQuantity('dec')}
                    disabled={quantity === 1}
                    className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-xl text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => handleQuantity('inc')}
                    className="w-10 h-10 rounded-full bg-brand-black text-white hover:bg-gray-800 flex items-center justify-center transition-colors font-bold text-xl"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {quantity === 1 ? 'Item' : 'Itens'} selecionados
                </div>
             </div>
          </div>

        </div>
      </main>

      {/* 7. Fixed Bottom Bar (CTA) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 sm:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-30">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="hidden sm:block">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Total a pagar</p>
            <p className="text-3xl font-extrabold text-gray-900">
              R$ {calculateTotal().toFixed(2).replace('.', ',')}
            </p>
          </div>

          <button 
            onClick={handleAddToCart}
            className={`
              w-full sm:w-auto sm:min-w-[320px] bg-brand-orange text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg shadow-brand-orange/30 
              transform transition-all duration-300 hover:bg-orange-600 hover:-translate-y-1 active:scale-95 flex items-center justify-between sm:justify-center gap-4
              ${isAnimating ? 'opacity-80 scale-95' : ''}
            `}
          >
            <span className="sm:hidden font-extrabold text-lg">
              R$ {calculateTotal().toFixed(2).replace('.', ',')}
            </span>
            <span>Adicionar ao Carrinho</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductPage;
