import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOKS } from '../constants';
import { useStore } from '../context/StoreContext';
import { Star, X } from 'lucide-react';
import { Book } from '../types';

const Comparison: React.FC = () => {
  const { addToCart } = useStore();
  const navigate = useNavigate();
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([BOOKS[0], BOOKS[1]]);

  const handleAddBook = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bookId = e.target.value;
    if (!bookId) return;

    const book = BOOKS.find(b => b.id === bookId);
    if (book && selectedBooks.length < 3 && !selectedBooks.find(b => b.id === book.id)) {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const removeBook = (id: string) => {
    setSelectedBooks(selectedBooks.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-8">Compare Books</h1>

        {/* Controls */}
        <div className="mb-8">
           <select 
             value=""
             onChange={handleAddBook} 
             className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-4 py-2"
             disabled={selectedBooks.length >= 3}
           >
             <option value="">Add a book to compare...</option>
             {BOOKS.map(b => (
               <option key={b.id} value={b.id} disabled={!!selectedBooks.find(sb => sb.id === b.id)}>
                 {b.title}
               </option>
             ))}
           </select>
           {selectedBooks.length >= 3 && <span className="ml-4 text-sm text-red-500">Max 3 books allowed.</span>}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border-collapse overflow-hidden">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-6 text-left w-1/4 dark:text-white">Feature</th>
                {selectedBooks.map(book => (
                  <th key={book.id} className="p-6 w-1/4 relative">
                    <button 
                      onClick={() => removeBook(book.id)} 
                      className="absolute top-2 right-2 p-1 bg-red-100 text-red-500 rounded-full hover:bg-red-200"
                    >
                      <X size={14} />
                    </button>
                    <img src={book.image} alt={book.title} className="w-24 h-36 object-cover rounded shadow-md mx-auto mb-4" />
                    <h3 className="font-serif font-bold text-slate-900 dark:text-white text-lg">{book.title}</h3>
                  </th>
                ))}
                {/* Fillers for empty slots */}
                {[...Array(3 - selectedBooks.length)].map((_, i) => <th key={i} className="w-1/4"></th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              <tr>
                <td className="p-6 font-bold text-slate-700 dark:text-slate-300">Author</td>
                {selectedBooks.map(book => <td key={book.id} className="p-6 text-center text-slate-600 dark:text-slate-400">{book.author}</td>)}
                {[...Array(3 - selectedBooks.length)].map((_, i) => <td key={i}></td>)}
              </tr>
              <tr>
                <td className="p-6 font-bold text-slate-700 dark:text-slate-300">Price</td>
                {selectedBooks.map(book => <td key={book.id} className="p-6 text-center font-bold text-gold-600">Rs. {book.price}</td>)}
                {[...Array(3 - selectedBooks.length)].map((_, i) => <td key={i}></td>)}
              </tr>
              <tr>
                <td className="p-6 font-bold text-slate-700 dark:text-slate-300">Rating</td>
                {selectedBooks.map(book => (
                  <td key={book.id} className="p-6 text-center">
                    <div className="flex justify-center items-center gap-1 text-yellow-500">
                      {book.rating} <Star size={14} fill="currentColor" />
                    </div>
                  </td>
                ))}
                {[...Array(3 - selectedBooks.length)].map((_, i) => <td key={i}></td>)}
              </tr>
              <tr>
                <td className="p-6 font-bold text-slate-700 dark:text-slate-300">Category</td>
                {selectedBooks.map(book => <td key={book.id} className="p-6 text-center"><span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs uppercase">{book.category}</span></td>)}
                {[...Array(3 - selectedBooks.length)].map((_, i) => <td key={i}></td>)}
              </tr>
              <tr>
                <td className="p-6"></td>
                {selectedBooks.map(book => (
                  <td key={book.id} className="p-6 text-center">
                    <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => addToCart(book)}
                          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
                        >
                          Add to Cart
                        </button>
                        <button 
                          onClick={() => { addToCart(book); navigate('/checkout'); }}
                          className="bg-gold-500 text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-gold-500/20"
                        >
                          Buy Now
                        </button>
                    </div>
                  </td>
                ))}
                {[...Array(3 - selectedBooks.length)].map((_, i) => <td key={i}></td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comparison;