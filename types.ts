export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string; // 'Business' | 'Wealth' | 'Mindset' | 'Psychology'
  image: string;
  description: string;
  rating: number;
  reviews: number;
  bestseller?: boolean;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface AIInsights {
  summary: string;
  keyTakeaways: string[];
  famousQuote: string;
  targetAudience: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export type Province = 'KPK';

export interface CheckoutDetails {
  fullName: string;
  phone: string;
  address: string;
  province: string;
  city: string;
  paymentMethod: 'cod' | 'easypaisa';
}