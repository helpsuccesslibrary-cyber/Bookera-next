import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Mail } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const state = location.state as { orderId: number, total: number } || { orderId: 0, total: 0 };

  const emailBody = `Hi Support,%0D%0A%0D%0AI need help with my Order #${state.orderId}.%0D%0ATotal Amount: Rs. ${state.total}%0D%0A%0D%0AIssue:`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4">
      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">Order Confirmed!</h1>
        <p className="text-slate-500 mb-8">Thank you for your purchase. Your premium reads are on their way.</p>
        
        <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl mb-8">
            <p className="text-sm text-slate-500 uppercase tracking-wider">Order ID</p>
            <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white">#{state.orderId}</p>
        </div>

        <div className="space-y-4">
            <Link to="/" className="block w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold hover:opacity-90 transition">
                Continue Shopping
            </Link>
            <a 
                href={`mailto:help.successlibrary@gmail.com?subject=Help with Order #${state.orderId}&body=${emailBody}`}
                className="block w-full border border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-800 flex justify-center items-center gap-2"
            >
                <Mail size={18} /> Contact Support
            </a>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
