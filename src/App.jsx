import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <Login onSwitchToRegister={() => setCurrentView('register')} onClose={() => setCurrentView('home')} />;
      case 'register':
        return <Register onSwitchToLogin={() => setCurrentView('login')} onClose={() => setCurrentView('home')} />;
      case 'cart':
        return <Cart onClose={() => setCurrentView('home')} />;
      default:
        return (
          <>
            <Hero />
            <ProductGrid />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar 
            onLoginClick={() => setCurrentView('login')}
            onCartClick={() => setCurrentView('cart')}
            currentView={currentView}
          />
          
          <main className="pb-16">
            {renderView()}
          </main>
          
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;