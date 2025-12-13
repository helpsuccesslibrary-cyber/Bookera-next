import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useStore();

  // Load Tally Script
  useEffect(() => {
    const scriptSrc = "https://tally.so/widgets/embed.js";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    
    const loadTally = () => {
      if ((window as any).Tally) {
        (window as any).Tally.loadEmbeds();
      }
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.onload = loadTally;
      script.onerror = loadTally;
      document.body.appendChild(script);
    } else {
      loadTally();
    }
  }, []);

  if (cart.length === 0) {
      // Redirect if cart is empty, use setTimeout to avoid render loop issues
      setTimeout(() => navigate('/cart'), 0);
      return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Progress */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gold-500 text-white shadow-lg shadow-gold-500/30">1</div>
            <div className="w-20 h-1 bg-gray-200 dark:bg-slate-800"></div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-slate-500">2</div>
          </div>
          <div className="absolute mt-12 flex w-64 justify-between text-xs font-medium text-slate-500">
             <span className="text-gold-600 -ml-2">Shipping</span>
             <span className="-mr-2">Payment</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 md:p-12 animate-fade-in-up">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold dark:text-white mb-6">Shipping Details</h2>
              
              {/* Tally Form Embed */}
              <div className="w-full">
                <iframe 
                  data-tally-src="https://tally.so/r/dWEo9o?transparentBackground=1&dynamicHeight=1" 
                  width="100%" 
                  height="700" 
                  frameBorder="0" 
                  marginHeight={0} 
                  marginWidth={0} 
                  title="Shipping Details"
                  className="bg-transparent"
                ></iframe>
              </div>

              <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-xl text-sm text-slate-600 dark:text-slate-300 border border-blue-100 dark:border-slate-700">
                <p>Please fill out the form above accurately. Once submitted, click the button below to proceed to payment.</p>
              </div>

              <button 
                onClick={() => navigate('/payment')} 
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all hover:shadow-lg transform hover:-translate-y-1"
              >
                I have submitted my details, Continue
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;