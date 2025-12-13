import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Comparison from './pages/Comparison';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/compare" element={<Comparison />} />
            </Routes>
          </main>
          <footer className="bg-white dark:bg-slate-950 py-8 border-t border-gray-200 dark:border-slate-800 mt-auto">
             <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Bookera. All rights reserved.</p>
                <p className="mt-2 font-serif italic text-gold-600">"Knowledge is the new currency."</p>
             </div>
          </footer>
          <Toast />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;