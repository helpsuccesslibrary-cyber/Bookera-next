import { Book, Review } from './types';

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'The 48 Laws of Power',
    author: 'Robert Greene',
    price: 1500,
    category: 'Mindset',
    image: 'https://m.media-amazon.com/images/I/71aG+xDKSYL._AC_UF1000,1000_QL80_.jpg',
    description: 'Amoral, cunning, ruthless, and instructive, this multi-million-copy New York Times bestseller is the definitive manual for anyone interested in gaining, observing, or defending against ultimate control.',
    rating: 4.8,
    reviews: 2450,
    bestseller: true,
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 1200,
    category: 'Mindset',
    image: 'https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
    rating: 4.9,
    reviews: 5000,
    bestseller: true,
  },
  {
    id: '3',
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    price: 1000,
    category: 'Wealth',
    image: 'https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg',
    description: 'Rich Dad Poor Dad is Robert\'s story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing.',
    rating: 4.7,
    reviews: 3200,
    bestseller: true,
  },
  {
    id: '4',
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    price: 950,
    category: 'Wealth',
    image: 'https://m.media-amazon.com/images/I/71UypkUjStL._AC_UF1000,1000_QL80_.jpg',
    description: 'The landmark bestseller that establishes Napoleon Hill as America\'s most beloved motivational author.',
    rating: 4.6,
    reviews: 1800,
  },
  {
    id: '5',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    price: 1350,
    category: 'Business',
    image: 'https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg',
    description: 'Timeless lessons on wealth, greed, and happiness doing well with money isn\'t necessarily about what you know. It\'s about how you behave.',
    rating: 4.9,
    reviews: 2100,
  },
  {
    id: '6',
    title: 'Zero to One',
    author: 'Peter Thiel',
    price: 1600,
    category: 'Business',
    image: 'https://m.media-amazon.com/images/I/71uAI28kJuL._AC_UF1000,1000_QL80_.jpg',
    description: 'The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create.',
    rating: 4.5,
    reviews: 900,
  }
];

export const MOCK_REVIEWS: Review[] = [
  { id: '1', user: 'Ali Khan', rating: 5, comment: 'Life changing book!', date: '2023-10-12' },
  { id: '2', user: 'Sara Ahmed', rating: 4, comment: 'Great insights but a bit lengthy.', date: '2023-11-05' },
];

export const SHIPPING_COST = 250;
export const FREE_SHIPPING_THRESHOLD = 5000;
export const VALID_PROMO = { code: 'WAQAS10', discount: 0.10 };