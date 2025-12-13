import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Book, CartItem } from '../types';

interface StoreContextType {
  cart: CartItem[];
  wishlist: Book[];
  isDarkMode: boolean;
  toggleTheme: () => void;
  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  addToWishlist: (book: Book) => void;
  isInWishlist: (id: string) => boolean;
  clearCart: () => void;
  cartTotal: number;
  discount: number;
  setDiscount: (discount: number) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Theme Init
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Theme Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    showToast(`Added ${book.title} to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
  };

  const addToWishlist = (book: Book) => {
    setWishlist(prev => {
      if (prev.find(b => b.id === book.id)) {
        showToast('Removed from wishlist');
        return prev.filter(b => b.id !== book.id);
      }
      showToast('Added to wishlist');
      return [...prev, book];
    });
  };

  const isInWishlist = (id: string) => !!wishlist.find(b => b.id === id);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <StoreContext.Provider value={{
      cart, wishlist, isDarkMode, toggleTheme, addToCart, removeFromCart, updateQuantity,
      addToWishlist, isInWishlist, clearCart, cartTotal, discount, setDiscount, toastMessage, showToast
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};