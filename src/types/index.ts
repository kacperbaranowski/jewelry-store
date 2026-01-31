export type Category =
  | 'rings'
  | 'necklaces'
  | 'earrings'
  | 'bracelets'
  | 'watches'
  | 'wedding';

export type Material = 'gold' | 'silver' | 'platinum' | 'rose-gold';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: Category;
  material: Material;
  images: string[];
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: 'courier' | 'parcel-locker' | 'pickup';
  paymentMethod: 'card' | 'blik' | 'transfer';
  notes?: string;
}

export interface Order extends OrderFormData {
  id: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

export type ContrastMode = 'normal' | 'dark' | 'high-contrast';
export type FontSize = 'normal' | 'large' | 'x-large';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

export interface Filters {
  category?: Category;
  material?: Material;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
}
