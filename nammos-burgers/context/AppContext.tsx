import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Address, AppState } from '../types';

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<Address | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser, deliveryAddress, setDeliveryAddress }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};