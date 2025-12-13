import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { VALID_PROMO } from '../constants';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, showToast, discount, setDiscount } = useStore();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === VALID_PROMO.code) {
      setDiscount(VALID_PROMO.discount);
      showToast('Promo code applied successfully!');
    } else {
      setDiscount(0);
      showToast('Invalid promo code');
    }
  };

  const finalTotal = cartTotal - (cartTotal * discount);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif font-bold mb-4 dark:text-white">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">It looks like you haven't added any books yet.</p>
        <Link to="/" className="bg-gold-500 text-white px-8 py-3 rounded-full font-bold hover:bg-gold-600">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex gap-6 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
              <img src={item.image} alt={item.title} className="w-24 h-36 object-cover rounded-lg shadow-md" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.author}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-800 rounded-lg p-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded"><Minus size={16} /></button>
                    <span className="font-medium w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded"><Plus size={16} /></button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gold-600">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 mt-1">
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 sticky top-24">
            <h3 className="font-serif font-bold text-xl mb-6 dark:text-white">Order Summary</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Promo Code</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code" 
                  className="flex-1 bg-gray-50 dark:bg-slate-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gold-500"
                />
                <button onClick={handleApplyPromo} className="bg-slate-900 dark:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">Apply</button>
              </div>
              {discount > 0 && <p className="text-xs text-green-500 mt-2">Discount applied!</p>}
            </div>

            <div className="space-y-4 border-t border-gray-200 dark:border-slate-800 pt-6 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- Rs. {(cartTotal * discount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-slate-800 pt-4 text-lg font-bold text-slate-900 dark:text-white">
                <span>Total</span>
                <span>Rs. {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full mt-8 bg-gold-500 text-white py-4 rounded-xl font-bold hover:bg-gold-600 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-gold-500/20"
            >
              Checkout <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;