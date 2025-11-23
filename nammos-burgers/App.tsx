import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Lazy loading components for performance
const WelcomePage = React.lazy(() => import('./components/WelcomePage'));
const AddressPage = React.lazy(() => import('./components/AddressPage'));
const MenuPage = React.lazy(() => import('./components/MenuPage'));
const HomePage = React.lazy(() => import('./components/HomePage'));
const ProductPage = React.lazy(() => import('./components/ProductPage'));
const CartPage = React.lazy(() => import('./components/CartPage'));
const CheckoutPage = React.lazy(() => import('./components/CheckoutPage'));
const TrackingPage = React.lazy(() => import('./components/TrackingPage'));
const UserProfilePage = React.lazy(() => import('./components/UserProfilePage'));

// Simple Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-gray">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AppProvider>
  );
};

export default App;