import React from 'react';
import { useStore } from '../context/StoreContext';

const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 md:bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-2xl z-50 animate-fade-in-up flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-gold-500"></div>
      <span className="font-medium text-sm">{toastMessage}</span>
    </div>
  );
};

export default Toast;
