import React, { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Memoized Header to prevent re-renders during typing
const AddressHeader = memo(() => (
  <div className="text-center mb-8 animate-fade-in-down transform-gpu">
    <div className="mb-6 flex justify-center">
      <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center shadow-lg">
         <span className="text-brand-orange text-3xl font-bold">N</span>
      </div>
    </div>
    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
      Onde vamos entregar?
    </h1>
    <p className="text-gray-500 font-medium">
      Precisamos do seu endereço para continuar.
    </p>
  </div>
));

const AddressPage: React.FC = () => {
  const navigate = useNavigate();
  const { setDeliveryAddress } = useAppContext();

  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [reference, setReference] = useState('');
  
  const [loadingCep, setLoadingCep] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cepError, setCepError] = useState('');

  // Helper functions
  const getCleanCep = (formattedCep: string) => formattedCep.replace(/\D/g, '');

  const fetchCep = useCallback(async (cepValue: string) => {
    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError('CEP não encontrado.');
        setStreet('');
        setNeighborhood('');
        setCity('');
      } else {
        setStreet(data.logradouro || '');
        setNeighborhood(data.bairro || '');
        setCity(data.localidade || '');
        setCepError('');
      }
    } catch (err) {
      console.error(err);
      setCepError('Erro ao buscar CEP. Preencha manualmente.');
    } finally {
      setLoadingCep(false);
    }
  }, []);

  const handleUseLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    setLoadingLocation(true);
    setCepError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Using Nominatim (OpenStreetMap) for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          const data = await response.json();

          if (data && data.address) {
            const addr = data.address;
            setStreet(addr.road || addr.pedestrian || '');
            setNeighborhood(addr.suburb || addr.neighbourhood || '');
            setCity(addr.city || addr.town || addr.municipality || '');
            
            // Try to format CEP if available
            if (addr.postcode) {
              let cleanPostcode = addr.postcode.replace(/\D/g, '');
              if (cleanPostcode.length >= 8) {
                cleanPostcode = cleanPostcode.substring(0, 8);
                setCep(cleanPostcode.replace(/^(\d{5})(\d)/, '$1-$2'));
              }
            }
          } else {
            setCepError('Não foi possível identificar o endereço exato.');
          }
        } catch (error) {
          console.error("Erro ao buscar localização:", error);
          setCepError('Erro ao obter endereço pelo GPS.');
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Erro de permissão ou GPS:", error);
        setLoadingLocation(false);
        setCepError('Por favor, permita o acesso à localização.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Handlers optimized with useCallback
  const handleCepChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    
    // Apply mask
    const formatted = val.replace(/^(\d{5})(\d)/, '$1-$2');
    setCep(formatted);
    setCepError('');

    // Trigger fetch directly when length is correct (cleaner than useEffect dependency)
    if (val.length === 8) {
      fetchCep(val);
    }
  }, [fetchCep]);

  const handleSubmit = useCallback(async () => {
    const cleanCep = getCleanCep(cep);
    
    // Validate required fields (CEP is optional if address is filled via GPS, but ideal to have)
    const isFormValid = 
      street.trim().length > 0 &&
      number.trim().length > 0 &&
      neighborhood.trim().length > 0 &&
      city.trim().length > 0;

    if (!isFormValid) return;

    setIsSubmitting(true);

    // Simulate short processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    setDeliveryAddress({
      cep,
      street,
      number,
      neighborhood,
      city,
      reference
    });

    navigate('/home');
  }, [cep, street, number, neighborhood, city, reference, setDeliveryAddress, navigate]);

  // Derived state for button disabled check
  const isFormValid = 
    street.trim().length > 0 &&
    number.trim().length > 0 &&
    neighborhood.trim().length > 0 &&
    city.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#F5F5F5] sm:bg-white flex flex-col items-center justify-center p-6 sm:p-8">
      
      <AddressHeader />

      {/* Card Section */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 p-6 sm:p-8 transform-gpu">
        
        <div className="space-y-5">

          {/* GPS Button */}
          <button
            onClick={handleUseLocation}
            disabled={loadingLocation}
            className="w-full py-3.5 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center gap-2 text-brand-orange font-bold text-sm hover:bg-orange-100 transition-colors mb-2"
          >
            {loadingLocation ? (
              <svg className="animate-spin h-5 w-5 text-brand-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            )}
            {loadingLocation ? 'Buscando localização...' : 'Usar minha localização atual'}
          </button>
          
          {/* CEP Input */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">CEP</label>
            <div className="relative">
              <input
                type="tel"
                placeholder="00000-000"
                value={cep}
                onChange={handleCepChange}
                maxLength={9}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-[10px] focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all duration-200 placeholder-gray-400 font-medium text-gray-900"
              />
              {loadingCep && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                   <svg className="animate-spin h-5 w-5 text-brand-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
            {cepError && <p className="text-red-500 text-xs ml-1">{cepError}</p>}
          </div>

          <div className="grid grid-cols-3 gap-4">
             {/* Street (Rua) */}
            <div className="col-span-2 space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Rua</label>
              <input
                type="text"
                placeholder="Nome da rua"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-[10px] focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all duration-200 placeholder-gray-400 font-medium text-gray-900"
              />
            </div>

            {/* Number */}
            <div className="col-span-1 space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Número</label>
              <input
                type="text"
                placeholder="123"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-[10px] focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all duration-200 placeholder-gray-400 font-medium text-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {/* Neighborhood */}
             <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Bairro</label>
              <input
                type="text"
                placeholder="Bairro"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-[10px] focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all duration-200 placeholder-gray-400 font-medium text-gray-900"
              />
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Cidade</label>
              <input
                type="text"
                placeholder="Cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-[10px] focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all duration-200 placeholder-gray-400 font-medium text-gray-900"
              />
            </div>
          </div>

          {/* Reference */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Ponto de Referência</label>
            <input
              type="text"
              placeholder="Apartamento 12, casa azul, perto da praça..."
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-[10px] focus:bg-white focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition-all duration-200 placeholder-gray-400 font-medium text-gray-900"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`
              w-full py-4 rounded-xl font-bold text-lg mt-6 shadow-lg transition-all duration-300 transform transform-gpu
              ${isFormValid && !isSubmitting
                ? 'bg-brand-orange text-white hover:opacity-90 hover:-translate-y-1 shadow-brand-orange/30' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}
            `}
          >
             {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </span>
            ) : (
              "Continuar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;