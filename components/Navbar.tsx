import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Sun, Moon, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Navbar: React.FC = () => {
  const { cart, isDarkMode, toggleTheme } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    // Check if it's a section link (e.g. /#bestsellers)
    if (path.includes('/#')) {
      e.preventDefault();
      const elementId = path.split('#')[1];
      
      if (location.pathname === '/') {
        // If already on home, just scroll
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If not on home, navigate to home and pass the target ID in state
        navigate('/', { state: { scrollTo: elementId } });
      }
      setIsMenuOpen(false);
    } else {
      // Normal navigation
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Bestsellers', path: '/#bestsellers' },
    { name: 'Collections', path: '/#collections' },
    { name: 'Compare', path: '/compare' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="font-serif text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
              Bookera.
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleNavClick(link.path, e)}
                  className="text-slate-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={toggleTheme} className="text-slate-600 dark:text-gray-400 hover:text-gold-500 transition-colors">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/cart" className="relative text-slate-600 dark:text-gray-400 hover:text-gold-500 transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-gray-200 hover:text-gold-500 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(link.path, e)}
                className="text-slate-700 dark:text-gray-300 hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/cart" 
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-700 dark:text-gray-300 hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Cart ({cartCount})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;