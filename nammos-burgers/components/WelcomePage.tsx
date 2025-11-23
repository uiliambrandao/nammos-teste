import React, { useState, useCallback, memo } from 'react';
import { userService } from '../services/firebase';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

// Memoized Header
const WelcomeHeader = memo(() => (
  <div className="text-center mb-8 sm:mb-10 animate-fade-in-down transform-gpu">
    <div className="mb-6 flex justify-center">
      <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
         <span className="text-brand-orange text-3xl font-bold">N</span>
      </div>
    </div>
    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
      Seja bem-vindo a <span className="text-brand-orange">Nammos!</span>
    </h1>
    <p className="text-gray-500 font-medium">
      Vamos personalizar sua experiência.
    </p>
  </div>
));

const WelcomePage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  // Helper
  const getCleanPhone = (formattedPhone: string) => formattedPhone.replace(/\D/g, '');

  // Optimized Handlers
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 7) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }
    
    setPhone(formattedValue);
    setError(null);
  }, []);

  const isValid = 
    firstName.trim().length > 0 && 
    lastName.trim().length > 0 && 
    getCleanPhone(phone).length === 11;

  const handleSubmit = useCallback(async () => {
    if (!isValid) return;

    setIsLoading(true);
    setError(null);

    const cleanPhone = getCleanPhone(phone);

    try {
      let userData: any = await userService.getUserByPhone(cleanPhone);
      if (!userData) {
        userData = await userService.createUser(firstName, lastName, cleanPhone);
      }

      setUser({
        id: userData.id,
        name: userData.name,
        phone: userData.phone
      });

      navigate('/address');
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao conectar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [firstName, lastName, phone, isValid, navigate, setUser]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 sm:p-8">
      
      <WelcomeHeader />

      {/* Card Section */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-6 sm:p-10 transition-all duration-300 hover:shadow-[0_30px_70px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-1 transform-gpu">
        
        <div className="space-y-5">
          {/* Name Input */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Nome</label>
            <input
              type="text"
              placeholder="Seu primeiro nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all duration-200 placeholder-gray-400 font-medium text-gray-900"
            />
          </div>

          {/* Surname Input */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Sobrenome</label>
            <input
              type="text"
              placeholder="Seu sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all duration-200 placeholder-gray-400 font-medium text-gray-900"
            />
          </div>

          {/* Phone Input */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Telefone / Whatsapp</label>
            <input
              type="tel"
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all duration-200 placeholder-gray-400 font-medium tracking-wide text-gray-900"
            />
            {phone.length > 0 && getCleanPhone(phone).length < 11 && (
              <p className="text-red-500 text-xs ml-1 mt-1">O telefone deve ter 11 dígitos.</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
            className={`
              w-full py-4 rounded-xl font-bold text-lg mt-4 shadow-lg transition-all duration-300 transform transform-gpu
              ${isValid && !isLoading 
                ? 'bg-brand-orange text-white hover:bg-orange-600 hover:-translate-y-1 shadow-orange-500/30' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
            ) : (
              "Continuar"
            )}
          </button>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="mt-12 text-center text-xs text-gray-400 max-w-xs leading-relaxed">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Seus dados são seguros e usados apenas para contato com a entrega.
      </p>

    </div>
  );
};

export default WelcomePage;