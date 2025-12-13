import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../constants';
import { Check, ArrowLeft } from 'lucide-react';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, discount } = useStore();

  const discountedSubtotal = cartTotal - (cartTotal * discount);
  const shipping = cartTotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = discountedSubtotal + shipping;

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      clearCart();
      navigate('/order-confirmation', { state: { orderId: Math.floor(Math.random() * 1000000), total } });
    }, 800);
  };

  if (cart.length === 0) {
      setTimeout(() => navigate('/cart'), 0);
      return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Progress */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gold-500 text-white">
                <Check size={20} />
            </div>
            <div className="w-20 h-1 bg-gold-500"></div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gold-500 text-white shadow-lg shadow-gold-500/30">2</div>
          </div>
          <div className="absolute mt-12 flex w-64 justify-between text-xs font-medium text-slate-500">
             <span className="text-gold-600 -ml-2">Shipping</span>
             <span className="text-gold-600 -mr-2">Payment</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 md:p-12 animate-fade-in-up">
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <button type="button" onClick={() => navigate('/checkout')} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-slate-500" />
                </button>
                <h2 className="text-3xl font-serif font-bold dark:text-white">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-8">
                  <div 
                    className="p-6 rounded-xl border-2 border-gold-500 bg-gold-50 dark:bg-slate-800/50 flex justify-between items-center"
                  >
                    <span className="font-bold text-lg dark:text-white">Cash On Delivery</span>
                    <div className="w-6 h-6 rounded-full border-4 border-gold-500"></div>
                  </div>
              </div>

              <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl mb-6 border border-gray-100 dark:border-slate-700">
                  <p className="text-orange-600 font-medium flex items-start gap-2">
                    <span className="text-xl">ℹ️</span>
                    Please ensure you have Rs. {total.toLocaleString()} cash ready upon delivery. Our courier will collect the amount at your doorstep.
                  </p>
              </div>

              <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-slate-500 text-sm">
                        <span>Subtotal ({cart.reduce((a,c) => a+c.quantity, 0)} items)</span>
                        <span>Rs. {cartTotal.toLocaleString()}</span>
                    </div>
                     {discount > 0 && (
                        <div className="flex justify-between text-green-500 text-sm">
                            <span>Discount</span>
                            <span>- Rs. {(cartTotal * discount).toLocaleString()}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-slate-500 text-sm">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `Rs. ${shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-serif font-bold dark:text-white pt-4 border-t border-gray-100 dark:border-slate-700">
                        <span>Total Amount</span>
                        <span>Rs. {total.toLocaleString()}</span>
                    </div>
                </div>
                
                <button type="submit" className="w-full bg-gold-500 text-white py-4 rounded-xl font-bold hover:bg-gold-600 shadow-lg shadow-gold-500/30 transition-all hover:-translate-y-1">
                    Complete Order
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;