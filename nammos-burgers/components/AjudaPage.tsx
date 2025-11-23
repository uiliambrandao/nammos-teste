import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQS = [
  {
    question: "Meu pedido atrasou, o que faço?",
    answer: "Sentimos muito! Verifique o status no rastreamento. Se o atraso for superior a 15 min da previsão, chame nosso suporte para prioridade total."
  },
  {
    question: "Como usar cupons de desconto?",
    answer: "Na etapa de pagamento (Checkout), existe um campo 'Adicionar Cupom'. Basta digitar o código e clicar em aplicar."
  },
  {
    question: "Quais são os horários de entrega?",
    answer: "Entregamos todos os dias das 18:00 às 23:30. Aos finais de semana estendemos até 00:30."
  }
];

const OPTIONS = [
  { icon: 'chat', label: 'Falar com atendente' },
  { icon: 'alert', label: 'Problema com pedido' },
  { icon: 'card', label: 'Pagamento e cobranças' },
  { icon: 'bike', label: 'Regras de entrega' },
];

const AjudaPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-24 font-sans relative">
      
      {/* 1. HEADER (Fixed) */}
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
            <h1 className="text-lg font-bold text-gray-900">Ajuda</h1>
          </div>
          <div className="w-10 h-10" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto pt-24 px-4 sm:px-6 space-y-8 animate-fade-in-down">
        
        {/* Intro */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Como podemos te ajudar?</h2>
          <p className="text-gray-500 text-sm">Escolha uma opção ou veja as dúvidas frequentes.</p>
        </div>

        {/* 2. Options Grid */}
        <div className="grid grid-cols-2 gap-4">
          {OPTIONS.map((opt, idx) => (
            <button 
              key={idx}
              className="bg-white p-5 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                 <Icon name={opt.icon} />
              </div>
              <span className="font-bold text-gray-700 text-sm text-center">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* 3. FAQ Accordion */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide ml-1">Dúvidas Frequentes</h3>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-[20px] shadow-sm border border-gray-50 overflow-hidden">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-5 text-left"
                >
                  <span className="font-bold text-gray-800 text-sm">{faq.question}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-brand-orange' : ''}`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`px-5 text-sm text-gray-500 font-medium leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${openFaq === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* 4. Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 sm:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-30">
        <div className="max-w-2xl mx-auto">
          <button className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-brand-orange/30 transform transition-all duration-300 hover:bg-orange-600 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
             </svg>
             Chamar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

const Icon: React.FC<{ name: string }> = ({ name }) => {
  if (name === 'chat') return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
  if (name === 'alert') return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
  if (name === 'card') return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
  if (name === 'bike') return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>; // lightning used for speed
  return <div />;
};

export default AjudaPage;