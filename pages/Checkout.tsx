import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { LOCATIONS, SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../constants';
import { CheckoutDetails, Province } from '../types';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, discount } = useStore();
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState<CheckoutDetails>({
    fullName: '',
    phone: '',
    address: '',
    province: 'KPK',
    city: LOCATIONS['KPK'][0],
    paymentMethod: 'cod',
  });

  const discountedSubtotal = cartTotal - (cartTotal * discount);
  const shipping = cartTotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = discountedSubtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails(prev => {
      const newData = { ...prev, [name]: value };
      // Reset city if province changes
      if (name === 'province') {
        newData.city = LOCATIONS[value as Province][0];
      }
      return newData;
    });
  };

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.phone.match(/^03\d{9}$/)) {
      alert('Please enter a valid Pakistani phone number (03xxxxxxxxx)');
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call - Reduced delay for faster UX
    setTimeout(() => {
      clearCart();
      navigate('/order-confirmation', { state: { orderId: Math.floor(Math.random() * 1000000), total } });
    }, 500);
  };

  if (cart.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Progress */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 1 ? 'bg-gold-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`w-20 h-1 transition-colors ${step >= 2 ? 'bg-gold-500' : 'bg-gray-200'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 2 ? 'bg-gold-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 md:p-12">
          {step === 1 ? (
            <form onSubmit={handleSubmitStep1} className="space-y-6">
              <h2 className="text-3xl font-serif font-bold dark:text-white mb-6">Shipping Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input required name="fullName" value={details.fullName} onChange={handleInputChange} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-gold-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone (03xx)</label>
                  <input required name="phone" value={details.phone} onChange={handleInputChange} placeholder="03001234567" className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-gold-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Address</label>
                <textarea required name="address" value={details.address} onChange={handleInputChange} rows={3} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-gold-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Province</label>
                  <select name="province" value={details.province} onChange={handleInputChange} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-gold-500">
                    {Object.keys(LOCATIONS).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">City</label>
                  <select name="city" value={details.city} onChange={handleInputChange} className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-gold-500">
                    {LOCATIONS[details.province as Province].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors">Continue to Payment</button>
            </form>
          ) : (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <h2 className="text-3xl font-serif font-bold dark:text-white mb-6">Payment Method</h2>

              <div className="grid grid-cols-1 gap-4 mb-8">
                  <div 
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all border-gold-500 bg-gold-50 dark:bg-slate-800`}
                  >
                    <span className="font-bold capitalize dark:text-white">Cash On Delivery</span>
                  </div>
              </div>

              <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl mb-6">
                  <p className="text-orange-600 font-medium">Please ensure you have Rs. {total.toLocaleString()} cash ready upon delivery.</p>
              </div>

              <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-slate-500 text-sm">
                        <span>Subtotal</span>
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
                    <div className="flex justify-between text-xl font-bold dark:text-white pt-2 border-t border-gray-100 dark:border-slate-700">
                        <span>Total Amount</span>
                        <span>Rs. {total.toLocaleString()}</span>
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 px-6 py-4 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-gray-50 transition-colors">Back</button>
                    <button type="submit" className="flex-1 bg-gold-500 text-white py-4 rounded-xl font-bold hover:bg-gold-600 shadow-lg shadow-gold-500/30 transition-colors">Complete Order</button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;