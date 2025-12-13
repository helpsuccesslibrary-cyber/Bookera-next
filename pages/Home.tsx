import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Award, Zap, BookOpen, ShoppingCart, Zap as ZapIcon } from 'lucide-react';
import { BOOKS } from '../constants';
import { useStore } from '../context/StoreContext';

const Home: React.FC = () => {
  const { addToCart, showToast } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [email, setEmail] = useState('');

  // Handle scroll from other pages
  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const elementId = (location.state as any).scrollTo;
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      // Clean up state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = () => {
    if (!email) {
      showToast('Please enter your email address.');
      return;
    }
    showToast('Successfully subscribed to the inner circle!');
    setEmail('');
  };

  const bestsellers = BOOKS.filter(b => b.bestseller);
  const categories = ['All', 'Business', 'Wealth', 'Mindset'];

  const filteredBooks = BOOKS.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filter === 'All' || book.category === filter;
    return matchesSearch && matchesCategory;
  });

  const smartPick = BOOKS[Math.floor(Math.random() * BOOKS.length)];

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16 pb-32">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-gold-400/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Upgrade Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-700">
              Knowledge
            </span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light">
            Curated wisdom for the modern intellect. Discover timeless classics and contemporary masterpieces.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button 
              onClick={() => scrollToSection('bestsellers')}
              className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:scale-105 transition-transform cursor-pointer"
            >
              Shop Bestsellers
            </button>
            <button 
              onClick={() => scrollToSection('collections')}
              className="px-8 py-3 border border-slate-300 dark:border-slate-700 rounded-full font-medium text-slate-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            >
              Explore Collections
            </button>
          </div>
        </div>
      </section>

      {/* Trust Benefits */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, title: 'Financial Literacy', desc: 'Master the art of money.' },
              { icon: Zap, title: 'Productivity', desc: 'Achieve more in less time.' },
              { icon: Award, title: 'Leadership', desc: 'Inspire and lead others.' },
              { icon: BookOpen, title: 'Curated Selection', desc: 'Only the best books.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-gold-100 dark:bg-slate-800 text-gold-600 rounded-xl mb-4">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section id="bestsellers" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-gold-600 font-bold uppercase tracking-wider text-sm">Most Popular</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mt-2">Bestselling Titles</h2>
          </div>
          <Link to="/compare" className="text-sm font-medium text-slate-500 hover:text-gold-600 flex items-center gap-1">
            Compare Books <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestsellers.map(book => (
            <div key={book.id} className="group relative bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-800 hover:border-gold-400 transition-all duration-300 flex flex-col">
              <div className="aspect-[2/3] overflow-hidden relative">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <button onClick={() => navigate(`/product/${book.id}`)} className="bg-white text-slate-900 px-6 py-2 rounded-full font-medium shadow-xl hover:bg-gold-500 hover:text-white transition-colors">
                    View Details
                  </button>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-gold-600 uppercase bg-gold-100 dark:bg-gold-900/30 px-2 py-1 rounded">{book.category}</span>
                  <div className="flex items-center text-yellow-500 text-xs">
                    <Star size={14} fill="currentColor" /> {book.rating}
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-1 truncate">{book.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{book.author}</p>
                <div className="mt-auto">
                  <div className="mb-4">
                     <span className="text-lg font-bold text-slate-900 dark:text-white">Rs. {book.price.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => addToCart(book)}
                      className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-2 rounded-lg font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingCart size={16} /> Add
                    </button>
                    <button 
                      onClick={() => { addToCart(book); navigate('/checkout'); }}
                      className="flex-1 bg-gold-500 text-white py-2 rounded-lg font-medium text-sm hover:bg-gold-600 transition-colors flex items-center justify-center gap-1 shadow-lg shadow-gold-500/20"
                    >
                      <ZapIcon size={16} /> Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Smart Pick */}
      <section className="py-16 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 relative">
             <div className="absolute inset-0 bg-gold-500 blur-[100px] opacity-20"></div>
             <img src={smartPick.image} alt={smartPick.title} className="relative z-10 w-64 md:w-80 mx-auto rounded-xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500" />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="text-gold-400 font-bold uppercase tracking-wider">AI Recommended Smart Pick</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6">{smartPick.title}</h2>
            <p className="text-slate-300 text-lg mb-8">{smartPick.description.substring(0, 150)}...</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => navigate(`/product/${smartPick.id}`)} className="bg-slate-800 border border-slate-700 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-700 transition-colors">
                  Analyze with AI
              </button>
              <button onClick={() => { addToCart(smartPick); navigate('/checkout'); }} className="bg-gold-500 text-white px-8 py-3 rounded-full font-bold hover:bg-gold-600 transition-colors shadow-lg shadow-gold-500/30 flex items-center justify-center gap-2">
                Buy Now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white">Our Collections</h2>
          <p className="mt-4 text-slate-500">Filtered for the ambitious mind.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <div key={book.id} className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col" onClick={() => navigate(`/product/${book.id}`)}>
              <img src={book.image} alt={book.title} className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="font-bold text-slate-900 dark:text-white truncate">{book.title}</h3>
              <p className="text-sm text-slate-500 mb-2">{book.author}</p>
              <div className="mt-auto">
                 <div className="mb-3">
                   <span className="font-semibold text-gold-600">Rs. {book.price}</span>
                 </div>
                 <div className="flex gap-2">
                   <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(book); }}
                    className="flex-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-2 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Add
                  </button>
                   <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(book); navigate('/checkout'); }}
                    className="flex-1 text-xs bg-gold-500 text-white py-2 rounded-lg font-medium hover:bg-gold-600 transition-colors shadow-md shadow-gold-500/20"
                  >
                    Buy Now
                  </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gold-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">Join the Inner Circle</h2>
          <p className="mb-8 opacity-90">Get exclusive book summaries, gold member discounts, and concierge updates.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-3 rounded-full text-slate-900 focus:outline-none" 
            />
            <button 
              onClick={handleSubscribe}
              className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;