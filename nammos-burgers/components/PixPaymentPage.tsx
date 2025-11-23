
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const PixPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  // Mock total amount - in a real app would come from context/state
  const totalAmount = 74.80; 
  
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'waiting' | 'paid'>('waiting');

  const MOCK_PIX_CODE = "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913NAMMOS BURGERS6008SAO PAULO62070503***6304E2CA";

  // Countdown timer for the "10 minutes validity"
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format seconds into MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate automatic payment approval after 20 seconds
  useEffect(() => {
    const approvalTimer = setTimeout(() => {
      setPaymentStatus('paid');
      // Wait a moment after showing "Paid" state before redirecting
      setTimeout(() => {
        navigate('/tracking');
      }, 2500);
    }, 20000); // 20 seconds

    return () => clearTimeout(approvalTimer);
  }, [navigate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_PIX_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans relative flex flex-col items-center">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="w-10" /> 
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">Pagamento Pix</h1>
            <p className="text-xs text-gray-500 font-medium">Pedido #1234</p>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="w-full max-w-md mx-auto pt-24 px-6 pb-12 flex-grow flex flex-col animate-fade-in-down">
        
        {/* Timer Banner */}
        <div className="bg-orange-50 rounded-xl p-3 flex items-center justify-center gap-2 mb-6 border border-orange-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-orange animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-bold text-brand-orange">
            Pague em {formatTime(timeLeft)}
          </span>
        </div>

        {/* QR Code Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
           
           {paymentStatus === 'paid' && (
             <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-fade-in-down">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900">Pagamento Aprovado!</h3>
                <p className="text-gray-500 text-sm mt-1">Redirecionando...</p>
             </div>
           )}

           <div className="mb-2">
             <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Valor Total</p>
             <h2 className="text-3xl font-extrabold text-gray-900">R$ {totalAmount.toFixed(2).replace('.', ',')}</h2>
           </div>

           {/* QR Code Placeholder */}
           <div className="my-6 p-4 border-2 border-dashed border-brand-orange/30 rounded-2xl bg-white relative group">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913NAMMOS BURGERS6008SAO PAULO62070503***6304E2CA" 
                alt="QR Code Pix" 
                className="w-48 h-48 object-contain mix-blend-multiply opacity-90"
              />
              {/* Scan overlay */}
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange/50 shadow-[0_0_15px_rgba(255,106,0,0.5)] animate-[scan_2s_infinite]"></div>
           </div>
           
           <p className="text-sm text-gray-500 font-medium max-w-[200px]">
             Abra o app do seu banco e escaneie o QR Code acima.
           </p>
        </div>

        {/* Copy Paste Code */}
        <div className="mt-6">
           <div className="flex justify-between items-center mb-2 px-1">
             <span className="text-xs font-bold text-gray-500 uppercase">Pix Copia e Cola</span>
           </div>
           <div className="bg-white rounded-xl border border-gray-200 p-1 flex items-center shadow-sm">
             <input 
               type="text" 
               readOnly
               value={MOCK_PIX_CODE}
               className="flex-grow bg-transparent text-xs text-gray-500 px-3 outline-none truncate font-mono"
             />
             <button 
               onClick={handleCopy}
               className={`
                 px-4 py-2.5 rounded-lg font-bold text-xs transition-all duration-200
                 ${copied ? 'bg-green-500 text-white' : 'bg-brand-black text-white hover:bg-brand-orange'}
               `}
             >
               {copied ? 'Copiado!' : 'Copiar'}
             </button>
           </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-auto pt-8 flex items-center justify-center gap-3">
           {paymentStatus === 'waiting' ? (
             <>
                <div className="w-5 h-5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-bold text-gray-600">Aguardando confirmação do banco...</p>
             </>
           ) : (
             <>
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                </div>
                <p className="text-sm font-bold text-green-600">Pagamento confirmado!</p>
             </>
           )}
        </div>
        
        <style>{`
          @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}</style>

      </main>
    </div>
  );
};

export default PixPaymentPage;
