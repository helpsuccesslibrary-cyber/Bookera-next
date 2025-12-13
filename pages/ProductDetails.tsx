import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, Share2, CheckCircle, Truck, ShieldCheck, User } from 'lucide-react';
import { BOOKS, MOCK_REVIEWS } from '../constants';
import { useStore } from '../context/StoreContext';
import { getBookInsights } from '../services/geminiService';
import { AIInsights } from '../types';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist } = useStore();
  
  const book = BOOKS.find(b => b.id === id);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [insights, setInsights] = useState<AIInsights | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // Fetch AI Insights safely
  const fetchInsights = useCallback(async () => {
    if (book && !insights) {
      setLoadingAI(true);
      const data = await getBookInsights(book.title, book.author);
      setInsights(data);
      setLoadingAI(false);
    }
  }, [book, insights]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  if (!book) return <div className="min-h-screen flex items-center justify-center">Book not found</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Image & Trust */}
          <div>
            <div className="bg-gray-100 dark:bg-slate-900 rounded-3xl p-8 mb-8 flex justify-center relative group">
              <img src={book.image} alt={book.title} className="w-3/4 max-w-sm shadow-2xl rounded-lg group-hover:scale-105 transition-transform duration-500" />
              {book.bestseller && (
                <div className="absolute top-6 right-6 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Bestseller
                </div>
              )}
            </div>
            <div className="flex justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="text-gold-500" /> <span>Authentic</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="text-gold-500" /> <span>Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className="text-gold-500" /> <span>In Stock</span>
              </div>
            </div>
          </div>

          {/* Right: Info & AI */}
          <div>
            <div className="mb-6">
              <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">{book.title}</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">{book.author}</p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gold-600">Rs. {book.price.toLocaleString()}</span>
                <div className="flex items-center text-yellow-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.round(book.rating) ? "currentColor" : "none"} />
                  ))}
                  <span className="ml-2 text-slate-400">({book.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-gold-200 dark:border-slate-800 rounded-2xl p-6 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/2560px-Google_Gemini_logo.svg.png" className="w-16" alt="Gemini" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-purple-600">
                   AI Analysis
                </span>
                {loadingAI && <div className="w-4 h-4 border-2 border-gold-500 rounded-full animate-spin border-t-transparent"></div>}
              </h3>
              
              {loadingAI ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-5/6"></div>
                </div>
              ) : insights ? (
                <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                  <p className="italic">"{insights.summary}"</p>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">Key Takeaways:</span>
                    <ul className="list-disc list-inside space-y-1 marker:text-gold-500">
                      {insights.keyTakeaways.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>
                  <div className="p-3 bg-gold-100 dark:bg-slate-800 rounded-lg border-l-4 border-gold-500">
                    <p className="font-serif italic text-slate-800 dark:text-gray-200">"{insights.famousQuote}"</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                     <span className="text-xs font-bold uppercase text-slate-500">Target Audience:</span>
                     <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 rounded text-slate-700 dark:text-gray-300">{insights.targetAudience}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-red-400">AI Analysis unavailable.</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => addToCart(book)}
                className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                Add to Cart
              </button>
              <button 
                onClick={() => { addToCart(book); navigate('/checkout'); }}
                className="flex-1 bg-gold-500 text-white py-4 rounded-xl font-bold hover:bg-gold-600 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                Buy Now
              </button>
              <button 
                onClick={() => addToWishlist(book)}
                className={`p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${isInWishlist(book.id) ? 'text-red-500' : 'text-slate-400'}`}
              >
                <Heart fill={isInWishlist(book.id) ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-slate-700 mb-6">
              <div className="flex gap-8">
                <button 
                  onClick={() => setActiveTab('details')} 
                  className={`pb-4 font-medium transition-colors relative ${activeTab === 'details' ? 'text-gold-600' : 'text-slate-500'}`}
                >
                  Book Details
                  {activeTab === 'details' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-600"></div>}
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')} 
                  className={`pb-4 font-medium transition-colors relative ${activeTab === 'reviews' ? 'text-gold-600' : 'text-slate-500'}`}
                >
                  Reviews
                  {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-600"></div>}
                </button>
              </div>
            </div>

            <div>
              {activeTab === 'details' ? (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{book.description}</p>
              ) : (
                <div className="space-y-6">
                  {MOCK_REVIEWS.map(review => (
                    <div key={review.id} className="border-b border-gray-100 dark:border-slate-800 pb-4 last:border-0">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                            <User size={14} />
                          </div>
                          <span className="font-bold text-sm">{review.user}</span>
                        </div>
                        <span className="text-xs text-slate-400">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-500 text-xs mb-2">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;