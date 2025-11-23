import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// --- MOCK DATA ---
const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'sides', name: 'Acompanhamentos' },
  { id: 'drinks', name: 'Bebidas' },
  { id: 'desserts', name: 'Sobremesas' },
  { id: 'combos', name: 'Combos' },
];

const PRODUCTS = [
  {
    id: 1,
    categoryId: 'burgers',
    name: "Nammos Classic",
    desc: "Blend 180g, cheddar inglês, cebola caramelizada, picles e maionese da casa no brioche.",
    price: 32.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    categoryId: 'burgers',
    name: "Double Smash",
    desc: "Dois smash burgers 90g, duplo queijo prato, molho especial e bacon crocante.",
    price: 36.50,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    categoryId: 'burgers',
    name: "Truffle Burger",
    desc: "Blend 180g, queijo brie empanado, maionese de trufas negras e rúcula.",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    categoryId: 'sides',
    name: "Fritas Rústicas",
    desc: "Batatas cortadas à mão, temperadas com páprica e alecrim.",
    price: 14.90,
    image: "https://images.unsplash.com/photo-1573080496987-a199f8cd4054?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    categoryId: 'sides',
    name: "Onion Rings",
    desc: "Anéis de cebola empanados e super crocantes. Acompanha molho barbecue.",
    price: 18.90,
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    categoryId: 'drinks',
    name: "Nammos Shake",
    desc: "Milkshake de chocolate belga, chantilly fresco e calda de avelã.",
    price: 22.00,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    categoryId: 'drinks',
    name: "Coca-Cola Lata",
    desc: "350ml, bem gelada.",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    categoryId: 'combos',
    name: "Combo Casal",
    desc: "2 Nammos Classic + 2 Fritas Pequenas + 2 Refrigerantes.",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&w=500&q=80"
  }
];

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2); // Mocked cart count
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle incoming navigation from Home Banner
  useEffect(() => {
    if (location.state && location.state.category) {
      setActiveCategory(location.state.category);
    }
  }, [location]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.categoryId === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleProductClick = (product: any) => {
    navigate('/product', { state: { product } });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 200;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-32">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* 1. Fixed Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-black rounded-full flex items-center justify-center shadow-md">
               <span className="text-brand-orange text-lg font-bold">N</span>
             </div>
             <h1 className="text-xl font-bold text-gray-900 tracking-tight">Cardápio</h1>
          </div>

          <button 
            onClick={() => navigate('/cart')}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-0 w-4 h-4 bg-brand-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        
        {/* 2. Search Bar */}
        <div className="px-6 py-6 bg-white border-b border-gray-50">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all placeholder-gray-400 text-gray-800 font-medium"
              placeholder="Buscar burgers, bebidas..."
            />
          </div>
        </div>

        {/* 3. Category Carousel (Sticky-ish) */}
        <div className="sticky top-[73px] z-20 bg-[#F9F9F9] pt-4 pb-2">
          <div className="relative max-w-4xl mx-auto px-2">
            
            {/* Left Arrow */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-brand-orange transition-all duration-200 hover:scale-110 ml-1"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Categories List */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar scroll-smooth px-10"
            >
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm whitespace-nowrap border
                    ${activeCategory === cat.id 
                      ? 'bg-brand-orange text-white border-brand-orange shadow-brand-orange/30 transform scale-105' 
                      : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'}
                  `}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-brand-orange transition-all duration-200 hover:scale-110 mr-1"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>

          </div>
        </div>

        {/* 4. Product Grid */}
        <div className="px-6 mt-4">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-gray-900">
               {CATEGORIES.find(c => c.id === activeCategory)?.name || 'Produtos'}
               <span className="text-gray-400 text-sm font-normal ml-2">({filteredProducts.length})</span>
             </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🍔</div>
              <h3 className="text-gray-900 font-bold mb-2">Nenhum item encontrado</h3>
              <p className="text-gray-500 text-sm">Tente buscar por outro termo.</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                className="mt-4 text-brand-orange font-bold text-sm"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6 animate-fade-in-down">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="bg-white rounded-[20px] sm:rounded-[24px] p-3 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  <div className="relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden mb-3 bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-lg leading-tight">{product.name}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
                      {product.desc}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-3 border-t border-gray-50 gap-2 sm:gap-0">
                    <span className="text-sm sm:text-xl font-bold text-gray-900">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <button 
                      className="w-full sm:w-auto bg-brand-black text-white px-0 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold hover:bg-brand-orange transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      Adicionar
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 5. Fixed Navbar (Identical to Home but Menu Active) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 pb-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-30 flex justify-between items-center max-w-4xl mx-auto">
        
        <NavIcon icon="home" label="Home" onClick={() => navigate('/home')} />
        <NavIcon icon="menu" label="Cardápio" active />
        
        {/* Cart Button (Floating Center) */}
        <div className="relative -top-6 cursor-pointer">
          <button 
            onClick={() => navigate('/cart')}
            className="w-14 h-14 bg-brand-orange rounded-full flex items-center justify-center shadow-lg shadow-brand-orange/40 transform transition-transform hover:scale-110 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <NavIcon icon="profile" label="Perfil" onClick={() => navigate('/profile')} />
      </div>

    </div>
  );
};

// Reused NavIcon Component
const NavIcon: React.FC<{ icon: string; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors w-16 ${active ? 'text-brand-orange' : 'text-gray-400 hover:text-gray-600'}`}
    >
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

export default MenuPage;