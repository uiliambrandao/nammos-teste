import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---
const CATEGORIES = [
  { id: 'burgers', name: 'Burgers' },
  { id: 'sides', name: 'Acompanhamentos' },
  { id: 'drinks', name: 'Bebidas' },
  { id: 'desserts', name: 'Sobremesas' },
  { id: 'combos', name: 'Combos' },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Nammos Classic",
    desc: "Blend 180g, cheddar inglês, cebola caramelizada.",
    price: 32.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Double Smash",
    desc: "Dois smash burgers, queijo prato, molho especial.",
    price: 28.50,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Truffle Fries",
    desc: "Fritas rústicas com azeite trufado e parmesão.",
    price: 18.90,
    image: "https://images.unsplash.com/photo-1573080496987-a199f8cd4054?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "Nammos Shake",
    desc: "Milkshake de chocolate belga com chantilly.",
    price: 22.00,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80"
  }
];

const BANNERS = [
  {
    id: 1,
    title: "Combo Clássico",
    subtitle: "15% OFF hoje",
    color: "bg-gradient-to-r from-[#FF6B00] to-[#FF8E3C]",
    textColor: "text-white",
    categoryId: 'combos'
  },
  {
    id: 2,
    title: "Fritas Nammos",
    subtitle: "Por R$ 9,90",
    color: "bg-[#1a1a1a]",
    textColor: "text-white",
    categoryId: 'sides'
  },
  {
    id: 3,
    title: "Sexta do Smash",
    subtitle: "Dose Dupla",
    color: "bg-[#F5F5F5]",
    textColor: "text-gray-900",
    categoryId: 'burgers'
  }
];

const HomePage: React.FC = () => {
  const { user, deliveryAddress } = useAppContext();
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-rotate banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getFirstName = () => user?.name?.split(' ')[0] || 'Visitante';

  const navigateToCategory = (categoryId: string) => {
    // Navigate to the menu page with the category state or query param
    navigate('/menu', { state: { category: categoryId } });
  };

  const handleProductClick = (product: any) => {
    navigate('/product', { state: { product } });
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      
      {/* 1. Header */}
      <header className="p-6 sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-50">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">
              Olá, <span className="text-brand-orange">{getFirstName()}</span> 👋
            </h1>
            <div className="flex items-center mt-1 group cursor-pointer" onClick={() => navigate('/address')}>
              <span className="text-xs text-gray-400 font-medium truncate max-w-[200px]">
                {deliveryAddress ? `${deliveryAddress.street}, ${deliveryAddress.number}` : 'Selecione o endereço'}
              </span>
              <span className="ml-2 text-[10px] font-bold text-brand-orange bg-orange-50 px-2 py-0.5 rounded-full group-hover:bg-brand-orange group-hover:text-white transition-colors">
                Alterar
              </span>
            </div>
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer" onClick={() => navigate('/profile')}>
             <span className="text-lg">👤</span>
          </div>
        </div>

        {/* 2. Search Bar */}
        <div className="mt-6 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-[#F9F9F9] border border-[#EAEAEA] rounded-2xl text-sm focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all placeholder-gray-400 text-gray-800 font-medium shadow-sm"
            placeholder="Buscar no cardápio..."
          />
        </div>
      </header>

      {/* Scrollable Content Area */}
      <div className="space-y-8 mt-2">
        
        {/* 3. Banners Carousel */}
        <div className="pl-6 overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out" 
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {BANNERS.map((banner) => (
              <div key={banner.id} className="w-full flex-shrink-0 pr-6">
                <div 
                  onClick={() => navigateToCategory(banner.categoryId)}
                  className={`h-40 rounded-3xl ${banner.color} p-6 flex flex-col justify-center shadow-lg relative overflow-hidden group cursor-pointer`}
                >
                  {/* Decorative Circle */}
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                  
                  <h3 className={`text-2xl font-extrabold ${banner.textColor} mb-1 relative z-10`}>
                    {banner.title}
                  </h3>
                  <p className={`text-sm font-medium opacity-90 ${banner.textColor} relative z-10`}>
                    {banner.subtitle}
                  </p>
                  <button className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg w-fit text-xs font-bold text-white uppercase tracking-wider hover:bg-white/30 transition-colors">
                    Ver agora
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-4 pr-6">
            {BANNERS.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentBanner === idx ? 'w-6 bg-brand-orange' : 'w-1.5 bg-gray-200'}`}
              />
            ))}
          </div>
        </div>

        {/* 4. Categories (Text Only Pills) - HIDDEN ON MOBILE */}
        <div className="hidden sm:block">
          <div className="flex justify-between items-center px-6 mb-4">
            <h2 className="text-lg font-bold text-gray-900">Categorias</h2>
          </div>
          <div className="flex overflow-x-auto px-6 gap-3 pb-2 hide-scrollbar">
            {CATEGORIES.map((cat, index) => (
              <button 
                key={cat.id} 
                onClick={() => navigateToCategory(cat.id)}
                className={`
                  flex-shrink-0 px-6 py-3 rounded-full border text-sm font-bold transition-all duration-300 shadow-sm whitespace-nowrap
                  ${index === 0 
                    ? 'bg-brand-black text-white border-brand-black' 
                    : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-brand-orange hover:text-white hover:border-brand-orange'}
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Recommendations Grid */}
        <div className="px-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recomendações</h2>
          <div className="grid grid-cols-2 gap-4">
            {PRODUCTS.map((product) => (
              <div 
                key={product.id} 
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] hover:scale-[1.03] transition-all duration-300 flex flex-col h-full cursor-pointer group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-3 relative bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  {/* Price Tag */}
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-brand-orange shadow-sm">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 leading-tight mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-3">{product.desc}</p>
                </div>
                <button className="w-full py-2 bg-brand-black text-white rounded-xl text-xs font-bold hover:bg-brand-orange transition-colors flex items-center justify-center gap-2 mt-auto">
                  <span>Adicionar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Button: Ver Cardápio Completo */}
        <div className="px-6">
          <button 
            onClick={() => navigate('/menu')}
            className="w-full py-4 rounded-xl font-bold text-lg bg-white border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-sm"
          >
            Ver Cardápio Completo
          </button>
        </div>

      </div>

      {/* 6. Floating Footer Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 pb-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-30 flex justify-between items-center">
        
        <NavIcon icon="home" label="Home" active />
        <NavIcon icon="menu" label="Cardápio" onClick={() => navigate('/menu')} />
        
        {/* Cart Button (Floating Center) */}
        <div className="relative -top-6 cursor-pointer">
          <button 
            onClick={() => navigate('/cart')}
            className="w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center shadow-lg shadow-brand-orange/40 transform transition-transform hover:scale-110 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">2</span>
          </button>
        </div>

        <NavIcon icon="profile" label="Perfil" onClick={() => navigate('/profile')} />
      </div>

    </div>
  );
};

// Helper Subcomponent for Footer Icons
const NavIcon: React.FC<{ icon: string; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-colors w-16 ${active ? 'text-brand-orange' : 'text-gray-400 hover:text-gray-600'}`}>
      {icon === 'home' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      )}
      {icon === 'menu' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      )}
      {icon === 'profile' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
};

export default HomePage;