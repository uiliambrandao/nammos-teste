
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, deliveryAddress } = useAppContext();

  // State for Payment Methods
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'cash'>('pix');
  const [cardType, setCardType] = useState<'credit' | 'debit'>('credit');
  const [cashChange, setCashChange] = useState('');
  const [needsChange, setNeedsChange] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // State for Discounts & Cashback
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, value: number} | null>(null);
  const [useCashback, setUseCashback] = useState(false);
  
  const CASHBACK_BALANCE = 18.50; // Mock balance

  // Mock Totals
  const subtotal = 79.80;
  const deliveryFee = 5.00;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculation Logic
  const couponDiscount = appliedCoupon ? appliedCoupon.value : 0;
  const subtotalAfterCoupon = Math.max(0, subtotal + deliveryFee - couponDiscount);
  const cashbackDiscount = useCashback ? Math.min(subtotalAfterCoupon, CASHBACK_BALANCE) : 0;
  const total = subtotalAfterCoupon - cashbackDiscount;

  const handleApplyCoupon = () => {
    if (!couponCode) return;
    
    // Mock Coupon Logic
    const code = couponCode.toUpperCase();
    if (code === 'NAMMOS10') {
      setAppliedCoupon({ code: 'NAMMOS10', value: 8.00 }); // Flat or %
      setCouponCode('');
    } else if (code === 'WELCOME') {
      setAppliedCoupon({ code: 'WELCOME', value: 15.00 });
      setCouponCode('');
    } else {
      alert('Cupom inválido ou expirado.');
    }
  };

  const handleFinishOrder = () => {
    setIsProcessing(true);
    
    // Simulate initial processing delay
    setTimeout(() => {
      setIsProcessing(false);
      
      if (paymentMethod === 'pix') {
        // Redirect to new Pix Payment Page
        navigate('/pix-payment');
      } else {
        // Regular flow for Card/Cash
        navigate('/tracking');
      }
    }, 1500);
  };

  const formatPhone = (phone: string) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-44 font-sans relative">
      
      {/* 1. Header (Fixed) */}
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
            <h1 className="text-lg font-bold text-gray-900">Pagamento</h1>
            <p className="text-xs text-gray-500 font-medium">Finalize seu pedido</p>
          </div>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto pt-24 px-4 sm:px-6 space-y-6 animate-fade-in-down">
        
        {/* 2. Customer Data Card */}
        <section className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Dados do Cliente</h2>
            <button className="text-xs font-bold text-brand-orange bg-orange-50 px-3 py-1 rounded-full hover:bg-orange-100 transition-colors">
              Editar dados
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
              👤
            </div>
            <div>
              <p className="font-bold text-gray-900">{user?.name || 'Visitante'}</p>
              <p className="text-sm text-gray-500">{user?.phone ? formatPhone(user.phone) : 'Telefone não informado'}</p>
            </div>
          </div>
        </section>

        {/* 3. Address Card */}
        <section className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Endereço de Entrega</h2>
            <button 
              onClick={() => navigate('/address')}
              className="text-xs font-bold text-brand-orange bg-orange-50 px-3 py-1 rounded-full hover:bg-orange-100 transition-colors"
            >
              Alterar
            </button>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-brand-orange flex-shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
            </div>
            <div>
              {deliveryAddress ? (
                <>
                  <p className="font-bold text-gray-900 leading-tight">
                    {deliveryAddress.street}, {deliveryAddress.number}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {deliveryAddress.neighborhood} - {deliveryAddress.city}
                  </p>
                  {deliveryAddress.reference && (
                    <p className="text-xs text-gray-400 mt-1 italic">
                      Ref: {deliveryAddress.reference}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-500 italic">Retirada no balcão</p>
              )}
            </div>
          </div>
        </section>

        {/* 4. Payment Methods */}
        <section className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Como deseja pagar?</h2>
          
          <div className="space-y-3">
            
            {/* Option: PIX */}
            <div 
              onClick={() => setPaymentMethod('pix')}
              className={`
                relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${paymentMethod === 'pix' 
                  ? 'border-brand-orange bg-orange-50/30' 
                  : 'border-gray-100 bg-white hover:border-gray-200'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pix' ? 'border-brand-orange' : 'border-gray-300'}`}>
                    {paymentMethod === 'pix' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange" />}
                  </div>
                  <span className="font-bold text-gray-900">PIX</span>
                  <span className="text-[10px] font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">Recomendado</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              {paymentMethod === 'pix' && (
                <div className="mt-3 pl-8 animate-fade-in-down">
                  <p className="text-xs text-gray-500">
                    O pagamento é reconhecido automaticamente em instantes.
                  </p>
                </div>
              )}
            </div>

            {/* Option: Card */}
            <div 
              onClick={() => setPaymentMethod('card')}
              className={`
                relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${paymentMethod === 'card' 
                  ? 'border-brand-orange bg-orange-50/30' 
                  : 'border-gray-100 bg-white hover:border-gray-200'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-brand-orange' : 'border-gray-300'}`}>
                    {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange" />}
                  </div>
                  <span className="font-bold text-gray-900">Cartão na Entrega</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="mt-3 pl-8 flex gap-3 animate-fade-in-down">
                   <button 
                    onClick={(e) => { e.stopPropagation(); setCardType('credit'); }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${cardType === 'credit' ? 'bg-brand-black text-white border-brand-black' : 'bg-white text-gray-500 border-gray-200'}`}
                   >
                     Crédito
                   </button>
                   <button 
                    onClick={(e) => { e.stopPropagation(); setCardType('debit'); }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${cardType === 'debit' ? 'bg-brand-black text-white border-brand-black' : 'bg-white text-gray-500 border-gray-200'}`}
                   >
                     Débito
                   </button>
                </div>
              )}
            </div>

            {/* Option: Cash */}
            <div 
              onClick={() => setPaymentMethod('cash')}
              className={`
                relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${paymentMethod === 'cash' 
                  ? 'border-brand-orange bg-orange-50/30' 
                  : 'border-gray-100 bg-white hover:border-gray-200'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cash' ? 'border-brand-orange' : 'border-gray-300'}`}>
                    {paymentMethod === 'cash' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange" />}
                  </div>
                  <span className="font-bold text-gray-900">Dinheiro</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              {paymentMethod === 'cash' && (
                <div className="mt-4 pl-8 animate-fade-in-down" onClick={(e) => e.stopPropagation()}>
                  <label className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={needsChange}
                      onChange={(e) => setNeedsChange(e.target.checked)}
                      className="w-4 h-4 text-brand-orange rounded focus:ring-brand-orange border-gray-300" 
                    />
                    <span className="text-sm text-gray-700 font-medium">Precisa de troco?</span>
                  </label>
                  
                  {needsChange && (
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold">R$</span>
                      <input 
                        type="tel"
                        value={cashChange}
                        onChange={(e) => setCashChange(e.target.value)}
                        placeholder="Troco para quanto?"
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none text-gray-900 font-bold"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* 5. COUPON & CASHBACK */}
        <section className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 space-y-5">
           
           {/* Cashback Toggle */}
           <div className="flex items-center justify-between pb-5 border-b border-gray-50">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </div>
               <div>
                  <p className="font-bold text-gray-900 text-sm">Saldo Cashback</p>
                  <p className="text-xs text-gray-500">Disponível: R$ {CASHBACK_BALANCE.toFixed(2).replace('.', ',')}</p>
               </div>
             </div>
             
             {/* Simple Toggle Switch */}
             <button 
               onClick={() => setUseCashback(!useCashback)}
               className={`relative w-12 h-7 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${useCashback ? 'bg-brand-orange' : 'bg-gray-200'}`}
             >
                <span className={`absolute left-0.5 top-0.5 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${useCashback ? 'translate-x-5' : 'translate-x-0'}`} />
             </button>
           </div>

           {/* Coupon Input */}
           <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Cupom de Desconto</h3>
              
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3 px-4">
                  <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {appliedCoupon.code} aplicado!
                  </div>
                  <button onClick={() => setAppliedCoupon(null)} className="text-gray-400 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Adicionar código"
                    className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none text-gray-900 font-medium text-sm"
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    className="bg-gray-900 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              )}
           </div>
        </section>

        {/* 6. Order Summary */}
        <section className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Resumo</h2>
          <div className="space-y-3 text-sm text-gray-600 mb-4 border-b border-gray-100 pb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de entrega</span>
              <span className="font-medium text-gray-900">R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
            </div>

            {/* Discounts */}
            {appliedCoupon && (
               <div className="flex justify-between text-green-600">
                 <span>Desconto ({appliedCoupon.code})</span>
                 <span className="font-bold">- R$ {appliedCoupon.value.toFixed(2).replace('.', ',')}</span>
               </div>
            )}
            
            {useCashback && cashbackDiscount > 0 && (
               <div className="flex justify-between text-brand-orange">
                 <span>Cashback utilizado</span>
                 <span className="font-bold">- R$ {cashbackDiscount.toFixed(2).replace('.', ',')}</span>
               </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-gray-900">Total</span>
            <span className="font-extrabold text-2xl text-brand-orange">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
        </section>

      </main>

      {/* 7. Fixed Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 sm:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-30">
        <div className="max-w-2xl mx-auto text-center">
          <button 
            onClick={handleFinishOrder}
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
               paymentMethod === 'pix' ? `Gerar Pix (R$ ${total.toFixed(2).replace('.', ',')})` : `Pagar R$ ${total.toFixed(2).replace('.', ',')}`
             )}
          </button>
          <p className="text-xs text-gray-400 mt-3">
            Ambiente 100% seguro.
          </p>
        </div>
      </div>

    </div>
  );
};

export default CheckoutPage;
